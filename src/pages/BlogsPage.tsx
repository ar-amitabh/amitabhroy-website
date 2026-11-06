import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
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
          <p className="mb-4 text-sm font-medium tracking-wide text-[#22C55E]">Field notes &amp; essays</p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.04] tracking-[-0.04em] text-[#F9FAFB] sm:text-7xl">Ideas shaped by place.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#B7C0CC] sm:text-lg">Writing on architecture, climate, and the small details that make spaces feel human.</p>
        </header>

        {blogs.length === 0 ? (
          <div className="py-20"><p className="mb-3 text-sm font-medium text-[#22C55E]">The journal is beginning</p><h2 className="font-serif text-3xl text-[#F9FAFB] sm:text-4xl">The first story is on its way.</h2><p className="mt-3 max-w-lg leading-7 text-[#9CA3AF]">New writing on architecture, design, and place will appear here.</p></div>
        ) : (
          <>
            {featured && (
              <article className="grid gap-7 border-b border-gray-800 py-9 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
                <Link to={`/blogs/${encodeURIComponent(featured.slug)}`} aria-label={`Read ${featured.title}`} className="group order-1 overflow-hidden bg-[#111827] lg:order-2">
                  {sanitizeUrl(featured.image) ? <img src={sanitizeUrl(featured.image)} alt={featured.imageAlt} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" /> : <div className="flex aspect-[16/10] items-center justify-center font-serif text-2xl text-[#758296]">A field note</div>}
                </Link>
                <div className="order-2 lg:order-1">
                  <p className="mb-4 text-sm text-[#758296]">Featured story <span className="px-2">·</span>{publishedDate(featured.date)}</p>
                  <h2 className="max-w-xl font-serif text-3xl leading-tight tracking-[-0.025em] text-[#F9FAFB] sm:text-5xl"><Link className="hover:text-[#22C55E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22C55E]" to={`/blogs/${encodeURIComponent(featured.slug)}`}>{featured.title}</Link></h2>
                  {featured.subtitle && <p className="mt-4 max-w-xl text-lg leading-7 text-[#B7C0CC]">{featured.subtitle}</p>}
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#758296]"><span className="inline-flex items-center gap-2"><Clock size={15} />{featured.readingMinutes} min read</span><Link to={`/blogs/${encodeURIComponent(featured.slug)}`} className="inline-flex items-center gap-1 font-semibold text-[#22C55E] hover:underline">Read story <ArrowUpRight size={16} /></Link></div>
                </div>
              </article>
            )}

            {rest.length > 0 && <div className="grid gap-x-10 sm:grid-cols-2">
              {rest.map((blog) => (
                <article key={blog.slug} className="grid grid-cols-[1fr_104px] gap-5 border-b border-gray-800 py-7 sm:grid-cols-[1fr_128px]">
                  <div>
                    <p className="mb-2 text-xs text-[#758296]">{publishedDate(blog.date)}</p>
                    <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em] text-[#F9FAFB]"><Link to={`/blogs/${encodeURIComponent(blog.slug)}`} className="hover:text-[#22C55E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22C55E]">{blog.title}</Link></h2>
                    {blog.subtitle && <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#9CA3AF]">{blog.subtitle}</p>}
                    <p className="mt-3 inline-flex items-center gap-2 text-xs text-[#758296]"><Clock size={14} />{blog.readingMinutes} min read</p>
                  </div>
                  <Link to={`/blogs/${encodeURIComponent(blog.slug)}`} aria-label={`Read ${blog.title}`} className="overflow-hidden bg-[#111827]">
                    {sanitizeUrl(blog.image) ? <img src={sanitizeUrl(blog.image)} alt="" loading="lazy" className="aspect-square h-full w-full object-cover" /> : <span className="flex aspect-square h-full items-center justify-center font-serif text-xs text-[#758296]">Journal</span>}
                  </Link>
                </article>
              ))}
            </div>}
          </>
        )}
      </section>
    </div>
  );
}
