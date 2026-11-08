import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { getJournalPosts } from '../data/journal';
import { sanitizeUrl } from '../lib/sanitizeHtml';

const publishedDate = (value: string) =>
  new Date(value.length === 10 ? `${value}T00:00:00` : value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

export default function BlogsPage() {
  const blogs = getJournalPosts();
  const featured = blogs[0];
  const rest = blogs.slice(1);

  const blogCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://amitabhroy.bd/blogs#blog',
    name: 'Architecture, Climate & Urban Design Journal | Amitabh Chondro Roy',
    description:
      'Long-form essays and field notes on human-centered architecture, passive cooling strategies, courtyard systems, and workplace wellbeing in Bangladesh.',
    url: 'https://amitabhroy.bd/blogs',
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      '@id': 'https://amitabhroy.bd/#person',
      name: 'Amitabh Chondro Roy',
    },
    blogPost: blogs.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `https://amitabhroy.bd/blogs/${encodeURIComponent(post.slug)}`,
      datePublished: post.date,
      description: post.description || post.subtitle,
    })),
  };

  return (
    <div className="min-h-screen bg-paper pt-20 text-graphite">
      <SEO
        title="Architecture, Climate & Urban Design Journal"
        description="Long-form essays and field notes on human-centered architecture, passive cooling strategies, courtyard systems, and workplace wellbeing in Bangladesh."
        path="/blogs"
        jsonLd={blogCollectionSchema}
      />
      <section className="brand-container brand-section">
        <header className="relative border-b border-stone pb-10 sm:pb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="type-meta text-forest-deep mb-3"
          >
            04 / Field Notes &amp; Essays
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="max-w-3xl type-display-l text-graphite"
          >
            Ideas shaped by <span className="accent-italic">place</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 max-w-xl type-body-lg text-graphite-soft"
          >
            Writing on architecture, climate-responsive design, and the spatial details that make buildings feel human.
          </motion.p>
        </header>

        {blogs.length === 0 ? (
          <div className="py-20">
            <p className="type-meta text-forest-deep mb-3">The journal is beginning</p>
            <h2 className="type-h2 text-graphite">The first story is on its way.</h2>
            <p className="mt-3 max-w-lg type-body text-graphite-soft">New writing on architecture, design, and place will appear here.</p>
          </div>
        ) : (
          <>
            {featured && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="grid gap-8 border-b border-stone py-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-12"
              >
                <div className="order-2 lg:order-1 lg:col-span-6">
                  <p className="mb-4 type-meta text-graphite-soft">
                    <span className="text-terracotta-deep">Featured Essay</span>
                    <span className="px-2">·</span>
                    {publishedDate(featured.date)}
                  </p>
                  <h2 className="type-h1 text-graphite">
                    <Link
                      className="transition-colors duration-200 hover:text-forest-deep"
                      to={`/blogs/${encodeURIComponent(featured.slug)}`}
                    >
                      {featured.title}
                    </Link>
                  </h2>
                  {featured.subtitle && (
                    <p className="mt-4 max-w-xl type-body-lg text-graphite-soft">
                      {featured.subtitle}
                    </p>
                  )}
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 type-meta text-graphite-soft">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} className="text-forest-deep" />
                      {featured.readingMinutes} min read
                    </span>
                    <Link
                      to={`/blogs/${encodeURIComponent(featured.slug)}`}
                      className="link-underline inline-flex items-center gap-1 font-sans text-sm font-medium text-forest-deep normal-case tracking-normal"
                    >
                      Read essay <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>

                <Link
                  to={`/blogs/${encodeURIComponent(featured.slug)}`}
                  aria-label={`Read ${featured.title}`}
                  data-cursor="view"
                  className="group order-1 overflow-hidden border border-stone bg-paper-raised lg:order-2 lg:col-span-6"
                >
                  {sanitizeUrl(featured.image) ? (
                    <img
                      src={sanitizeUrl(featured.image)}
                      alt={featured.imageAlt || featured.title}
                      width={1280}
                      height={800}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center font-serif text-2xl text-graphite-soft">A field note</div>
                  )}
                </Link>
              </motion.article>
            )}

            {rest.length > 0 && (
              <div className="grid gap-x-10 sm:grid-cols-2">
                {rest.map((blog, index) => (
                  <motion.article
                    key={blog.slug}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group grid grid-cols-[1fr_112px] gap-6 border-b border-stone py-8 transition-colors hover:border-forest sm:grid-cols-[1fr_144px]"
                  >
                    <div>
                      <p className="mb-2.5 type-meta text-graphite-soft">
                        {blog.category && (
                          <>
                            <span className="text-forest-deep">{blog.category}</span>
                            <span className="px-1.5">·</span>
                          </>
                        )}
                        {publishedDate(blog.date)}
                      </p>
                      <h2 className="type-h3 text-graphite">
                        <Link
                          to={`/blogs/${encodeURIComponent(blog.slug)}`}
                          className="transition-colors duration-200 group-hover:text-forest-deep"
                        >
                          {blog.title}
                        </Link>
                      </h2>
                      {blog.subtitle && (
                        <p className="mt-2 line-clamp-2 type-caption text-graphite-soft">
                          {blog.subtitle}
                        </p>
                      )}
                      <p className="mt-4 inline-flex items-center gap-1.5 type-meta text-graphite-soft">
                        <Clock size={13} className="text-forest-deep" />
                        {blog.readingMinutes} min read
                      </p>
                    </div>
                    <Link
                      to={`/blogs/${encodeURIComponent(blog.slug)}`}
                      aria-label={`Read ${blog.title}`}
                      data-cursor="view"
                      className="overflow-hidden border border-stone bg-paper-raised"
                    >
                      {sanitizeUrl(blog.image) ? (
                        <img
                          src={sanitizeUrl(blog.image)}
                          alt={blog.imageAlt || blog.title}
                          width={400}
                          height={400}
                          loading="lazy"
                          className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <span className="flex aspect-square h-full items-center justify-center font-serif text-xs text-graphite-soft">Journal</span>
                      )}
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
