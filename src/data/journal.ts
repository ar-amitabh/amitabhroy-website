import { parseFrontmatter } from '../lib/frontmatter';
import { markdownToPlainText } from '../lib/markdown';

export interface JournalPost {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  keywords: string;
  category: string;
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

function toPost(path: string, raw: string): JournalPost | null {
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

  return {
    slug,
    title,
    subtitle: data.subtitle?.trim() ?? '',
    description: data.description?.trim() ?? '',
    keywords: data.keywords?.trim() ?? '',
    category: data.category?.trim() ?? '',
    date,
    image: data.image?.trim() ?? '',
    imageAlt: data.imagealt?.trim() || title,
    content: body.trim(),
    readingMinutes: readingMinutes(body),
  };
}

const posts: JournalPost[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post): post is JournalPost => post !== null)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const postsBySlug = new Map(posts.map((post) => [post.slug, post]));

export function getJournalPosts(): JournalPost[] {
  return posts;
}

export function getJournalPost(slug: string): JournalPost | undefined {
  return postsBySlug.get(slug);
}
