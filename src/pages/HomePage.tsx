import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Compass, Download, Heart, Mail, Wind } from 'lucide-react';
import SEO from '../components/SEO';
import HeroVideoSection from '../components/brand/HeroVideoSection';
import { portfolioProjects } from '../data/projects';
import { getJournalPosts } from '../data/journal';

const credentials = [
  { label: 'Degree', value: 'B.Arch · HSTU' },
  { label: 'Registered', value: 'IAB Associate Member · AR-260' },
  { label: 'Recognition', value: 'Open Doors 2026 · Diploma of High Achievement' },
  { label: 'Published', value: 'Thesis on Zenodo · Open Access' },
];

const principles = [
  {
    icon: Heart,
    label: '01 · Human-Centred',
    title: 'Designed around everyday human experience',
    description:
      'Workplaces, hospitals and neighbourhoods begin with the people who use them: visual relief, ergonomic comfort, acoustic calm and social connection.',
  },
  {
    icon: Wind,
    label: '02 · Climate-Responsive',
    title: 'Shaped by sun, wind and monsoon rain',
    description:
      'Orientation, shallow floor plates, solar shading, verandahs and planted courtyards work with Bangladesh’s climate before mechanical cooling takes over.',
  },
  {
    icon: Compass,
    label: '03 · Research-Informed',
    title: 'Grounded in field evidence and site analysis',
    description:
      'Decisions are tested against occupant surveys, microclimate studies and post-occupancy frameworks, so design claims stay honest.',
  },
];

