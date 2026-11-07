import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Download,
  Heart,
  Mail,
  Wind,
} from 'lucide-react';
import SEO from '../components/SEO';
import HeroVideoSection from '../components/brand/HeroVideoSection';
import MarqueeStrip from '../components/brand/MarqueeStrip';
import BeforeAfterSlider from '../components/brand/BeforeAfterSlider';
import AnimatedNumber from '../components/research/AnimatedNumber';
import { portfolioProjects } from '../data/projects';
import { getJournalPosts } from '../data/journal';

export default function HomePage() {
  const featuredProjects = portfolioProjects.slice(0, 5);
  const recentPosts = getJournalPosts().slice(0, 3);

  // Section 10.3 #13: Subtle magnetic CTA button on the primary contact band
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const [magnetOffset, setMagnetOffset] = useState({ x: 0, y: 0 });

  const handleMagnetMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = magnetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * 8;
    const dy = ((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * 8;
    setMagnetOffset({ x: Math.max(-8, Math.min(8, dx)), y: Math.max(-8, Math.min(8, dy)) });
  };

  const resetMagnet = () => setMagnetOffset({ x: 0, y: 0 });

  const principles = [
    {
      icon: Heart,
      label: '01 · Human-Centred',
      title: 'Designed around everyday human experience',
      description:
        'Workplaces, hospitals and neighbourhoods begin with the people who use them—prioritizing visual relief, ergonomic comfort, acoustic calm and social connection.',
    },
    {
      icon: Wind,
      label: '02 · Climate-Responsive',
      title: 'Shaped by sun, wind and monsoon rain',
      description:
        'Orientation, shallow floor plates, external solar shading, verandahs and planted courtyards work with Bangladesh’s climate before mechanical cooling takes over.',
    },
    {
      icon: Compass,
      label: '03 · Research-Informed',
      title: 'Grounded in field evidence and site analysis',
      description:
        'Architectural decisions are tested against occupant surveys, microclimate studies and post-occupancy evaluation frameworks so design claims stay honest.',
    },
  ];

  const keyFacts = [
    { value: 30, suffix: '', decimals: 0, label: 'IT/ITES professionals surveyed' },
    { value: 8.59, suffix: ' ac', decimals: 2, label: 'Rangpur Hi-Tech Park thesis site' },
    { value: 18, suffix: '', decimals: 0, label: 'Workplace design attributes defined' },
    { value: 70, suffix: '+', decimals: 0, label: 'International design collaborations' },
  ];

  return (
    <div className="bg-paper text-graphite">
      <SEO
        title="Home"
        description="Amitabh Chondro Roy (Amitabh Roy) is an architect and urban planning professional in Bangladesh, exploring human-centred, climate-responsive architecture and sustainable urban development."
        path="/"
        profilePage
      />

      {/* 1. HERO VIDEO SECTION WITH TYPEWRITER EFFECT */}
      <HeroVideoSection />

      {/* MARQUEE STRIP (Section 10.3 #9) */}
      <MarqueeStrip />

      {/* 2. SELECTED WORK (Section 8.1 #2: Alternating 7/5 and 5/7 12-column layout) */}
      <section id="selected-work" className="brand-section border-b border-stone">
        <div className="brand-container">
          <div className="mb-14 flex flex-col justify-between gap-6 border-b border-stone pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="type-label mb-3 text-forest-deep">Selected Work · 01 — 05</p>
              <h2 className="type-h1 text-graphite">
                Designing for <span className="accent-italic">place</span> and people.
              </h2>
            </div>
            <Link to="/work" className="link-underline text-base">
              Explore all projects &amp; case studies
              <ArrowUpRight size={17} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {featuredProjects.map((project, index) => {
              // Alternating 7/5 and 5/7 column layout on 12-column desktop grid
              const isEven = index % 2 === 0;
              const imageCols = isEven ? 'lg:col-span-7' : 'lg:col-span-5 lg:order-2';
              const textCols = isEven ? 'lg:col-span-5' : 'lg:col-span-7 lg:order-1';

              return (
                <motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
                >
                  <div className={imageCols}>
                    <Link
                      to={`/work?project=${encodeURIComponent(project.slug)}`}
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
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="tag-pill">{project.category}</span>
                      <span className="type-label text-graphite-soft">
                        {project.year} · {project.location}
                      </span>
                    </div>

                    <h3 className="mt-5 font-serif text-3xl leading-[1.1] text-graphite transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:text-4xl">
                      <Link to={`/work?project=${encodeURIComponent(project.slug)}`}>
                        {project.title}
                      </Link>
                    </h3>

                    {/* Thin Terracotta line that extends under the title on hover (Section 10.3 #5) */}
                    <div className="mt-3 h-px w-12 bg-terracotta transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-32" />

                    <p className="mt-5 max-w-[62ch] text-base leading-[1.65] text-graphite-soft">
                      {project.overview}
                    </p>

                    <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-stone pt-4 sm:grid-cols-4">
                      {project.keyFacts.map((fact) => (
                        <div key={fact.label}>
                          <dt className="type-label text-graphite-soft">{fact.label}</dt>
                          <dd className="mt-1 font-mono text-xs font-medium text-graphite">
                            {fact.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-7">
                      <Link
                        to={`/work?project=${encodeURIComponent(project.slug)}`}
                        className="link-underline text-sm"
                      >
                        View project case study
                        <ArrowRight size={15} strokeWidth={1.5} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Section 10.3 #14: Before/After Interactive Spatial Comparison Slider */}
          <div className="mt-20 border-t border-stone pt-14">
            <div className="max-w-2xl">
              <p className="type-label mb-2 text-forest-deep">Interactive Spatial Study</p>
              <h3 className="type-h2 text-graphite">
                From campus masterplan to <span className="accent-italic">courtyard</span> life.
              </h3>
              <p className="mt-3 text-base text-graphite-soft">
                Compare the overall four-block solar orientation and water retention strategy with
                the human-scale courtyard gathering space at Rangpur Hi-Tech Park.
              </p>
            </div>

            <BeforeAfterSlider
              beforeImage="/research/figures/proposed-masterplan-1536.webp"
              beforeLabel="Proposed Masterplan · 8.59 Acres"
              beforeAlt="Masterplan view of Rangpur Hi-Tech Park showing four blocks around a central courtyard"
              afterImage="/research/figures/courtyard-gathering-space-1536.webp"
              afterLabel="Courtyard Experience · Shaded Uthon"
              afterAlt="Human-level view of the shaded courtyard gathering space and water edge"
              caption="Rangpur Hi-Tech Park · B.Arch Thesis by Amitabh Chondro Roy (2021; rev. 2026)"
            />
          </div>
        </div>
      </section>

      {/* 3. APPROACH SECTION (Section 8.1 #3: 3 principles + number count-up) */}
      <section id="approach" className="brand-section border-b border-stone bg-paper-raised">
        <div className="brand-container">
          <div className="max-w-3xl">
            <p className="type-label mb-3 text-forest-deep">Approach &amp; Principles</p>
            <h2 className="type-h1 text-graphite">
              Warm materials, clear <span className="accent-italic">evidence</span>, quiet form.
            </h2>
            <p className="type-body-lg mt-5 text-graphite-soft">
              Every project begins by asking how sunlight, air movement, landscape and spatial
              proportions shape the daily lives of the people inside.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {principles.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between rounded-card border border-stone bg-paper p-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="type-label text-graphite-soft">{item.label}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-stone text-terracotta">
                      <item.icon size={20} strokeWidth={1.5} />
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-3xl leading-tight text-graphite">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-[1.65] text-graphite-soft">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section 10.3 #10: Number count-up for key facts */}
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-stone pt-12 lg:grid-cols-4">
            {keyFacts.map((stat) => (
              <div key={stat.label} className="border-l border-stone pl-5">
                <p className="font-serif text-4xl text-graphite sm:text-5xl">
                  <AnimatedNumber
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="type-label mt-2 text-graphite-soft">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RESEARCH & PUBLICATIONS + JOURNAL (Section 8.1 #4) */}
      <section id="research-teaser" className="brand-section border-b border-stone">
        <div className="brand-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="type-label mb-3 text-forest-deep">Research &amp; Publications</p>
              <h2 className="type-h1 text-graphite">
                Evidence from the <span className="accent-italic">field</span>.
              </h2>
              <p className="mt-5 max-w-md text-base leading-[1.65] text-graphite-soft">
                Open-access architectural research examining indoor environmental quality, passive
                cooling and occupant wellbeing in Bangladesh’s technology workplaces.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/research" className="btn-primary">
                  Explore research &amp; data
                  <ArrowRight size={16} strokeWidth={1.5} className="btn-arrow" />
                </Link>
                <a
                  href="https://doi.org/10.5281/zenodo.23915357"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Zenodo DOI
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-card border border-stone bg-paper-raised p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tag-pill">B.Arch Thesis · 2021 / Rev. 2026</span>
                  <span className="type-label text-graphite-soft">
                    DOI: 10.5281/zenodo.23915357
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-graphite sm:text-4xl">
                  Designing a Human-Centered Work Environment for the Employees of Rangpur Hi-Tech
                  Park
                </h3>
                <p className="mt-4 text-base leading-[1.65] text-graphite-soft">
                  Based on a structured questionnaire of 30 IT/ITES professionals across nine firms
                  in Bangladesh, this study evaluates six workplace dimensions—revealing that light,
                  ventilation and greenery scored lowest in existing offices (2.93 / 5.00)—and
                  translates user priorities into an 18-attribute architectural design proposal and
                  post-occupancy evaluation protocol.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-stone pt-5">
                  <Link to="/research" className="link-underline text-sm">
                    Interactive survey dashboard
                    <ArrowRight size={15} strokeWidth={1.5} />
                  </Link>
                  <a
                    href="https://orcid.org/0009-0004-6847-0225"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm"
                  >
                    ORCID Profile
                    <ArrowUpRight size={15} strokeWidth={1.5} />
                  </a>
                  <a
                    href="https://www.researchgate.net/profile/Amitabh-Chondro-Roy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm"
                  >
                    ResearchGate
                    <ArrowUpRight size={15} strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              {/* Recent Journal Essays */}
              {recentPosts.length > 0 && (
                <div className="mt-10">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="type-label text-graphite-soft">Recent Journal Essays</span>
                    <Link to="/blogs" className="link-underline text-xs">
                      All essays <ArrowRight size={13} strokeWidth={1.5} />
                    </Link>
                  </div>
                  <div className="divide-y divide-stone border-y border-stone">
                    {recentPosts.map((post) => (
                      <Link
                        key={post.slug}
                        to={`/blogs/${encodeURIComponent(post.slug)}`}
                        className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:bg-paper-raised/60"
                      >
                        <div>
                          <p className="font-serif text-2xl text-graphite group-hover:text-forest-deep">
                            {post.title}
                          </p>
                          <p className="mt-1 text-sm text-graphite-soft line-clamp-1">
                            {post.subtitle}
                          </p>
                        </div>
                        <span className="type-label shrink-0 text-graphite-soft">
                          {post.readingMinutes} min
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT TEASER (Section 8.1 #5: Portrait, ~60 words, link to About) */}
      <section id="about-teaser" className="brand-section border-b border-stone bg-paper-raised">
        <div className="brand-container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
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

            <div className="lg:col-span-7">
              <p className="type-label mb-3 text-forest-deep">About the Architect</p>
              <h2 className="type-h1 text-graphite">
                Grounded in <span className="accent-italic">climate</span>, guided by people.
              </h2>
              <p className="type-body-lg mt-6 max-w-[65ch] text-graphite">
                I am an architect and urban-planning researcher in Bangladesh exploring how
                daylight, natural ventilation, courtyards and biophilic design improve human
                wellbeing. A Bachelor of Architecture graduate from HSTU and 2026 Open Doors
                Diploma of High Achievement recipient in Urbanism, I work across architectural
                practice, environmental analysis and evidence-based urban research.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/about" className="btn-primary">
                  Read full biography &amp; CV
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

      {/* 6. CONTACT BAND (Section 8.1 #6: Big line + magnetic CTA + email) */}
      <section id="contact-band" className="brand-section">
        <div className="brand-container">
          <div className="rounded-card border border-stone bg-paper-raised p-8 sm:p-14 lg:p-20">
            <p className="type-label mb-4 text-forest-deep">
              Collaborations · Academic Research · Commissions
            </p>
            <h2 className="type-display-xl max-w-4xl text-graphite">
              Let’s talk about your next <span className="accent-italic">project</span>.
            </h2>
            <p className="type-body-lg mt-6 max-w-2xl text-graphite-soft">
              Available for architectural design, climate-responsive workplace studies, urban
              planning research and academic collaborations.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                ref={magnetRef}
                to="/contact"
                onMouseMove={handleMagnetMove}
                onMouseLeave={resetMagnet}
                style={{
                  transform: `translate3d(${magnetOffset.x}px, ${magnetOffset.y}px, 0)`,
                }}
                className="btn-primary"
              >
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
