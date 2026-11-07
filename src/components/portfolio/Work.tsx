import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  LayoutGrid,
  List,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  portfolioProjects,
  type PortfolioProject,
  type ProjectCategory,
} from '../../data/projects';

const filterCategories: ('All' | ProjectCategory)[] = [
  'All',
  'Architecture',
  'Urban Planning',
  'Landscape',
  'Research',
  'Competitions',
];

const clients = [
  'Finance59 LLC',
  'HBCU',
  'Affordable Smart Homes',
  'Stremline Bookeeping',
  'Benjamin Franklin',
  'My Biz Answers',
  'Opulence Radio',
];

const logoImages = [
  '/brand-logo-design-1.jpg',
  '/brand-logo-design-2.jpg',
  '/brand-logo-design-3.jpg',
  '/brand-logo-design-4.jpg',
  '/brand-logo-design-5.jpg',
  '/brand-logo-design-6.jpg',
  '/brand-logo-design-7.jpg',
];

const logos = clients.map((client, i) => ({
  id: i + 1,
  image: logoImages[i],
  client,
}));

export default function Work() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedLogo, setSelectedLogo] = useState<number | null>(null);

  const projectSlug = searchParams.get('project');
  const activeProject: PortfolioProject | null =
    portfolioProjects.find((p) => p.slug === projectSlug) ?? null;

  const visibleProjects =
    activeFilter === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.categories.includes(activeFilter));

  const openProject = (project: PortfolioProject) => {
    setSearchParams({ project: project.slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProject = () => {
    setSearchParams({});
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedLogo !== null) {
        setSelectedLogo(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedLogo]);

  // Next project for Case Study footer (Section 8.3 #8)
  const activeIndex = activeProject
    ? portfolioProjects.findIndex((p) => p.slug === activeProject.slug)
    : -1;
  const nextProject =
    activeIndex >= 0
      ? portfolioProjects[(activeIndex + 1) % portfolioProjects.length]
      : null;

  if (activeProject) {
    return (
      <article className="bg-paper pb-20 pt-12 text-graphite lg:pt-16">
        <div className="brand-container">
          <button
            type="button"
            onClick={closeProject}
            className="type-label mb-8 inline-flex min-h-[44px] items-center gap-2 text-graphite-soft transition-colors hover:text-graphite"
          >
            <ArrowLeft size={15} strokeWidth={1.5} />
            Back to all work
          </button>

          {/* 1. Hero title + metadata strip (Section 8.3 #1) */}
          <header className="border-b border-stone pb-10">
            <div className="flex flex-wrap items-center gap-2">
              {activeProject.categories.map((cat) => (
                <span key={cat} className="tag-pill">
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="type-h1 mt-4 text-graphite">{activeProject.title}</h1>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-stone pt-6 sm:grid-cols-4">
              <div>
                <dt className="type-label text-graphite-soft">Year</dt>
                <dd className="mt-1 font-mono text-sm text-graphite">{activeProject.year}</dd>
              </div>
              <div>
                <dt className="type-label text-graphite-soft">Location</dt>
                <dd className="mt-1 font-mono text-sm text-graphite">{activeProject.location}</dd>
              </div>
              <div>
                <dt className="type-label text-graphite-soft">Role</dt>
                <dd className="mt-1 font-mono text-sm text-graphite">{activeProject.role}</dd>
              </div>
              <div>
                <dt className="type-label text-graphite-soft">Status</dt>
                <dd className="mt-1 font-mono text-sm text-graphite">{activeProject.status}</dd>
              </div>
            </dl>
          </header>

          {/* Hero render */}
          <figure className="render-image-wrap my-12 overflow-hidden border border-stone bg-paper-raised">
            <img
              src={activeProject.image}
              alt={activeProject.imageAlt}
              width={1600}
              height={900}
              className="aspect-[16/9] w-full object-cover"
            />
            <figcaption className="type-label border-t border-stone px-5 py-3 text-graphite-soft">
              {activeProject.title} · {activeProject.location} ({activeProject.year})
            </figcaption>
          </figure>

          {/* 2. Overview & Key Facts (Section 8.3 #2) */}
          <div className="grid grid-cols-1 gap-12 border-b border-stone pb-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="type-label text-forest-deep">01 · Overview &amp; Key Facts</p>
              <dl className="mt-6 grid grid-cols-2 gap-4">
                {activeProject.keyFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-card border border-stone bg-paper-raised p-4"
                  >
                    <dt className="type-label text-graphite-soft">{fact.label}</dt>
                    <dd className="mt-1 font-mono text-sm font-medium text-graphite">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-8">
              <p className="type-body-lg max-w-[65ch] text-graphite">{activeProject.overview}</p>
            </div>
          </div>

          {/* 3–7. Structured Case Study Sections (Section 8.3 #3–#7) */}
          <div className="divide-y divide-stone">
            {[
              { num: '02', label: 'Context & Site Analysis', body: activeProject.context },
              { num: '03', label: 'Concept & Environmental Strategy', body: activeProject.concept },
              { num: '04', label: 'Design Process & Iterations', body: activeProject.process },
              { num: '05', label: 'Final Design & Spatial Organization', body: activeProject.finalDesign },
              { num: '06', label: 'Outcome & Key Learnings', body: activeProject.impact },
            ].map((sec) => (
              <div
                key={sec.num}
                className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-4">
                  <p className="type-label text-forest-deep">
                    {sec.num} · {sec.label}
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <p className="max-w-[65ch] text-base leading-[1.7] text-graphite-soft">
                    {sec.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Drawings & Renders Gallery if available */}
          {activeProject.galleryImages && activeProject.galleryImages.length > 0 && (
            <div className="mt-12 border-t border-stone pt-12">
              <p className="type-label mb-3 text-forest-deep">07 · Drawings &amp; Spatial Outcomes</p>
              <h2 className="type-h2 mb-8 text-graphite">
                Plans, courtyard sections and architectural <span className="accent-italic">renders</span>.
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {activeProject.galleryImages.map((img) => (
                  <figure
                    key={img.src}
                    className="overflow-hidden border border-stone bg-paper-raised"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={1200}
                      height={800}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover"
                    />
                    <figcaption className="type-label border-t border-stone px-4 py-3 text-graphite-soft">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* 8. Next Project Link (Section 8.3 #8: Large, full-width, with image preview) */}
          {nextProject && (
            <div className="mt-20 border-t border-stone pt-14">
              <p className="type-label mb-4 text-graphite-soft">Next Case Study</p>
              <button
                type="button"
                onClick={() => openProject(nextProject)}
                data-cursor="view"
                className="group grid w-full grid-cols-1 items-center gap-8 border border-stone bg-paper-raised p-6 text-left transition-colors hover:border-graphite sm:p-10 lg:grid-cols-12"
              >
                <div className="lg:col-span-7">
                  <span className="tag-pill">{nextProject.category}</span>
                  <h2 className="type-h2 mt-4 text-graphite transition-transform duration-500 group-hover:translate-x-2">
                    {nextProject.title}
                  </h2>
                  <p className="type-label mt-3 text-graphite-soft">
                    {nextProject.year} · {nextProject.location}
                  </p>
                  <span className="link-underline mt-6 text-sm">
                    View next project
                    <ArrowRight size={15} strokeWidth={1.5} />
                  </span>
                </div>
                <div className="overflow-hidden border border-stone lg:col-span-5">
                  <img
                    src={nextProject.image}
                    alt={nextProject.imageAlt}
                    width={800}
                    height={533}
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              </button>
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <section id="work" className="brand-section bg-paper text-graphite">
      <div className="brand-container">
        {/* Page Heading */}
        <header className="border-b border-stone pb-10">
          <p className="type-label mb-3 text-forest-deep">Work &amp; Case Studies</p>
          <h1 className="type-h1 text-graphite">
            Architecture, urban planning and <span className="accent-italic">research</span>.
          </h1>
          <p className="type-body-lg mt-5 max-w-2xl text-graphite-soft">
            Selected academic, competition and professional projects exploring climate-responsive
            building form, courtyard systems and healthier public realms in Bangladesh.
          </p>

          {/* Section 8.2: Filter chips + Grid/List view toggle */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by discipline">
              {filterCategories.map((category) => {
                const active = activeFilter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveFilter(category)}
                    aria-pressed={active}
                    className={`min-h-[40px] rounded-pill px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors ${
                      active
                        ? 'bg-forest text-paper'
                        : 'bg-blush text-graphite hover:bg-sage/40'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="inline-flex items-center rounded-pill border border-stone bg-paper-raised p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-pill px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.08em] transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-forest text-paper'
                    : 'text-graphite-soft hover:text-graphite'
                }`}
              >
                <LayoutGrid size={14} strokeWidth={1.5} />
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-pressed={viewMode === 'list'}
                className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-pill px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.08em] transition-colors ${
                  viewMode === 'list'
                    ? 'bg-forest text-paper'
                    : 'text-graphite-soft hover:text-graphite'
                }`}
              >
                <List size={14} strokeWidth={1.5} />
                List
              </button>
            </div>
          </div>
        </header>

        {/* Projects Grid / List */}
        {viewMode === 'grid' ? (
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
            {visibleProjects.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer"
                onClick={() => openProject(project)}
              >
                <div
                  data-cursor="view"
                  className="render-image-wrap overflow-hidden border border-stone bg-paper-raised"
                >
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="type-label text-graphite-soft">
                      {project.year} · {project.location}
                    </span>
                    <span className="tag-pill">{project.category}</span>
                  </div>

                  <h2 className="mt-3 font-serif text-3xl leading-tight text-graphite transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    {project.title}
                  </h2>

                  <div className="mt-2.5 h-px w-10 bg-terracotta transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-28" />

                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-graphite-soft">
                    {project.overview}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="mt-10 divide-y divide-stone border-b border-stone">
            {visibleProjects.map((project) => (
              <article
                key={project.slug}
                onClick={() => openProject(project)}
                className="group grid cursor-pointer grid-cols-1 items-center gap-6 py-7 transition-colors hover:bg-paper-raised/70 md:grid-cols-12"
              >
                <div className="md:col-span-5">
                  <h2 className="font-serif text-2xl text-graphite transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
                    {project.title}
                  </h2>
                </div>
                <div className="md:col-span-3">
                  <span className="type-label text-graphite-soft">{project.location}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="tag-pill">{project.category}</span>
                </div>
                <div className="flex items-center justify-between md:col-span-2 md:justify-end">
                  <span className="type-label text-graphite-soft">{project.year}</span>
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="ml-3 text-forest transition-transform group-hover:translate-x-1"
                  />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Visual Communication & Brand Identity Section */}
        <div className="mt-24 border-t border-stone pt-16">
          <div className="mb-10 max-w-2xl">
            <p className="type-label mb-3 text-forest-deep">Visual Communication · 2022–2024</p>
            <h2 className="type-h2 text-graphite">
              Brand identity &amp; graphic <span className="accent-italic">systems</span>.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-graphite-soft">
              Alongside architectural practice, I have delivered visual identity systems for over
              70 international clients with a 5.0-star rating.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {logos.map((logo, index) => (
              <button
                key={logo.id}
                type="button"
                onClick={() => setSelectedLogo(index)}
                className="group overflow-hidden border border-stone bg-paper-raised p-2 text-left transition-colors hover:border-graphite"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={logo.image}
                    alt={`Brand identity design for ${logo.client}`}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="type-label mt-2 truncate text-graphite-soft">{logo.client}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Logo Lightbox Modal */}
      <AnimatePresence>
        {selectedLogo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Logo preview for ${logos[selectedLogo].client}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-graphite/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedLogo(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-xl border border-stone bg-paper p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedLogo(null)}
                aria-label="Close preview"
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone bg-paper-raised text-graphite"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
              <img
                src={logos[selectedLogo].image}
                alt={`Brand identity design for ${logos[selectedLogo].client}`}
                className="w-full object-contain"
              />
              <div className="mt-4 flex items-center justify-between border-t border-stone pt-3">
                <p className="font-serif text-2xl text-graphite">{logos[selectedLogo].client}</p>
                <span className="type-label text-graphite-soft">Brand Identity</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