export default function HomePage() {
  const featuredProjects = portfolioProjects.slice(0, 3);
  const recentPosts = getJournalPosts().slice(0, 3);

  return (
    <div className="bg-paper text-graphite">
      <SEO
        title="Home"
        description="Amitabh Chondro Roy (Amitabh Roy) is an architect and urban planning professional in Bangladesh, exploring human-centred, climate-responsive architecture and sustainable urban development."
        path="/"
        profilePage
      />

      {/* 1. HERO: the courtyard render, name, title, two actions */}
      <HeroVideoSection />

      {/* 2. CREDENTIAL STRIP: instant trust for committees and employers */}
      <section aria-label="Credentials" className="border-b border-stone bg-paper-raised">
        <dl className="brand-container grid grid-cols-2 gap-x-6 gap-y-5 py-7 lg:grid-cols-4">
          {credentials.map((item) => (
            <div key={item.label} className="border-l border-stone pl-4">
              <dt className="type-label text-graphite-soft">{item.label}</dt>
              <dd className="mt-1 text-sm font-medium leading-snug text-graphite">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 3. SELECTED WORK: three signature projects */}
      <section id="selected-work" className="brand-section border-b border-stone">
        <div className="brand-container">
          <div className="mb-14 flex flex-col justify-between gap-6 border-b border-stone pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="type-label mb-3 text-forest-deep">Selected Work</p>
              <h2 className="type-h1 text-graphite">
                Designing for <span className="accent-italic">place</span> and people.
              </h2>
            </div>
            <Link to="/work" className="link-underline text-base">
              All projects &amp; case studies
              <ArrowUpRight size={17} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {featuredProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              const imageCols = isEven ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-2';
              const textCols = isEven ? 'lg:col-span-5' : 'lg:col-span-5 lg:order-1';
              return (
                <motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
                >
                  <div className={imageCols}>
                    <Link
                      to={`/work/${encodeURIComponent(project.slug)}`}
                      data-cursor="view"
                      className="render-image-wrap block overflow-hidden border border-stone bg-paper-raised"
                    >
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        width={1200}
                        height={800}
                        loading="lazy"
                        className="aspect-[3/2] w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </Link>
                  </div>

                  <div className={textCols}>
                    <p className="type-label text-graphite-soft">
                      0{index + 1} · {project.category} · {project.year}
                    </p>
                    <h3 className="mt-4 font-serif text-3xl leading-[1.1] text-graphite sm:text-4xl">
                      <Link to={`/work/${encodeURIComponent(project.slug)}`}>{project.title}</Link>
                    </h3>
                    <div className="mt-3 h-px w-12 bg-terracotta transition-all duration-[600ms] group-hover:w-32" />
                    <p className="mt-5 max-w-[56ch] text-base leading-[1.65] text-graphite-soft">
                      {project.overview}
                    </p>
                    <Link
                      to={`/work/${encodeURIComponent(project.slug)}`}
                      className="link-underline mt-7 text-sm"
                    >
                      View case study
                      <ArrowRight size={15} strokeWidth={1.5} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. APPROACH: three principles */}
      <section id="approach" className="brand-section border-b border-stone bg-paper-raised">
        <div className="brand-container">
          <div className="max-w-3xl">
            <p className="type-label mb-3 text-forest-deep">Approach</p>
            <h2 className="type-h1 text-graphite">
              Warm materials, clear <span className="accent-italic">evidence</span>, quiet form.
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {principles.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="rounded-card border border-stone bg-paper p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="type-label text-graphite-soft">{item.label}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-stone text-terracotta">
                    <item.icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-3xl leading-tight text-graphite">{item.title}</h3>
                <p className="mt-4 text-base leading-[1.65] text-graphite-soft">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RESEARCH & WRITING: thesis + latest essays */}
      <section id="research-teaser" className="brand-section border-b border-stone">
        <div className="brand-container">
          <div className="mb-12 max-w-3xl">
            <p className="type-label mb-3 text-forest-deep">Research &amp; Writing</p>
            <h2 className="type-h1 text-graphite">
              Evidence from the <span className="accent-italic">field</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="rounded-card border border-stone bg-paper-raised p-8 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag-pill">B.Arch Thesis · 2021 / Rev. 2026</span>
                <span className="type-label text-graphite-soft">DOI 10.5281/zenodo.23915357</span>
              </div>
              <h3 className="mt-4 font-serif text-3xl leading-tight text-graphite sm:text-4xl">
                Designing a Human-Centered Work Environment for the Employees of Rangpur Hi-Tech Park
              </h3>
              <p className="mt-4 text-base leading-[1.65] text-graphite-soft">
                A survey of 30 IT/ITES professionals found light, ventilation and greenery scored
                lowest in existing offices (2.93 / 5.00). The thesis turns those findings into an
                18-attribute design framework with a projected +30.4% improvement in indoor
                environmental quality.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-stone pt-5">
                <Link to="/research" className="link-underline text-sm">
                  Survey dashboard &amp; data
                  <ArrowRight size={15} strokeWidth={1.5} />
                </Link>
                <a
                  href="https://doi.org/10.5281/zenodo.23915357"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm"
                >
                  Read on Zenodo
                  <ArrowUpRight size={15} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="type-label text-graphite-soft">Latest essays</span>
                <Link to="/blogs" className="link-underline text-xs">
                  All essays <ArrowRight size={13} strokeWidth={1.5} />
                </Link>
              </div>
              <div className="divide-y divide-stone border-y border-stone">
                {recentPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blogs/${encodeURIComponent(post.slug)}`}
                    className="group flex items-baseline justify-between gap-4 py-5"
                  >
                    <div>
                      <p className="type-label text-forest-deep">{post.category}</p>
                      <p className="mt-1 font-serif text-2xl leading-snug text-graphite group-hover:text-forest-deep">
                        {post.title}
                      </p>
                    </div>
                    <span className="type-label shrink-0 text-graphite-soft">
                      {post.readingMinutes} min
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT */}
      <section id="about-teaser" className="brand-section border-b border-stone bg-paper-raised">
        <div className="brand-container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="mx-auto max-w-sm overflow-hidden border border-stone bg-paper lg:mx-0">
                <img
                  src="/amitabh-chondro-roy-architect-portrait.jpg"
                  alt="Portrait of Amitabh Chondro Roy, architect and urban planning researcher"
                  width={847}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="type-label mb-3 text-forest-deep">About</p>
              <h2 className="type-h1 text-graphite">
                Grounded in <span className="accent-italic">climate</span>, guided by people.
              </h2>
              <p className="type-body-lg mt-6 max-w-[62ch] text-graphite">
                I am an architect and urban-planning researcher in Bangladesh exploring how daylight,
                natural ventilation, courtyards and biophilic design improve human wellbeing. A B.Arch
                graduate of HSTU and a 2026 Open Doors Diploma of High Achievement recipient in
                Urbanism, I work across architectural practice, environmental analysis and
                evidence-based urban research.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/about" className="btn-primary">
                  Biography &amp; CV
                  <ArrowRight size={16} strokeWidth={1.5} className="btn-arrow" />
                </Link>
                <a
                  href="/cv/Amitabh_Chondro_Roy_Academic_CV.pdf"
                  download="Amitabh_Chondro_Roy_Academic_CV.pdf"
                  className="btn-secondary"
                >
                  <Download size={16} strokeWidth={1.5} />
                  Academic CV (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT */}
      <section id="contact-band" className="brand-section">
        <div className="brand-container">
          <div className="rounded-card border border-stone bg-paper-raised p-8 sm:p-14 lg:p-20">
            <p className="type-label mb-4 text-forest-deep">
              Collaborations · Academic Research · Commissions
            </p>
            <h2 className="type-display-xl max-w-4xl text-graphite">
              Let’s talk about your next <span className="accent-italic">project</span>.
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link to="/contact" className="btn-primary">
                Get in touch
                <ArrowRight size={16} strokeWidth={1.5} className="btn-arrow" />
              </Link>
              <a href="mailto:arc.mit07@gmail.com" className="btn-secondary">
                <Mail size={16} strokeWidth={1.5} />
                arc.mit07@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
