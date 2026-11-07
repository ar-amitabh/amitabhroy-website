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

  return (
    <div className="min-h-screen bg-[#040816] pt-16 text-[#F9FAFB]">
      <SEO title="Journal" description="Notes on architecture, place, climate, and the everyday life of buildings." path="/blogs" />
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pt-20">
        <header className="relative border-b border-gray-800 pb-9 sm:pb-12">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mb-4 text-sm font-medium tracking-wide text-[#22C55E]"
          >
            Field notes &amp; essays
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="max-w-3xl font-serif text-5xl leading-[1.04] tracking-[-0.04em] text-[#F9FAFB] sm:text-7xl"
          >
            Ideas shaped by place.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: 'easeOut' }}
            className="mt-5 max-w-xl text-base leading-7 text-[#B7C0CC] sm:text-lg"
          >
            Writing on architecture, climate, and the small details that make spaces feel human.
          </motion.p>
        </header>

        {blogs.length === 0 ? (
          <div className="py-20"><p className="mb-3 text-sm font-medium text-[#22C55E]">The journal is beginning</p><h2 className="font-serif text-3xl text-[#F9FAFB] sm:text-4xl">The first story is on its way.</h2><p className="mt-3 max-w-lg leading-7 text-[#9CA3AF]">New writing on architecture, design, and place will appear here.</p></div>
        ) : (
          <>
            {featured && (
              <motion.article
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
                className="grid gap-7 border-b border-gray-800 py-9 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12"
              >
                <Link
                  to={`/blogs/${encodeURIComponent(featured.slug)}`}
                  aria-label={`Read ${featured.title}`}
                  className="group order-1 overflow-hidden rounded-xl border border-gray-800/80 bg-[#111827] shadow-xl transition-colors duration-300 hover:border-[#22C55E]/60 lg:order-2"
                >
                  {sanitizeUrl(featured.image) ? (
                    <img
                      src={sanitizeUrl(featured.image)}
                      alt={featured.imageAlt}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center font-serif text-2xl text-[#758296]">A field note</div>
                  )}
                </Link>
                <div className="order-2 lg:order-1">
                  <p className="mb-4 text-sm text-[#758296]">
                    <span className="font-medium text-[#22C55E]">Featured story</span> <span className="px-2">·</span>
                    {publishedDate(featured.date)}
                  </p>
                  <h2 className="max-w-xl font-serif text-3xl leading-tight tracking-[-0.025em] text-[#F9FAFB] sm:text-5xl">
                    <Link
                      className="transition-colors duration-200 hover:text-[#22C55E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22C55E]"
                      to={`/blogs/${encodeURIComponent(featured.slug)}`}
                    >
                      {featured.title}
                    </Link>
                  </h2>
                  {featured.subtitle && <p className="mt-4 max-w-xl text-lg leading-7 text-[#B7C0CC]">{featured.subtitle}</p>}
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#758296]">
                    <span className="inline-flex items-center gap-2">
                      <Clock size={15} className="text-[#22C55E]" />
                      {featured.readingMinutes} min read
                    </span>
                    <Link
                      to={`/blogs/${encodeURIComponent(featured.slug)}`}
                      className="group inline-flex items-center gap-1 font-semibold text-[#22C55E] hover:underline"
                    >
                      Read story <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            )}

            {rest.length > 0 && (
              <div className="grid gap-x-10 sm:grid-cols-2">
                {rest.map((blog, index) => (
                  <motion.article
                    key={blog.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
                    whileHover={{ y: -3 }}
                    className="group grid grid-cols-[1fr_104px] gap-5 border-b border-gray-800 py-7 transition-colors hover:border-gray-700 sm:grid-cols-[1fr_136px]"
                  >
                    <div>
                      <p className="mb-2 text-xs text-[#758296]">
                        {blog.category && (
                          <>
                            <span className="font-medium text-[#22C55E]">{blog.category}</span>
                            <span className="px-1.5">·</span>
                          </>
                        )}
                        {publishedDate(blog.date)}
                      </p>
                      <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em] text-[#F9FAFB]">
                        <Link
                          to={`/blogs/${encodeURIComponent(blog.slug)}`}
                          className="transition-colors duration-200 group-hover:text-[#22C55E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22C55E]"
                        >
                          {blog.title}
                        </Link>
                      </h2>
                      {blog.subtitle && <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#9CA3AF]">{blog.subtitle}</p>}
                      <p className="mt-3 inline-flex items-center gap-2 text-xs text-[#758296]">
                        <Clock size={14} className="text-[#22C55E]" />
                        {blog.readingMinutes} min read
                      </p>
                    </div>
                    <Link
                      to={`/blogs/${encodeURIComponent(blog.slug)}`}
                      aria-label={`Read ${blog.title}`}
                      className="overflow-hidden rounded-lg border border-gray-800/80 bg-[#111827] transition-colors group-hover:border-[#22C55E]/50"
                    >
                      {sanitizeUrl(blog.image) ? (
                        <img
                          src={sanitizeUrl(blog.image)}
                          alt=""
                          loading="lazy"
                          className="aspect-square h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span className="flex aspect-square h-full items-center justify-center font-serif text-xs text-[#758296]">Journal</span>
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
