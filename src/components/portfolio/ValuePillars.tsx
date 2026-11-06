import { Heart, Wind, Users, Briefcase, Award, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ValuePillars() {
  const pillars = [
    {
      icon: Heart,
      title: 'Human-Centered & Biophilic',
      description: 'Integrating nature, daylight, and user well-being into every design decision.',
      color: '#22C55E',
    },
    {
      icon: Wind,
      title: 'Climate-Responsive Strategies',
      description: 'Passive cooling, natural ventilation, and data-informed environmental design.',
      color: '#0EA5E9',
    },
    {
      icon: Users,
      title: 'Community & Public Realm',
      description: 'Creating spaces that foster social connection, cultural identity, and urban resilience.',
      color: '#F97316',
    },
  ];

  const experiences = [
    {
      role: 'Architect',
      company: 'Abode Engineers',
      location: 'Bogra, Bangladesh',
      period: '2022–Present',
      type: 'work',
    },
    {
      role: 'Brand Identity Designer',
      company: 'Fiverr',
      location: '70+ clients, 5-star rating',
      period: '2022–2024',
      type: 'work',
    },
    {
      role: 'Intern Architect',
      company: 'Sthapotik',
      location: 'Dhaka',
      period: '2019',
      type: 'work',
    },
  ];

  const certifications = [
    {
      title: 'Sustainable Construction Management (CMAN-4) · University of Maryland via edX',
      year: '2026',
    },
    {
      title: 'Wellness and Sustainability in Architectural Design · LinkedIn Learning',
      year: '2025',
    },
    {
      title: 'Climate Change: A Top ESG Concern · LinkedIn Learning',
      year: '2025',
    },
    {
      title: 'ArcGIS Pro Essential Training · LinkedIn Learning',
      year: '2023',
    },
    {
      title: 'Future Cities (FC-01x) · ETH Zurich via edX',
      year: '2020',
    },
    {
      title: 'Google IT Support · Coursera',
      year: '2020',
    },
  ];

  return (
    <section id="value-pillars" className="py-24 bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 border-y border-gray-800 py-7">
          <p className="mb-5 text-center text-sm font-semibold text-[#22C55E]">Recent academic milestones · 2026</p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <Award className="mt-1 shrink-0 text-[#22C55E]" size={20} />
              <div><p className="font-semibold text-[#F9FAFB]">Diploma of High Achievement in Urbanism</p><p className="mt-1 text-sm text-[#9CA3AF]">Open Doors Master’s Track Programme · 2026</p></div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-1 shrink-0 text-[#0EA5E9]" size={20} />
              <div><p className="font-semibold text-[#F9FAFB]">MSc Urban and Regional Planning</p><p className="mt-1 text-sm text-[#9CA3AF]">Admitted · Politecnico di Torino · 2026/27; unable to enroll following visa refusal</p></div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-1 shrink-0 text-[#F97316]" size={20} />
              <div><p className="font-semibold text-[#F9FAFB]">Sustainable Construction Management</p><p className="mt-1 text-sm text-[#9CA3AF]">University of Maryland via edX · CMAN-4</p></div>
            </div>
          </div>
        </div>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Design Philosophy</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group relative bg-[#111827] rounded-2xl p-8 border border-gray-800 hover:border-[#22C55E] transition-all duration-300"
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                style={{
                  backgroundColor: `${pillar.color}20`,
                  borderColor: `${pillar.color}40`,
                  borderWidth: '2px',
                }}
              >
                <pillar.icon
                  size={32}
                  style={{ color: pillar.color }}
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{pillar.title}</h3>
              <p className="text-[#9CA3AF] leading-relaxed">{pillar.description}</p>

              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 blur-[60px] rounded-full transition-opacity duration-300"
                style={{ backgroundColor: pillar.color }}
              ></div>
            </motion.div>
          ))}
        </div>

        <div id="experience" className="mt-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Experience & Learning</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-8">
                <Briefcase className="text-[#22C55E] mr-3" size={28} />
                <h3 className="text-2xl font-bold">Professional Experience</h3>
              </div>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="relative bg-[#111827] rounded-xl p-6 border border-gray-800 hover:border-[#22C55E] transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-semibold">{exp.role}</h4>
                      <span className="text-[#22C55E] text-sm font-medium">{exp.period}</span>
                    </div>
                    <p className="text-[#9CA3AF] font-medium mb-1">{exp.company}</p>
                    <p className="text-sm text-[#9CA3AF]">{exp.location}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-8">
                <GraduationCap className="text-[#0EA5E9] mr-3" size={28} />
                <h3 className="text-2xl font-bold">Certifications</h3>
              </div>
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: -10 }}
                    className="bg-[#111827] rounded-xl p-6 border border-gray-800 hover:border-[#0EA5E9] transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-lg font-medium text-[#F9FAFB] flex-1">{cert.title}</p>
                      <span className="text-[#0EA5E9] text-sm font-semibold ml-4">{cert.year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-xl p-6 border border-[#F97316]/30">
                <div className="flex items-center mb-3">
                  <Award className="text-[#F97316] mr-3" size={24} />
                  <h4 className="text-lg font-bold">Recognition</h4>
                </div>
                <ul className="space-y-2 text-[#9CA3AF]">
                  <li className="flex items-start">
                    <span className="text-[#F97316] mr-2">•</span>
                    <span>ICT Division Freelancer Recognition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F97316] mr-2">•</span>
                    <span>Primary & SSC Scholarships</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F97316] mr-2">•</span>
                    <span>Co-Founder, HSTU Photographic Society</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
