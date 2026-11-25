import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Clock, Copy, Share2 } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SEO from '../components/SEO';
import { extractFaqItems, getJournalPost, getRelatedPosts } from '../data/journal';
import { markdownToPlainText, renderMarkdown } from '../lib/markdown';
import { sanitizeHtml, sanitizeUrl } from '../lib/sanitizeHtml';

const publishedDate = (value: string) =>
  new Date(value.length === 10 ? `${value}T00:00:00` : value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

export default function BlogArticlePage() {
  const { slug = '' } = useParams();
  const proseRef = useRef<HTMLDivElement>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    // Malformed escape sequences fall through to the not-found state.
  }

  const blog = getJournalPost(decodedSlug);

  useEffect(() => {
    const container = proseRef.current;
    if (!container || !blog) return;

    const blocks = Array.from(container.children) as HTMLElement[];
    if (typeof IntersectionObserver === 'undefined') {
      blocks.forEach((el) => el.classList.add('prose-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('prose-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    blocks.forEach((el, index) => {
      el.classList.add('prose-reveal');
      if (index < 3) {
        requestAnimationFrame(() => el.classList.add('prose-visible'));
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-paper px-5 pb-20 pt-32 text-graphite">
        <SEO title="Story not found" description="This journal story could not be found." path={`/blogs/${encodeURIComponent(slug)}`} />
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 type-meta text-forest-deep">Journal</p>
          <h1 className="type-h1 text-graphite">This story isn’t available.</h1>
          <p className="mt-4 type-body text-graphite-soft">It may have been unpublished or the address may have changed.</p>
          <Link to="/blogs" className="mt-8 inline-flex items-center gap-2 font-medium text-forest-deep link-underline">
            <ArrowLeft size={16} /> Back to the journal
          </Link>
        </div>
      </div>
    );
  }

  const coverImage = sanitizeUrl(blog.image);
  const plainText = markdownToPlainText(blog.content);
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const description = blog.description || blog.subtitle || plainText.slice(0, 155);
  const canonicalUrl = `https://amitabhroy.bd/blogs/${encodeURIComponent(blog.slug)}`;
  const faqItems = extractFaqItems(blog.content);
  const relatedPosts = getRelatedPosts(blog.slug, 3);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    } catch {
      setCopiedLink(false);
    }
  };

  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description,
    datePublished: blog.date,
    dateModified: blog.date,
    inLanguage: 'en-US',
    wordCount,
    articleSection: blog.category || 'Architecture & Urban Planning',
    keywords: blog.tags.join(', ') || blog.keywords || undefined,
    image: coverImage ? `https://amitabhroy.bd${coverImage}` : 'https://amitabhroy.bd/og-image.jpg',
    mainEntityOfPage: canonicalUrl,
    author: {
      '@type': 'Person',
      '@id': 'https://amitabhroy.bd/#person',
      name: 'Amitabh Chondro Roy',
      alternateName: 'Amitabh Roy',
      url: 'https://amitabhroy.bd/',
    },
    publisher: {
      '@type': 'Person',
      '@id': 'https://amitabhroy.bd/#person',
      name: 'Amitabh Chondro Roy',
    },
  };

  const faqSchema =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  const schemas = faqSchema ? [articleSchema, faqSchema] : articleSchema;

  return (
    <div className="min-h-screen bg-paper pb-24 pt-20 text-graphite">
      <SEO
        title={blog.seoTitle || blog.title}
        description={description}
        path={`/blogs/${encodeURIComponent(blog.slug)}`}
        image={coverImage || undefined}
        imageAlt={blog.imageAlt || blog.title}
        type="article"
        keywords={blog.keywords || undefined}
        jsonLd={schemas}
      />

      {/* Top Reading Progress Bar (2px Forest bar per Section 8.6 & 10.6) */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-20 z-40 h-[2px] origin-left bg-forest"
      />

      {/* Unified Medium-style single column container */}
      <article className="mx-auto max-w-3xl px-5 sm:px-8">
        <header className="pb-9 pt-10 sm:pt-14">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/blogs"
              className="mb-10 inline-flex items-center gap-2 type-meta text-graphite-soft transition-colors hover:text-forest-deep"
            >
              <ArrowLeft size={15} /> Back to Journal
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04 }}
            className="mb-4 type-meta text-graphite-soft"
          >
            {blog.category && (
              <>
                <span className="text-forest-deep">{blog.category}</span>
                <span className="px-2">·</span>
              </>
            )}
            {publishedDate(blog.date)}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="type-h1 text-graphite"
          >
            {blog.title}
          </motion.h1>

          {blog.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mt-5 font-serif text-xl leading-relaxed text-graphite-soft sm:text-2xl"
            >
              {blog.subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-6 flex flex-wrap items-center gap-2.5 border-y border-stone py-4 type-caption text-graphite-soft"
          >
            <span className="font-medium text-graphite">By Amitabh Chondro Roy</span>
            <span aria-hidden="true">·</span>
            <span>Architect &amp; Urban Planning Researcher</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-forest-deep">
              <Clock size={14} />
              {blog.readingMinutes} min read
            </span>
          </motion.div>
        </header>

        {coverImage && (
          <motion.figure
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mb-12"
          >
            <div className="overflow-hidden border border-stone bg-paper-raised">
              <img
                src={coverImage}
                alt={blog.imageAlt || blog.title}
                width={1280}
                height={800}
                className="h-auto w-full object-contain transition-transform duration-700 hover:scale-[1.015]"
              />
            </div>
            <figcaption className="pt-3 text-center type-caption text-graphite-soft">
              {blog.imageAlt}
            </figcaption>
          </motion.figure>
        )}

        <div>
          <div
            ref={proseRef}
            className="journal-prose font-sans text-lg leading-[1.78] text-graphite [&_a]:text-forest-deep [&_a]:underline [&_a]:decoration-forest/50 [&_a]:underline-offset-4 hover:[&_a]:decoration-forest-deep [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-terracotta [&_blockquote]:bg-paper-raised [&_blockquote]:py-3 [&_blockquote]:pl-5 [&_blockquote]:pr-4 [&_blockquote]:font-serif [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:text-graphite [&_h1]:mb-5 [&_h1]:mt-12 [&_h1]:font-serif [&_h1]:text-3xl [&_h1]:font-normal [&_h1]:text-graphite [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-normal [&_h2]:text-graphite [&_h3]:mb-3 [&_h3]:mt-9 [&_h3]:font-serif [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-normal [&_h3]:text-graphite [&_hr]:my-10 [&_hr]:border-stone [&_img]:my-8 [&_img]:h-auto [&_img]:w-full [&_img]:border [&_img]:border-stone [&_img]:object-cover [&_li]:my-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-7 [&_p]:my-6 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-card [&_pre]:border [&_pre]:border-stone [&_pre]:bg-paper-raised [&_pre]:p-4 [&_strong]:font-semibold [&_strong]:text-graphite [&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:font-sans [&_table]:text-sm [&_td]:border-b [&_td]:border-stone [&_td]:py-3 [&_td]:pr-4 [&_th]:border-b [&_th]:border-stone [&_th]:py-3 [&_th]:pr-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-graphite [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-7"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(renderMarkdown(blog.content)) }}
          />

          {/* Tags & Share bar */}
          <div className="mt-12 border-t border-stone pt-8 space-y-6">
            {blog.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="type-meta text-graphite-soft mr-2">Topics</span>
                {blog.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-card border border-stone bg-paper-raised p-4 sm:p-5">
              <div className="flex items-center gap-2 type-meta text-graphite-soft">
                <Share2 size={14} className="text-forest-deep" aria-hidden="true" />
                <span>Share this essay</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-pill border border-stone bg-paper px-3.5 py-1.5 font-sans text-xs font-medium text-graphite transition-colors hover:border-forest"
                >
                  {copiedLink ? (
                    <>
                      <Check size={13} className="text-forest-deep" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={13} aria-hidden="true" />
                      Copy link
                    </>
                  )}
                </button>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-pill border border-stone bg-paper px-3.5 py-1.5 font-sans text-xs font-medium text-graphite transition-colors hover:border-forest"
                >
                  LinkedIn
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-pill border border-stone bg-paper px-3.5 py-1.5 font-sans text-xs font-medium text-graphite transition-colors hover:border-forest"
                >
                  X
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-pill border border-stone bg-paper px-3.5 py-1.5 font-sans text-xs font-medium text-graphite transition-colors hover:border-forest"
                >
                  Facebook
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${blog.title} ${canonicalUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-1 rounded-pill border border-stone bg-paper px-3.5 py-1.5 font-sans text-xs font-medium text-graphite transition-colors hover:border-forest"
                >
                  WhatsApp
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section aria-labelledby="related-posts-heading" className="mt-14 border-t border-stone pt-10">
              <div className="mb-6 flex items-center justify-between">
                <h2 id="related-posts-heading" className="type-h3 text-graphite">
                  Related essays
                </h2>
                <Link to="/blogs" className="link-underline text-xs font-medium text-forest-deep">
                  All essays
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    to={`/blogs/${encodeURIComponent(related.slug)}`}
                    className="group flex flex-col justify-between rounded-card border border-stone bg-paper-raised p-5 transition-colors hover:border-forest"
                  >
                    <div>
                      <p className="type-meta text-forest-deep">{related.category}</p>
                      <h3 className="mt-2 font-serif text-lg leading-snug text-graphite group-hover:text-forest-deep">
                        {related.title}
                      </h3>
                    </div>
                    <p className="mt-4 type-meta text-graphite-soft">
                      {related.readingMinutes} min read
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <footer className="mt-12 border-t border-stone pt-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/blogs"
              className="link-underline inline-flex items-center gap-2 font-medium text-forest-deep"
            >
              <ArrowLeft size={16} /> More essays in the journal
            </Link>
            <Link
              to="/research"
              className="link-underline inline-flex items-center gap-2 font-medium text-graphite-soft hover:text-graphite"
            >
              Explore Rangpur thesis research →
            </Link>
          </footer>
        </div>
      </article>
    </div>
  );
}
