import { Briefcase, Award, GraduationCap } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: 'Architect',
      company: 'Abode Engineers',
      location: 'Bogra, Bangladesh',
      period: '2022–Present',
    },
    {
      role: 'Brand Identity Designer',
      company: 'Fiverr',
      location: '70+ international clients · 5.0 rating',
      period: '2022–2024',
    },
    {
      role: 'Intern Architect',
      company: 'Sthapotik',
      location: 'Dhaka, Bangladesh',
      period: '2019',
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
      title: 'Google IT Support Professional Certificate · Coursera',
      year: '2020',
    },
  ];

  return (
    <section id="experience" className="brand-section border-b border-stone bg-paper text-graphite">
      <div className="brand-container">
        <div className="mb-14 border-b border-stone pb-8">
          <p className="type-label mb-3 text-forest-deep">Practice &amp; Continuing Education</p>
          <h2 className="type-h2 text-graphite">
            Professional experience &amp; <span className="accent-italic">certifications</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-6 flex items-center gap-3">
              <Briefcase className="text-forest" size={20} strokeWidth={1.5} />
              <h3 className="font-serif text-3xl text-graphite">Professional Experience</h3>
            </div>
            <div className="divide-y divide-stone border-y border-stone">
              {experiences.map((exp) => (
                <div key={exp.role + exp.company} className="py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-serif text-2xl text-graphite">{exp.role}</h4>
                    <span className="type-label text-forest-deep">{exp.period}</span>
                  </div>
                  <p className="mt-1 font-sans text-sm font-medium text-graphite">{exp.company}</p>
                  <p className="mt-0.5 text-sm text-graphite-soft">{exp.location}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-card border border-stone bg-paper-raised p-6">
              <div className="mb-3 flex items-center gap-2.5">
                <Award className="text-terracotta" size={18} strokeWidth={1.5} />
                <h4 className="font-serif text-2xl text-graphite">Honours &amp; Leadership</h4>
              </div>
              <ul className="space-y-2 text-sm text-graphite-soft">
                <li>• Diploma of High Achievement in Urbanism · Open Doors (2026)</li>
                <li>• ICT Division Freelancer Recognition, Bangladesh</li>
                <li>• Co-Founder, HSTU Photographic Society</li>
                <li>• Primary &amp; Secondary Board Merit Scholarships</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <GraduationCap className="text-forest" size={20} strokeWidth={1.5} />
              <h3 className="font-serif text-3xl text-graphite">Courses &amp; Certifications</h3>
            </div>
            <div className="divide-y divide-stone border-y border-stone">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="flex items-baseline justify-between gap-6 py-5"
                >
                  <p className="text-base text-graphite">{cert.title}</p>
                  <span className="type-label shrink-0 text-graphite-soft">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
