/**
 * A deliberately small Markdown renderer for journal posts.
 *
 * Posts are authored in the repository, so this does not need to support
 * arbitrary extensions. Every piece of source text is HTML-escaped before any
 * formatting is applied, which means raw HTML in a post can never reach the
 * DOM. The output is also passed through sanitizeHtml() as defence in depth.
 */

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);
}

/** Inline formatting: code, images, links, bold, italic, strikethrough. */
function renderInline(source: string): string {
  const codeSpans: string[] = [];

  // Pull inline code out first so its contents are not formatted further.
  let text = source.replace(/`([^`\n]+)`/g, (_match, code: string) => {
    codeSpans.push(`<code>${escapeHtml(code)}</code>`);
    return `\u0000${codeSpans.length - 1}\u0000`;
  });

  text = escapeHtml(text);

  // Images before links: the image syntax contains the link syntax.
  text = text.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,
    (_match, alt: string, src: string, title?: string) =>
      `<img src="${src}" alt="${alt}"${title ? ` title="${title}"` : ''}>`,
  );

  text = text.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g,
    (_match, label: string, href: string, title?: string) =>
      `<a href="${href}"${title ? ` title="${title}"` : ''}>${label}</a>`,
  );

  text = text
    .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_\n]+)__/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/(^|[^_\w])_([^_\n]+)_/g, '$1<em>$2</em>')
    .replace(/~~([^~\n]+)~~/g, '<del>$1</del>');

  // eslint-disable-next-line no-control-regex -- NUL is the code-span placeholder delimiter
  return text.replace(/\u0000(\d+)\u0000/g, (_match, index: string) => codeSpans[Number(index)] ?? '');
}

const FENCE = /^ {0,3}```\s*([\w-]*)\s*$/;
const HEADING = /^ {0,3}(#{1,6})\s+(.+?)\s*#*\s*$/;
const HORIZONTAL_RULE = /^ {0,3}([-*_])(?:\s*\1){2,}\s*$/;
const BLOCKQUOTE = /^ {0,3}>/;
const BULLET = /^ {0,3}[-*+]\s+(.*)$/;
const ORDERED = /^ {0,3}\d+[.)]\s+(.*)$/;
const BLOCK_START = /^ {0,3}(#{1,6}\s|>|```|[-*+]\s|\d+[.)]\s)/;

export function renderMarkdown(source: string): string {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const html: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(FENCE);
    if (fence) {
      const language = fence[1];
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !FENCE.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      html.push(
        `<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ''}>${escapeHtml(code.join('\n'))}</code></pre>`,
      );
      continue;
    }

    const heading = line.match(HEADING);
    if (heading) {
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (HORIZONTAL_RULE.test(line)) {
      html.push('<hr>');
      index += 1;
      continue;
    }

    if (BLOCKQUOTE.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && BLOCKQUOTE.test(lines[index])) {
        quote.push(lines[index].replace(/^ {0,3}>\s?/, ''));
        index += 1;
      }
      html.push(`<blockquote><p>${renderInline(quote.join(' '))}</p></blockquote>`);
      continue;
    }

    const bullet = line.match(BULLET);
    const ordered = line.match(ORDERED);
    if (bullet || ordered) {
      const tag = bullet ? 'ul' : 'ol';
      const pattern = bullet ? BULLET : ORDERED;
      const items: string[] = [];
      while (index < lines.length) {
        const item = lines[index].match(pattern);
        if (!item) break;
        items.push(`<li>${renderInline(item[1])}</li>`);
        index += 1;
      }
      html.push(`<${tag}>${items.join('')}</${tag}>`);
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !BLOCK_START.test(lines[index]) &&
      !HORIZONTAL_RULE.test(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }

    if (paragraph.length === 0) {
      paragraph.push(line.trim());
      index += 1;
    }

    html.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
  }

  return html.join('\n');
}

/** Plain text used for reading time and SEO descriptions. */
export function markdownToPlainText(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
