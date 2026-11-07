import { Code, Search, Globe, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function About() {
  const skills = [
    {
      category: 'Software & CAD / BIM',
      icon: Code,
      items: ['AutoCAD', 'SketchUp', 'Lumion', 'Adobe Creative Suite', 'ArcGIS Pro'],
    },
    {
      category: 'Research & Analysis',
      icon: Search,
      items: ['Spatial & Microclimate Analysis', 'Evidence-Based Design', 'Biophilic Design', 'Post-Occupancy Evaluation'],
    },
    {
      category: 'Languages',
      icon: Globe,
      items: ['Bengali (Native)', 'English (B2)', 'German (A2)'],
    },
  ];

  return (
    <section id="about" className="brand-section border-b border-stone bg-paper text-graphite">
      <div className="brand-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 border-b border-stone pb-10 lg:mb-16"
        >
          <p className="type-label mb-3 text-forest-deep">About the Researcher</p>
          <h2 className="type-h1 max-w-4xl text-graphite">
            Designing with <span className="accent-italic">evidence</span>, climate, and human
            wellbeing in view.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            {/* Section 4: 0px radius on images, 4:5 aspect ratio for portrait */}
            <figure className="overflow-hidden border border-stone bg-paper-raised">
              <img
                src="/amitabh-chondro-roy-architect-portrait.jpg"
                alt="Amitabh Chondro Roy (Amitabh Roy) — Architect and Urban Planning Researcher specializing in human-centered, climate-responsive and sustainable design"
                width={847}
                height={1024}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="type-label flex items-center justify-between border-t border-stone px-4 py-3 text-graphite-soft">
                <span>Amitabh Chondro Roy</span>
                <span>B.Arch · HSTU</span>
              </figcaption>
            </figure>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="max-w-[65ch] space-y-5 text-lg leading-[1.65] text-graphite">
              <p>
                I am an architect and urban-planning researcher working at the intersection of
                human-centred design, climate-responsive architecture, and environmental analysis in
                Bangladesh.
              </p>
              <p className="text-graphite-soft">
                My academic work asks how daylight, natural ventilation, open courtyard space, and
                biophilic environments can improve occupant wellbeing—from the individual workplace
                scale to healthier, more climate-adaptive cities across South Asia.
              </p>
              <p className="text-graphite-soft">
                I hold a Bachelor of Architecture from Hajee Mohammad Danesh Science and Technology
                University (HSTU) and received the 2026 Diploma of High Achievement in Urbanism in
                the Open Doors Master’s Track Programme. I was admitted to the MSc in Urban and
                Regional Planning at Politecnico di Torino for 2026/27, though I could not enroll
                following a visa refusal. I remain actively engaged in architectural practice and
                urban research, and welcome collaborations.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/cv/Amitabh_Chondro_Roy_Academic_CV.pdf"
                download="Amitabh_Chondro_Roy_Academic_CV.pdf"
                className="btn-primary"
              >
                <Download size={16} strokeWidth={1.5} />
                Download CV (PDF)
              </a>
              <Link to="/contact" className="btn-secondary">
                Get in touch
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </div>

            <div className="mt-12 space-y-4 border-t border-stone pt-10">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-card border border-stone bg-paper-raised p-5"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-stone text-forest">
                      <skillGroup.icon size={17} strokeWidth={1.5} />
                    </span>
                    <h3 className="font-serif text-2xl text-graphite">{skillGroup.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item) => (
                      <span key={item} className="tag-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
