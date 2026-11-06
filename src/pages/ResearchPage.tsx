import { motion } from 'framer-motion';
import { ArrowDown, Calendar, ExternalLink, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import ResearchDashboard from '../components/research/ResearchDashboard';

export default function ResearchPage() {
  const featuredResearch = {
    title: 'Human-Centered Work Environment for Rangpur Hi-Tech Park',
    description:
      'A thesis project exploring the intersection of human-centered design principles and sustainable workplace architecture in the context of Bangladesh\'s growing tech sector.',
    year: '2024',
    location: 'Rangpur, Bangladesh',
    status: 'Completed',
    image: '/research-rangpur-hitech-park-conceptual-visual.jpg',
    tags: ['Human-Centered Design', 'Sustainable Architecture', 'Workplace Design', 'Urban Planning'],
    highlights: [
      'Conducted extensive user research with tech professionals to understand workplace needs',
      'Developed climate-responsive design strategies for tropical conditions',
      'Integrated biophilic design principles to enhance worker well-being',
      'Proposed sustainable building systems and green infrastructure',
      'Created spatial configurations that promote collaboration and focus',
    ],
  };

  const researchAreas = [
    {
      title: 'Human-Centered Design',
      description:
        'Exploring how architecture can respond to human psychological, social, and physiological needs.',
      icon: '👥',
    },
    {
      title: 'Climate-Responsive Architecture',
      description: 'Investigating passive design strategies for tropical and subtropical climates.',
      icon: '🌤️',
    },
    {
      title: 'Sustainable Urban Development',
      description: 'Researching sustainable urbanization patterns in rapidly growing cities.',
      icon: '🏙️',
    },
    {
      title: 'Workplace Well-Being',
      description: 'Examining the relationship between workspace design and occupant health.',
      icon: '💼',
    },
  ];

  return (
    <>
      <SEO
        title="Research | Amitabh Chondro Roy"
        path="/research"
        description="Research in human-centered, climate-responsive and sustainable architecture, including a 30-respondent workplace well-being study at Rangpur Hi-Tech Park and its design outcomes."
        keywords="architectural research, human-centered design, sustainable architecture, workplace design, indoor environmental quality, Rangpur Hi-Tech Park, Bangladesh architecture"
      />

      <div className="min-h-screen bg-[#040816] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#22C55E]">
              Evidence-based design
            </p>
            <h1 className="mt-3 text-4xl font-bold text-[#F9FAFB] sm:text-5xl">Research</h1>
            <p className="mt-5 text-lg leading-relaxed text-[#9CA3AF] sm:text-xl">
              Field studies on how workplaces shape comfort, focus and well-being — and how those
              findings become architectural criteria.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#field-evidence"
                className="inline-flex items-center gap-2 rounded-lg bg-[#22C55E] px-5 py-2.5 text-sm font-semibold text-[#040816] transition-colors hover:bg-[#16A34A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E]"
              >
                Explore the survey data
                <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a
                href="#project-context"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-5 py-2.5 text-sm font-medium text-[#C9D2DE] transition-colors hover:border-[#22C55E] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E]"
              >
                Project context
              </a>
            </div>
          </motion.header>

          <ResearchDashboard />

          {/* Project context */}
          <motion.section
            id="project-context"
            aria-labelledby="project-context-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="mt-20 scroll-mt-24"
          >
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#22C55E]">
                Thesis project
              </p>
              <h2
                id="project-context-heading"
                className="mt-3 text-3xl font-bold text-[#F9FAFB]"
              >
                Project context
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-[#9CA3AF]">
                The survey sits inside a larger design study: translating occupant evidence into a
                climate-responsive workplace campus for Rangpur.
              </p>
            </div>

            <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <figure className="relative min-h-[280px] overflow-hidden bg-gray-900 lg:min-h-full">
                  <img
                    src="/research-rangpur-hitech-park-conceptual-visual.jpg"
                    alt="Conceptual visualization of a shaded, landscaped technology campus courtyard with connected academic and workplace spaces"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-5 pb-5 pt-14 text-sm leading-relaxed text-white/90">
                    Conceptual visualization illustrating the project’s biophilic and climate-responsive
                    design direction.
                  </figcaption>
                </figure>

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-sm text-[#9CA3AF]">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#22C55E]" aria-hidden="true" />
                      <span>{featuredResearch.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#22C55E]" aria-hidden="true" />
                      <span>{featuredResearch.location}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-[#F9FAFB]">{featuredResearch.title}</h3>

                  <p className="text-[#9CA3AF] mb-6 leading-relaxed">{featuredResearch.description}</p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-[#F9FAFB]">Key highlights</h4>
                    <ul className="space-y-2">
                      {featuredResearch.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start text-[#9CA3AF]">
                          <span className="text-[#22C55E] mr-2" aria-hidden="true">
                            →
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredResearch.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#22C55E]/10 text-[#86EFAC] rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#22C55E]/10 text-[#86EFAC] rounded-lg text-sm font-medium">
                    <span className="w-2 h-2 bg-[#22C55E] rounded-full" aria-hidden="true" />
                    {featuredResearch.status}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Research Areas */}
          <motion.section
            aria-labelledby="research-areas-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <h2 id="research-areas-heading" className="text-3xl font-bold mb-8 text-[#F9FAFB]">
              Research areas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="bg-[#111827] rounded-xl p-6 border border-gray-800 hover:border-[#22C55E] transition-all"
                >
                  <div className="text-4xl mb-4" aria-hidden="true">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#F9FAFB]">{area.title}</h3>
                  <p className="text-[#9CA3AF] leading-relaxed">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-xl p-8 border border-[#22C55E]/30"
          >
            <h2 className="text-2xl font-bold mb-4 text-[#F9FAFB]">Interested in collaboration?</h2>
            <p className="text-[#9CA3AF] mb-6 max-w-2xl mx-auto">
              I'm open to research partnerships, academic collaborations, and opportunities to contribute
              to projects exploring human-centered and sustainable design.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#22C55E] text-[#040816] rounded-lg font-semibold hover:bg-[#22C55E]/90 transition-all hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E]"
            >
              Get in touch
              <ExternalLink size={20} aria-hidden="true" />
            </a>
          </motion.section>
        </div>
      </div>
    </>
  );
}
