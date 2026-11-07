const ALLOWED_TAGS = new Set([
  'A', 'B', 'BLOCKQUOTE', 'BR', 'CODE', 'DEL', 'EM', 'H1', 'H2', 'H3',
  'HR', 'I', 'LI', 'OL', 'P', 'PRE', 'S', 'STRONG', 'U', 'UL', 'IMG',
  'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD'
]);

const ALLOWED_ATTRIBUTES = new Set(['alt', 'class', 'height', 'href', 'rel', 'src', 'target', 'width']);
const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:']);

function isSafeUrl(value: string, allowMailto = false): boolean {
  try {
    const url = new URL(value, window.location.origin);
    if (url.protocol === 'mailto:') return allowMailto;
    return SAFE_PROTOCOLS.has(url.protocol) && (allowMailto || url.protocol !== 'mailto:');
  } catch {
    return value.startsWith('/') || value.startsWith('#');
  }
}

/**
 * Sanitizes HTML authored in the admin editor before it is inserted into the DOM.
 * This is defense-in-depth; blog content must still be validated server-side.
 */
export function sanitizeHtml(html: string): string {
  const document = new DOMParser().parseFromString(html, 'text/html');

  for (const element of Array.from(document.body.querySelectorAll('*'))) {
    if (!ALLOWED_TAGS.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes));
      continue;
    }

    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim();
      const isUrlAttribute = name === 'href' || name === 'src';

      if (name.startsWith('on') || !ALLOWED_ATTRIBUTES.has(name) ||
          (isUrlAttribute && !isSafeUrl(value, name === 'href'))) {
        element.removeAttribute(attribute.name);
      }
    }

    if (element.tagName === 'A' && element.getAttribute('target') === '_blank') {
      element.setAttribute('rel', 'noopener noreferrer nofollow');
    }
  }

  return document.body.innerHTML;
}

export function sanitizeUrl(value: string): string {
  return isSafeUrl(value) ? value : '';
}

export function htmlToPlainText(html: string): string {
  const document = new DOMParser().parseFromString(html, 'text/html');
  return (document.body.textContent || '').replace(/\s+/g, ' ').trim();
}
