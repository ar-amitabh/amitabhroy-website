import { useState, useEffect } from 'react';
import { Heart, CloudRain, Moon, Award, ExternalLink, X } from 'lucide-react';

export default function Volunteering() {
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedActivity(null);
        setSelectedCert(null);
      }
    };

    if (selectedActivity !== null || selectedCert !== null) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedActivity, selectedCert]);

  const activities = [
    {
      icon: CloudRain,
      title: 'Flood Relief Volunteer',
      organization: 'Repair Bangladesh',
      description:
        'Coordinated distribution of essentials for flood-affected families in Dinajpur; field logistics and on-ground handover.',
      image: '/flood-relief-volunteer-repair-bangladesh.jpg',
      fullDescription: 'Led critical flood relief operations with Repair Bangladesh in Dinajpur district during severe flooding. Coordinated the distribution of essential supplies including food, clean water, and medical necessities to hundreds of affected families. Managed field logistics, organized volunteer teams, and ensured effective on-ground handover of relief materials. Worked directly with community leaders to identify the most vulnerable households and establish distribution points in accessible locations, making a tangible impact during a crisis.',
    },
    {
      icon: Heart,
      title: 'Winter Relief Coordinator',
      organization: 'Thakurgaon',
      description:
        'Door-to-door campaigns collecting surplus clothing; sorting, packaging, and distribution to underprivileged communities.',
      image: '/winter-relief-coordinator-thakurgaon.jpg',
      fullDescription: 'Organized and led comprehensive winter relief campaigns in Thakurgaon to support underprivileged communities during harsh winter conditions. Coordinated door-to-door collection drives to gather surplus warm clothing from households. Established efficient systems for sorting, quality checking, and packaging collected items. Led distribution efforts ensuring warm clothing reached those most in need, including homeless individuals and low-income families. The initiative demonstrated the power of community mobilization and grassroots action in addressing seasonal hardships.',
    },
    {
      icon: Moon,
      title: 'Lunar Eclipse Facilitation (2008)',
      organization: 'Community Education',
      description:
        'Supported public viewing and explanation during total lunar eclipse; encouraged science literacy among students.',
      image: '/lunar-eclipse-facilitation-community-education.jpg',
      fullDescription: 'Facilitated a public science education event during the total lunar eclipse of 2008, making astronomy accessible to the local community. Set up viewing stations with telescopes and binoculars, providing real-time explanations of the celestial phenomenon to curious students and community members. Prepared educational materials explaining the science behind lunar eclipses in simple terms. The event sparked interest in astronomy among young students and demonstrated the importance of making science education engaging and accessible to all.',
    },
  ];

  const certifications = [
    {
      name: 'Google Digital Marketing & E-commerce Professional Certificate',
      organization: 'Google / Coursera',
      verificationLink: 'https://coursera.org/verify/professional-cert/example123',
      date: '2024',
      description: 'Comprehensive professional certification covering digital marketing fundamentals, e-commerce strategies, email marketing, analytics, and customer engagement. Learned to develop data-driven marketing strategies, optimize online stores, and measure campaign effectiveness using industry-standard tools and platforms.',
      skills: ['SEO & SEM', 'Google Analytics', 'Social Media Marketing', 'E-commerce Strategy', 'Email Marketing', 'Customer Analytics'],
    },
    {
      name: 'Sustainable Architecture Certification',
      organization: 'LEED Green Building Council',
      verificationLink: 'https://leed.example.com/verify/example456',
      date: '2023',
      description: 'Advanced certification in sustainable and green building practices. Covers energy efficiency, sustainable site development, water conservation, materials selection, and indoor environmental quality. Demonstrates expertise in designing and managing environmentally responsible buildings.',
      skills: ['LEED Standards', 'Energy Modeling', 'Sustainable Materials', 'Water Efficiency', 'Green Building Design', 'Environmental Impact Assessment'],
    },
    {
      name: 'Project Management Professional',
      organization: 'Project Management Institute',
      verificationLink: 'https://pmi.org/verify/example789',
      date: '2023',
      description: 'Globally recognized certification demonstrating expertise in project management methodologies, leadership, and business acumen. Covers project initiation, planning, execution, monitoring, and closure. Validates ability to lead project teams and deliver successful outcomes.',
      skills: ['Project Planning', 'Risk Management', 'Stakeholder Engagement', 'Budget Management', 'Agile Methodologies', 'Team Leadership'],
    },
  ];

  return (
    <section id="volunteering" className="py-24 bg-[#040816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Community & Volunteering</h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Giving back through direct action and community support initiatives.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                onClick={() => setSelectedActivity(index)}
                className="group relative bg-[#111827]/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-[#0EA5E9] transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={activity.image}
                    alt={`${activity.title} - Amitabh Chondro Roy participating in community volunteering and social impact initiatives`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#0EA5E9]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#0EA5E9] transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-[#22C55E] text-sm font-semibold mb-3">
                    {activity.organization}
                  </p>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    {activity.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0EA5E9]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Certifications</h2>
            <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
              Professional certifications and credentials showcasing continuous learning and expertise.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                onClick={() => setSelectedCert(index)}
                className="group bg-[#111827]/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-[#22C55E] transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#22C55E]" />
                  </div>
                  <span className="text-xs text-[#9CA3AF] bg-[#1F2937] px-3 py-1 rounded-full">
                    {cert.date}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#F9FAFB] leading-tight">
                  {cert.name}
                </h3>
                <p className="text-[#0EA5E9] text-sm font-semibold mb-4">
                  {cert.organization}
                </p>
                <span className="inline-flex items-center text-sm text-[#22C55E] hover:text-[#22C55E]/80 transition-colors">
                  View Details
                  <ExternalLink className="ml-1" size={14} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedActivity !== null && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="bg-[#111827] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#0EA5E9] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedActivity(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-[#1F2937] hover:bg-[#0EA5E9] rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] overflow-hidden rounded-t-2xl">
              <img
                src={activities[selectedActivity].image}
                alt={activities[selectedActivity].title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center">
                  {(() => {
                    const Icon = activities[selectedActivity].icon;
                    return <Icon className="w-6 h-6 text-[#0EA5E9]" />;
                  })()}
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-4">
                {activities[selectedActivity].title}
              </h2>

              <p className="text-[#22C55E] text-lg font-semibold mb-6">
                {activities[selectedActivity].organization}
              </p>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-xl font-semibold mb-4 text-[#0EA5E9]">Activity Details</h3>
                <p className="text-[#9CA3AF] leading-relaxed text-lg">
                  {activities[selectedActivity].fullDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCert !== null && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-[#111827] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#22C55E] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-[#1F2937] hover:bg-[#22C55E] rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-[#22C55E]" />
                </div>
                <span className="text-sm text-[#9CA3AF] bg-[#1F2937] px-4 py-2 rounded-full">
                  {certifications[selectedCert].date}
                </span>
              </div>

              <h2 className="text-3xl font-bold mb-4">
                {certifications[selectedCert].name}
              </h2>

              <p className="text-[#0EA5E9] text-lg font-semibold mb-6">
                {certifications[selectedCert].organization}
              </p>

              <div className="border-t border-gray-700 pt-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-[#22C55E]">About This Certification</h3>
                <p className="text-[#9CA3AF] leading-relaxed text-lg mb-6">
                  {certifications[selectedCert].description}
                </p>

                <h3 className="text-xl font-semibold mb-4 text-[#22C55E]">Key Skills</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {certifications[selectedCert].skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#1F2937] text-[#9CA3AF] text-sm rounded-full border border-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={certifications[selectedCert].verificationLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center text-lg font-semibold text-[#22C55E] hover:text-[#22C55E]/80 transition-colors"
              >
                Verify Certificate
                <ExternalLink className="ml-2" size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
