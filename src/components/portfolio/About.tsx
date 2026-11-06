import { Code, Search, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const skills = [
    {
      category: 'Software',
      icon: Code,
      items: ['AutoCAD', 'SketchUp', 'Lumion', 'Adobe Suite', 'ArcGIS Pro'],
    },
    {
      category: 'Research',
      icon: Search,
      items: ['Spatial Analysis', 'Data Visualization', 'Biophilic Design'],
    },
    {
      category: 'Languages',
      icon: Globe,
      items: ['Bengali (Native)', 'English (B2)', 'German (A2)'],
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-left lg:mb-16"
        >
          <p className="mb-3 text-sm font-semibold text-[#22C55E]">About the researcher</p>
          <h2 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Designing with evidence, climate, and human wellbeing in view.</h2>
          <div className="mt-5 h-1 w-24 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9]"></div>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto max-w-md lg:mx-0"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#22C55E]/20 shadow-2xl">
              <img
                src="/amitabh-chondro-roy-architect-portrait.png"
                alt="Amitabh Chondro Roy - Architect specializing in human-centered, climate-responsive and sustainable design"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#0EA5E9]/20 blur-[80px] rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="prose prose-invert max-w-none mb-8">
              <p className="mb-4 text-lg leading-relaxed text-[#F9FAFB]">
                I am an architect and emerging urban-planning researcher working at the intersection of human-centred design, climate-responsive architecture, and environmental analysis.
              </p>
              <p className="mb-4 text-lg leading-relaxed text-[#F9FAFB]">
                My academic work asks how daylight, natural ventilation, open space, and biophilic environments can improve wellbeing—from the building scale to healthier, more climate-adaptive cities in South Asian contexts.
              </p>
              <p className="text-lg leading-relaxed text-[#F9FAFB]">
                I was admitted to the MSc in Urban and Regional Planning at Politecnico di Torino for 2026/27, but could not enroll following a visa refusal. I remain focused on urban-planning research and welcome collaborations in sustainable architecture, urban design, and evidence-based spatial practice.
              </p>
            </div>

            <div className="space-y-4">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#111827] rounded-xl p-4 border border-gray-800"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center mr-3">
                      <skillGroup.icon size={20} className="text-[#22C55E]" />
                    </div>
                    <h3 className="text-lg font-semibold">{skillGroup.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="px-3 py-1.5 bg-[#1F2937] text-[#9CA3AF] text-sm rounded-lg border border-gray-700"
                      >
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
