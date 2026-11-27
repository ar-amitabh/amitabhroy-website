import { parseFrontmatter } from '../lib/frontmatter';
import { markdownToPlainText } from '../lib/markdown';

export interface JournalPost {
  slug: string;
  title: string;
  seoTitle: string;
  subtitle: string;
  description: string;
  keywords: string;
  category: string;
  tags: string[];
  date: string;
  image: string;
  imageAlt: string;
  content: string;
  readingMinutes: number;
}

/**
 * Every `.md` file in `src/content/journal` becomes a post at build time.
 * Nothing is fetched at runtime, so the journal cannot go offline.
 */
const files = import.meta.glob('../content/journal/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

function readingMinutes(body: string): number {
  const words = markdownToPlainText(body).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function toPost(path: string, raw: string): (JournalPost & { order: number }) | null {
  const { data, body } = parseFrontmatter(raw);

  if (data.draft === 'true' || data.published === 'false') return null;

  const title = data.title?.trim();
  const date = data.date?.trim();
  if (!title || !date) {
    console.warn(`[journal] Skipping ${path}: a title and date are required.`);
    return null;
  }

  const fallbackSlug = path.split('/').pop()?.replace(/\.md$/i, '') ?? '';
  const slug = toSlug(data.slug?.trim() || fallbackSlug);
  if (!slug) {
    console.warn(`[journal] Skipping ${path}: could not derive a slug.`);
    return null;
  }

  const rawTags = data.tags
    ? data.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return {
    slug,
    title,
    seoTitle: data.seotitle?.trim() || title,
    subtitle: data.subtitle?.trim() ?? '',
    description: data.description?.trim() ?? '',
    keywords: data.keywords?.trim() ?? '',
    category: data.category?.trim() ?? '',
    tags: rawTags,
    date,
    image: data.image?.trim() ?? '',
    imageAlt: data.imagealt?.trim() || title,
    content: body.trim(),
    readingMinutes: readingMinutes(body),
    order: Number(data.order) || 0,
  };
}

const posts: JournalPost[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post): post is JournalPost & { order: number } => post !== null)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.order - a.order);

const postsBySlug = new Map(posts.map((post) => [post.slug, post]));

export function getJournalPosts(): JournalPost[] {
  return posts;
}

export function getJournalPost(slug: string): JournalPost | undefined {
  return postsBySlug.get(slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): JournalPost[] {
  const current = postsBySlug.get(currentSlug);
  const candidates = posts.filter((p) => p.slug !== currentSlug);
  if (!current) return candidates.slice(0, limit);

  const currentTags = new Set(current.tags.map((t) => t.toLowerCase()));
  return [...candidates]
    .sort((a, b) => {
      const score = (post: JournalPost) => {
        let s = post.category === current.category ? 3 : 0;
        for (const t of post.tags) {
          if (currentTags.has(t.toLowerCase())) s += 1;
        }
        return s;
      };
      const diff = score(b) - score(a);
      if (diff !== 0) return diff;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function extractFaqItems(markdown: string): FaqItem[] {
  const normalized = markdown.replace(/\r\n?/g, '\n');
  const faqMatch = normalized.match(/^##\s+Frequently\s+Asked\s+Questions\s*$/im);
  if (!faqMatch || faqMatch.index === undefined) return [];

  const afterHeading = normalized.slice(faqMatch.index + faqMatch[0].length);
  const nextSectionMatch = afterHeading.match(/\n(?:##\s+[^\n]+|---\s*\n)/);
  const faqSection = nextSectionMatch && nextSectionMatch.index !== undefined
    ? afterHeading.slice(0, nextSectionMatch.index)
    : afterHeading;

  const items: FaqItem[] = [];
  const h3Blocks = faqSection.split(/\n###\s+/).slice(1);
  if (h3Blocks.length > 0) {
    for (const block of h3Blocks) {
      const lines = block.trim().split('\n');
      const question = lines[0]?.replace(/^\d+\.\s*/, '').trim();
      const answer = markdownToPlainText(lines.slice(1).join('\n')).trim();
      if (question && answer) {
        items.push({ question, answer });
      }
    }
    return items;
  }

  // Fallback: plain-text Q&A pairs (question line ending with '?' followed by answer line)
  const rawLines = faqSection.split('\n').map((l) => l.trim()).filter(Boolean);
  for (let i = 0; i < rawLines.length - 1; i++) {
    if (rawLines[i].endsWith('?')) {
      const question = markdownToPlainText(rawLines[i]).trim();
      const answer = markdownToPlainText(rawLines[i + 1]).trim();
      if (question && answer && !answer.endsWith('?')) {
        items.push({ question, answer });
        i += 1;
      }
    }
  }
  return items;
}
