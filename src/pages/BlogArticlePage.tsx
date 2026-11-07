import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { getJournalPost } from '../data/journal';
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

  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    // Malformed escape sequences fall through to the not-found state.
  }

  const blog = getJournalPost(decodedSlug);

  if (!blog) return (
    <div className="min-h-screen bg-[#040816] px-5 pb-20 pt-32 text-[#F9FAFB]">
      <SEO title="Story not found" description="This journal story could not be found." path={`/blogs/${encodeURIComponent(slug)}`} />
      <div className="mx-auto max-w-2xl"><p className="mb-4 text-sm text-[#B7C0CC]">Journal</p><h1 className="font-serif text-4xl">This story isn’t available.</h1><p className="mt-4 leading-7 text-[#B7C0CC]">It may have been unpublished or the address may have changed.</p><Link to="/blogs" className="mt-8 inline-flex items-center gap-2 font-semibold text-[#22C55E] hover:underline"><ArrowLeft size={17} /> Back to the journal</Link></div>
    </div>
  );

  const coverImage = sanitizeUrl(blog.image);
  const description = blog.description || blog.subtitle || markdownToPlainText(blog.content).slice(0, 155);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description,
    datePublished: blog.date,
    dateModified: blog.date,
    image: coverImage ? `https://amitabhroy.bd${coverImage}` : 'https://amitabhroy.bd/og-image.jpg',
    mainEntityOfPage: `https://amitabhroy.bd/blogs/${encodeURIComponent(blog.slug)}`,
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

  return (
    <div className="min-h-screen bg-[#040816] pb-24 pt-16 text-[#F9FAFB]">
      <SEO
        title={blog.seoTitle || blog.title}
        description={description}
        path={`/blogs/${encodeURIComponent(blog.slug)}`}
        image={coverImage || undefined}
        type="article"
        keywords={blog.keywords || undefined}
      />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <article>
        <header className="mx-auto max-w-3xl px-5 pb-9 pt-12 sm:px-8 sm:pt-16">
          <Link to="/blogs" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#B7C0CC] hover:text-[#22C55E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#22C55E]"><ArrowLeft size={16} /> Journal</Link>
          <p className="mb-5 text-sm text-[#B7C0CC]">
            {blog.category && <><span className="font-medium text-[#22C55E]">{blog.category}</span><span className="px-2">·</span></>}
            {publishedDate(blog.date)}
          </p>
          <h1 className="font-serif text-4xl leading-[1.08] tracking-[-0.035em] sm:text-6xl">{blog.title}</h1>
          {blog.subtitle && <p className="mt-5 font-serif text-xl leading-relaxed text-[#B7C0CC] sm:text-2xl">{blog.subtitle}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-[#B7C0CC]"><span>By Amitabh Chondro Roy | Architect &amp; Urban Planning Researcher</span><span aria-hidden="true">·</span><Clock size={15} /><span>{blog.readingMinutes} min read</span></div>
        </header>

        {coverImage && <figure className="mx-auto mb-12 max-w-6xl px-0 sm:px-8"><img src={coverImage} alt={blog.imageAlt} className="max-h-[620px] w-full bg-[#D9DED5] object-cover" /><figcaption className="px-5 pt-3 text-center text-xs text-[#B7C0CC] sm:px-0">{blog.imageAlt}</figcaption></figure>}

        <div className="mx-auto max-w-[720px] px-5 sm:px-8">
          <div className="journal-prose font-serif text-lg leading-[1.9] text-[#B7C0CC] [&_a]:text-[#22C55E] [&_a]:underline [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-[#22C55E] [&_blockquote]:pl-5 [&_blockquote]:italic [&_h1]:mb-5 [&_h1]:mt-12 [&_h1]:font-sans [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:text-[#F9FAFB] [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-sans [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#F9FAFB] [&_h3]:mb-3 [&_h3]:mt-9 [&_h3]:font-sans [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#F9FAFB] [&_hr]:my-10 [&_img]:my-8 [&_img]:h-auto [&_img]:w-full [&_img]:object-cover [&_li]:my-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-7 [&_p]:my-6 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:bg-[#111827] [&_pre]:p-4 [&_strong]:font-semibold [&_strong]:text-[#F9FAFB] [&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:font-sans [&_table]:text-sm [&_td]:border-b [&_td]:border-gray-800 [&_td]:py-3 [&_td]:pr-4 [&_th]:border-b [&_th]:border-gray-700 [&_th]:py-3 [&_th]:pr-4 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[#F9FAFB] [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-7" dangerouslySetInnerHTML={{ __html: sanitizeHtml(renderMarkdown(blog.content)) }} />
          <footer className="mt-16 border-t border-gray-800 pt-8"><Link to="/blogs" className="inline-flex items-center gap-2 font-semibold text-[#22C55E] hover:underline"><ArrowLeft size={17} /> More from the journal</Link></footer>
        </div>
      </article>
    </div>
  );
}
