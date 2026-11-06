import { Briefcase, Award, GraduationCap } from 'lucide-react';

export default function Experience() {
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
      title: 'ETH Zurich edX: Future Cities (FC-01x)',
      year: '2020',
    },
    {
      title: 'LinkedIn Learning: Wellness & Sustainability in Architectural Design',
      year: '2023',
    },
    {
      title: 'Oracle: Generative AI Professional Certificate',
      year: '2024',
    },
  ];

  return (
    <section id="experience" className="py-24 bg-[#040816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div
                  key={index}
                  className="relative bg-[#111827] rounded-xl p-6 border border-gray-800 hover:border-[#22C55E] transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold">{exp.role}</h4>
                    <span className="text-[#22C55E] text-sm font-medium">{exp.period}</span>
                  </div>
                  <p className="text-[#9CA3AF] font-medium mb-1">{exp.company}</p>
                  <p className="text-sm text-[#9CA3AF]">{exp.location}</p>
                </div>
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
                <div
                  key={index}
                  className="bg-[#111827] rounded-xl p-6 border border-gray-800 hover:border-[#0EA5E9] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-lg font-medium text-[#F9FAFB] flex-1">{cert.title}</p>
                    <span className="text-[#0EA5E9] text-sm font-semibold ml-4">{cert.year}</span>
                  </div>
                </div>
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
    </section>
  );
}
