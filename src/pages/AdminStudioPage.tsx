import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ExternalLink,
  Eye,
  FileText,
  Image as ImageIcon,
  Plus,
  Save,
  Trash2,
  Upload,
} from 'lucide-react';
import SEO from '../components/SEO';
import { renderMarkdown } from '../lib/markdown';
import { sanitizeHtml } from '../lib/sanitizeHtml';
import { toSlug } from '../lib/slug';

interface StudioPost {
  filename: string;
  title: string;
  subtitle: string;
  date: string;
  slug: string;
  image: string;
  imageAlt: string;
  draft: boolean;
  content: string;
}

const emptyPost = (): StudioPost => ({
  filename: '',
  title: '',
  subtitle: '',
  date: new Date().toISOString().slice(0, 10),
  slug: '',
  image: '',
  imageAlt: '',
  draft: false,
  content: 'Write your story here using standard Markdown...\n\n## Section heading\n\nParagraph text with **bold** and *italic* styling.',
});

export default function AdminStudioPage() {
  const isDev = import.meta.env.DEV;
  const [posts, setPosts] = useState<StudioPost[]>([]);
  const [current, setCurrent] = useState<StudioPost>(emptyPost());
  const [slugTouched, setSlugTouched] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'saving' | 'saved' | 'error'; message?: string }>({
    type: 'idle',
  });

  const loadPosts = async () => {
    if (!isDev) return;
    try {
      const res = await fetch('/__journal_api/posts');
      if (!res.ok) return;
      const data = (await res.json()) as { posts: StudioPost[] };
      setPosts(data.posts ?? []);
    } catch {
      // Ignore if dev API is unavailable
    }
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectPost = (post: StudioPost) => {
    setCurrent(post);
    setSlugTouched(true);
    setStatus({ type: 'idle' });
  };

  const handleNewPost = () => {
    setCurrent(emptyPost());
    setSlugTouched(false);
    setStatus({ type: 'idle' });
  };

  const handleTitleChange = (title: string) => {
    setCurrent((prev) => ({
      ...prev,
      title,
      slug: slugTouched ? prev.slug : toSlug(title),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'saving' });
    try {
      const res = await fetch('/__journal_api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalFilename: current.filename || undefined,
          title: current.title,
          subtitle: current.subtitle,
          date: current.date,
          slug: current.slug || toSlug(current.title),
          image: current.image,
          imageAlt: current.imageAlt,
          draft: current.draft,
          content: current.content,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; filename?: string; slug?: string; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Could not save post.');
      }
      setCurrent((prev) => ({
        ...prev,
        filename: data.filename ?? prev.filename,
        slug: data.slug ?? prev.slug,
      }));
      await loadPosts();
      setStatus({ type: 'saved', message: `Saved to src/content/journal/${data.filename}` });
    } catch (err) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : 'Save failed' });
    }
  };

  const handleDelete = async (filename: string) => {
    if (!filename || !window.confirm(`Delete ${filename}?`)) return;
    try {
      const res = await fetch('/__journal_api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      });
      if (res.ok) {
        await loadPosts();
        if (current.filename === filename) handleNewPost();
      }
    } catch {
      // Ignore
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch('/__journal_api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            base64: String(reader.result),
          }),
        });
        const data = (await res.json()) as { ok?: boolean; url?: string };
        if (data.ok && data.url) {
          setCurrent((prev) => ({ ...prev, image: data.url ?? prev.image }));
        }
      } catch {
        // Ignore upload error
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isDev) {
    return (
      <div className="min-h-screen bg-[#040816] px-5 py-24 text-[#F9FAFB]">
        <SEO title="Journal Admin" description="Sign in to manage journal posts." path="/admin" noindex />
        <div className="mx-auto max-w-xl rounded-2xl border border-gray-800 bg-[#111827] p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#22C55E]">Journal CMS · Option 2</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-[#F9FAFB]">Manage Journal Posts</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#9CA3AF]">
            Your journal is powered by Git-backed Markdown files so it can never pause or go offline. Log in with your
            GitHub account on <strong>Pages CMS</strong> to write, edit, upload cover images, and publish from any
            browser—or run <code className="rounded bg-[#040816] px-1.5 py-0.5 text-[#22C55E]">npm run dev</code> on
            your computer to open the built-in Local Journal Studio at <code className="text-[#F9FAFB]">/admin</code>.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://app.pagescms.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#22C55E] px-5 py-2.5 text-sm font-semibold text-[#040816] transition hover:bg-[#16A34A]"
            >
              Sign in with GitHub (Pages CMS)
              <ExternalLink size={16} />
            </a>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-medium text-[#F9FAFB] hover:border-[#22C55E]"
            >
              <ArrowLeft size={16} />
              View Journal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040816] text-[#F9FAFB]">
      <SEO title="Journal Studio" description="Local visual editor for journal posts." path="/admin" noindex />
      <header className="border-b border-gray-800 bg-[#0B1120] px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#22C55E]">
              <ArrowLeft size={16} />
              Back to `/blogs`
            </Link>
            <span className="text-gray-700">|</span>
            <h1 className="text-lg font-bold text-[#F9FAFB]">Journal Studio</h1>
            <span className="rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-2.5 py-0.5 text-xs font-medium text-[#22C55E]">
              Local Dev Mode
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://app.pagescms.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-700 px-3 py-1.5 text-xs font-medium text-[#9CA3AF] hover:border-[#22C55E] hover:text-[#F9FAFB]"
            >
              Cloud Login (Pages CMS)
              <ExternalLink size={13} />
            </a>
            <button
              type="button"
              onClick={handleNewPost}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#22C55E] px-3.5 py-1.5 text-xs font-semibold text-[#040816] hover:bg-[#16A34A]"
            >
              <Plus size={15} />
              New Story
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-xl border border-gray-800 bg-[#111827] p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
              Stories ({posts.length})
            </h2>
            <div className="mt-3 space-y-2">
              {posts.length === 0 ? (
                <p className="py-4 text-xs text-[#6B7280]">No Markdown posts yet. Click New Story to write one.</p>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.filename}
                    className={`group flex items-start justify-between gap-2 rounded-lg border p-3 transition ${
                      current.filename === post.filename
                        ? 'border-[#22C55E] bg-[#22C55E]/10'
                        : 'border-gray-800 bg-[#0B1120] hover:border-gray-700'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectPost(post)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <p className="truncate text-sm font-medium text-[#F9FAFB]">{post.title || post.filename}</p>
                      <p className="mt-1 flex items-center gap-2 text-xs text-[#9CA3AF]">
                        <span>{post.date}</span>
                        {post.draft && (
                          <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">
                            Draft
                          </span>
                        )}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.filename)}
                      aria-label={`Delete ${post.title}`}
                      className="text-[#6B7280] opacity-0 transition hover:text-rose-400 group-hover:opacity-100"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        <form onSubmit={handleSave} className="space-y-6 rounded-2xl border border-gray-800 bg-[#111827] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                Story Title *
              </label>
              <input
                type="text"
                required
                value={current.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., Designing for Daylight and Calm in Dense Cities"
                className="mt-1.5 w-full rounded-lg border border-gray-700 bg-[#0B1120] px-4 py-2.5 text-[#F9FAFB] focus:border-[#22C55E] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                Subtitle / Summary
              </label>
              <input
                type="text"
                value={current.subtitle}
                onChange={(e) => setCurrent((p) => ({ ...p, subtitle: e.target.value }))}
                placeholder="One sentence shown below the title and in search previews."
                className="mt-1.5 w-full rounded-lg border border-gray-700 bg-[#0B1120] px-4 py-2 text-sm text-[#F9FAFB] focus:border-[#22C55E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                Publish Date *
              </label>
              <input
                type="date"
                required
                value={current.date}
                onChange={(e) => setCurrent((p) => ({ ...p, date: e.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-gray-700 bg-[#0B1120] px-4 py-2 text-sm text-[#F9FAFB] focus:border-[#22C55E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                URL Slug
              </label>
              <input
                type="text"
                value={current.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setCurrent((p) => ({ ...p, slug: toSlug(e.target.value) }));
                }}
                placeholder="designing-for-daylight"
                className="mt-1.5 w-full rounded-lg border border-gray-700 bg-[#0B1120] px-4 py-2 text-sm text-[#F9FAFB] focus:border-[#22C55E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                Cover Image Path or Upload
              </label>
              <div className="mt-1.5 flex gap-2">
                <input
                  type="text"
                  value={current.image}
                  onChange={(e) => setCurrent((p) => ({ ...p, image: e.target.value }))}
                  placeholder="/journal/cover.jpg"
                  className="w-full rounded-lg border border-gray-700 bg-[#0B1120] px-3 py-2 text-sm text-[#F9FAFB] focus:border-[#22C55E] focus:outline-none"
                />
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-700 bg-[#0B1120] px-3 py-2 text-xs font-medium text-[#F9FAFB] hover:border-[#22C55E]">
                  <Upload size={14} />
                  Upload
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                Cover Image Alt Text
              </label>
              <input
                type="text"
                value={current.imageAlt}
                onChange={(e) => setCurrent((p) => ({ ...p, imageAlt: e.target.value }))}
                placeholder="Describe the cover image"
                className="mt-1.5 w-full rounded-lg border border-gray-700 bg-[#0B1120] px-3 py-2 text-sm text-[#F9FAFB] focus:border-[#22C55E] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
                Body (Markdown)
              </label>
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#22C55E] hover:underline"
              >
                {previewMode ? <FileText size={14} /> : <Eye size={14} />}
                {previewMode ? 'Edit Markdown' : 'Live Preview'}
              </button>
            </div>

            {previewMode ? (
              <div
                className="journal-prose mt-2 min-h-[320px] rounded-lg border border-gray-700 bg-[#0B1120] p-6 font-serif text-lg leading-[1.8] text-[#B7C0CC] [&_a]:text-[#22C55E] [&_a]:underline [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[#22C55E] [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-8 [&_h2]:font-sans [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:font-sans [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_p]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(renderMarkdown(current.content)) }}
              />
            ) : (
              <textarea
                rows={14}
                required
                value={current.content}
                onChange={(e) => setCurrent((p) => ({ ...p, content: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0B1120] p-4 font-mono text-sm leading-relaxed text-[#F9FAFB] focus:border-[#22C55E] focus:outline-none"
              />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-800 pt-4">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#D1D5DB]">
              <input
                type="checkbox"
                checked={current.draft}
                onChange={(e) => setCurrent((p) => ({ ...p, draft: e.target.checked }))}
                className="h-4 w-4 rounded border-gray-600 text-[#22C55E] focus:ring-[#22C55E]"
              />
              Save as draft (hidden from public `/blogs`)
            </label>

            <div className="flex items-center gap-3">
              {status.type === 'saved' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#22C55E]">
                  <Check size={14} />
                  {status.message}
                </span>
              )}
              {status.type === 'error' && (
                <span className="text-xs font-medium text-rose-400">{status.message}</span>
              )}
              {current.image && (
                <span className="inline-flex items-center gap-1 text-xs text-[#9CA3AF]">
                  <ImageIcon size={13} /> Cover attached
                </span>
              )}
              <button
                type="submit"
                disabled={status.type === 'saving'}
                className="inline-flex items-center gap-2 rounded-lg bg-[#22C55E] px-5 py-2.5 text-sm font-semibold text-[#040816] transition hover:bg-[#16A34A] disabled:opacity-50"
              >
                <Save size={16} />
                {status.type === 'saving' ? 'Saving...' : 'Save Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
