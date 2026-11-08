import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Calendar, Check, Copy, ExternalLink, FileText, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ResearchDashboard from '../components/research/ResearchDashboard';

const CITATION_TEXT =
  'Roy, A. C. (2021; rev. 2026). Designing a Human-Centered Work Environment for the Employees of Rangpur Hi-Tech Park. Bachelor of Architecture Thesis, Hajee Mohammad Danesh Science and Technology University (HSTU). https://doi.org/10.5281/zenodo.23915357';

export default function ResearchPage() {
  const [copiedCitation, setCopiedCitation] = useState(false);

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(CITATION_TEXT);
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 2600);
    } catch {
      setCopiedCitation(false);
    }
  };

  const featuredResearch = {
    title: 'Designing a Human-Centered Work Environment for the Employees of Rangpur Hi-Tech Park',
    description:
      'A B.Arch thesis project and empirical study exploring the intersection of human-centered design principles, indoor environmental quality (IEQ), and climate-responsive workplace architecture in Bangladesh’s growing technology sector.',
    year: '2021 · Rev. 2026',
    location: 'Rangpur, Bangladesh',
    status: 'Published · Open Access',
    image: '/research-rangpur-hitech-park-conceptual-visual.jpg',
    tags: ['Human-Centered Design', 'Sustainable Architecture', 'Workplace Design', 'Urban Planning'],
    highlights: [
      'Conducted a structured field survey with 30 IT / ITES professionals to evaluate workplace comfort',
      'Developed climate-responsive passive design strategies for composite sub-tropical conditions',
      'Integrated biophilic micro-courtyards and greenery to support psychological restoration',
      'Formulated an 18 Design Attributes Framework translating occupant data into spatial criteria',
      'Achieved a +30.4% projected improvement in mean IEQ and +21.9% perceived productivity uplift',
    ],
  };

  const researchAreas = [
    {
      number: '01',
      title: 'Human-Centered Design',
      description:
        'Exploring how spatial configuration, daylight, and acoustics respond to human psychological, social, and physiological needs in everyday work settings.',
    },
    {
      number: '02',
      title: 'Climate-Responsive Architecture',
      description:
        'Investigating solar orientation, thermal mass, shaded courtyards, and passive cross-ventilation strategies for South Asian sub-tropical climates.',
    },
    {
      number: '03',
      title: 'Sustainable Urban Development',
      description:
        'Researching urban heat island mitigation, green infrastructure, and GIS-informed spatial planning in rapidly urbanizing Bangladeshi cities.',
    },
    {
      number: '04',
      title: 'Workplace Well-Being & IEQ',
      description:
        'Examining the empirical relationship between indoor environmental quality, ergonomic comfort, and occupant health and concentration.',
    },
  ];

  const researchSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      '@id': 'https://amitabhroy.bd/research#thesis',
      headline:
        'Designing a Human-Centered Work Environment for the Employees of Rangpur Hi-Tech Park',
      name: 'Designing a Human-Centered Work Environment for the Employees of Rangpur Hi-Tech Park',
      description:
        'Empirical B.Arch thesis study evaluating indoor environmental quality (IEQ), passive cooling, and human-centered workplace architecture for 30 IT/ITES professionals in Bangladesh.',
      datePublished: '2021-12-01',
      dateModified: '2026-11-06',
      inLanguage: 'en-US',
      url: 'https://amitabhroy.bd/research',
      sameAs: 'https://doi.org/10.5281/zenodo.23915357',
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'DOI',
        value: '10.5281/zenodo.23915357',
      },
      image: 'https://amitabhroy.bd/research-rangpur-hitech-park-conceptual-visual.jpg',
      author: {
        '@type': 'Person',
        '@id': 'https://amitabhroy.bd/#person',
        name: 'Amitabh Chondro Roy',
        url: 'https://amitabhroy.bd/',
      },
      publisher: {
        '@type': 'CollegeOrUniversity',
        name: 'Hajee Mohammad Danesh Science and Technology University (HSTU)',
      },
      about: [
        'Human-Centered Design',
        'Climate-Responsive Architecture',
        'Indoor Environmental Quality',
        'Biophilic Workplace Design',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      '@id': 'https://amitabhroy.bd/research#dataset',
      name: 'Rangpur Hi-Tech Park Employee Workplace Wellbeing & IEQ Survey Dataset (n = 30)',
      description:
        'Structured questionnaire dataset of 30 IT/ITES professionals across 9 firms in Bangladesh measuring 6 workplace environmental dimensions (baseline mean IEQ 3.12/5.00 vs. proposed 4.07/5.00, +30.4% improvement).',
      url: 'https://amitabhroy.bd/research#field-evidence',
      sameAs: 'https://doi.org/10.5281/zenodo.23915357',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      isAccessibleForFree: true,
      creator: {
        '@type': 'Person',
        '@id': 'https://amitabhroy.bd/#person',
        name: 'Amitabh Chondro Roy',
      },
      spatialCoverage: {
        '@type': 'Place',
        name: 'Rangpur, Bangladesh',
      },
      variableMeasured: [
        'Indoor Environmental Quality (IEQ)',
        'Daylight & Natural Ventilation Satisfaction',
        'Thermal Comfort',
        'Ergonomic Comfort',
        'Perceived Productivity Impact',
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Workplace Wellbeing & Climate-Responsive Design Research"
        path="/research"
        image="/research-rangpur-hitech-park-conceptual-visual.jpg"
        imageAlt="Conceptual visualization of a shaded, landscaped technology campus courtyard at Rangpur Hi-Tech Park"
        description="Research in human-centered, climate-responsive and sustainable architecture, including a 30-respondent workplace well-being study at Rangpur Hi-Tech Park and its design outcomes."
        keywords="architectural research, human-centered design, sustainable architecture, workplace design, indoor environmental quality, Rangpur Hi-Tech Park, Bangladesh architecture"
        jsonLd={researchSchemas}
      />

      <div className="min-h-screen bg-paper text-graphite pt-20">
        <div className="brand-container brand-section">
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-14 max-w-4xl border-b border-stone pb-12"
          >
            <p className="type-meta text-forest-deep mb-3">
              02 / Research &amp; Publications
            </p>
            <h1 className="type-h1 text-graphite">
              Evidence-based design for <span className="accent-italic">climate</span> and human wellbeing.
            </h1>
            <p className="mt-5 type-body-lg text-graphite-soft max-w-2xl">
              Field studies on how workplaces shape thermal comfort, focus, and health—and how empirical occupant findings become measurable architectural criteria.
            </p>

            {/* Primary Thesis Publication Card with Copy Citation */}
            <div className="mt-8 bg-paper-raised border border-stone rounded-card p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="type-meta text-terracotta-deep">
                  B.Arch Thesis · HSTU · 2021 (Rev. 2026)
                </span>
                <span className="tag-pill">DOI: 10.5281/zenodo.23915357</span>
              </div>
              <h2 className="type-h3 text-graphite mb-3">
                {featuredResearch.title}
              </h2>
              <p className="type-body text-graphite-soft mb-5">
                {featuredResearch.description}
              </p>

              <div className="bg-paper border border-stone rounded-card p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="type-meta text-graphite-soft flex items-center gap-1.5">
                    <FileText size={13} className="text-forest-deep" aria-hidden="true" />
                    Recommended Citation
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCitation}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-forest-deep hover:text-graphite transition-colors"
                  >
                    {copiedCitation ? (
                      <>
                        <Check size={13} className="text-forest-deep" aria-hidden="true" />
                        Citation copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} aria-hidden="true" />
                        Copy citation
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono text-xs text-graphite-soft leading-relaxed select-all">
                  {CITATION_TEXT}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#field-evidence"
                  className="btn-primary text-sm"
                >
                  Explore survey data
                  <ArrowDown size={15} aria-hidden="true" />
                </a>
                <a
                  href="https://doi.org/10.5281/zenodo.23915357"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  Read on Zenodo (DOI)
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyCitation}
                  className="btn-secondary text-sm"
                >
                  {copiedCitation ? (
                    <>
                      <Check size={14} aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} aria-hidden="true" />
                      Copy citation
                    </>
                  )}
                </button>
                <a
                  href="https://orcid.org/0009-0004-6847-0225"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  ORCID
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a
                  href="https://www.researchgate.net/profile/Amitabh-Chondro-Roy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  ResearchGate
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.header>

          <ResearchDashboard />

          {/* Project context */}
          <motion.section
            id="project-context"
            aria-labelledby="project-context-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55 }}
            className="mt-20 scroll-mt-24 pt-16 border-t border-stone"
          >
            <div className="mb-10">
              <p className="type-meta text-forest-deep">
                Thesis Project Context
              </p>
              <h2
                id="project-context-heading"
                className="mt-2 type-h2 text-graphite"
              >
                Translating survey evidence into a <span className="accent-italic">campus</span> masterplan.
              </h2>
              <p className="mt-3 max-w-2xl type-body text-graphite-soft">
                The empirical survey sits inside a full architectural design investigation: translating occupant priorities into a climate-responsive workplace campus for Rangpur.
              </p>
            </div>

            <div className="bg-paper-raised rounded-card border border-stone overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <figure className="relative min-h-[300px] overflow-hidden bg-stone/20 lg:col-span-6 lg:min-h-full">
                  <img
                    src="/research-rangpur-hitech-park-conceptual-visual.jpg"
                    alt="Conceptual visualization of a shaded, landscaped technology campus courtyard with connected academic and workplace spaces"
                    width={1280}
                    height={853}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="border-t border-stone bg-paper-raised px-5 py-3 type-caption text-graphite-soft">
                    Conceptual visualization illustrating the project’s biophilic courtyard and climate-responsive envelope direction.
                  </figcaption>
                </figure>

                <div className="p-6 sm:p-10 lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 mb-4 type-meta text-graphite-soft">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={14} className="text-forest-deep" aria-hidden="true" />
                        {featuredResearch.year}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} className="text-forest-deep" aria-hidden="true" />
                        {featuredResearch.location}
                      </span>
                    </div>

                    <h3 className="type-h3 text-graphite mb-3">{featuredResearch.title}</h3>
                    <p className="type-body text-graphite-soft mb-6">{featuredResearch.description}</p>

                    <div className="mb-6">
                      <h4 className="type-meta text-graphite mb-3">Key Research &amp; Design Highlights</h4>
                      <ul className="space-y-2.5">
                        {featuredResearch.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2.5 type-body text-graphite-soft text-sm">
                            <span className="text-forest-deep font-mono mt-0.5" aria-hidden="true">
                              →
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {featuredResearch.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/work/rangpur-hi-tech-park"
                      className="link-underline font-medium text-sm text-forest-deep"
                    >
                      View architectural case study →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Research Areas */}
          <motion.section
            aria-labelledby="research-areas-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
            className="mt-20 pt-16 border-t border-stone"
          >
            <div className="mb-10">
              <p className="type-meta text-forest-deep mb-2">Lines of Inquiry</p>
              <h2 id="research-areas-heading" className="type-h2 text-graphite">
                Core research themes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  className="bg-paper-raised rounded-card p-6 sm:p-8 border border-stone hover:border-forest transition-colors"
                >
                  <p className="type-meta text-terracotta-deep mb-3">
                    {area.number} / Theme
                  </p>
                  <h3 className="type-h3 text-graphite mb-3">{area.title}</h3>
                  <p className="type-body text-graphite-soft">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="mt-20 bg-paper-raised rounded-card p-8 sm:p-12 border border-stone flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="max-w-2xl">
              <p className="type-meta text-forest-deep mb-2">Academic &amp; Studio Collaboration</p>
              <h2 className="type-h3 text-graphite mb-2">Interested in research collaboration?</h2>
              <p className="type-body text-graphite-soft">
                I welcome research partnerships, graduate supervision inquiries, and opportunities to contribute to projects exploring climate-responsive and evidence-based spatial design.
              </p>
            </div>
            <Link to="/contact" className="btn-primary shrink-0">
              Get in touch
            </Link>
          </motion.section>
        </div>
      </div>
    </>
  );
}
