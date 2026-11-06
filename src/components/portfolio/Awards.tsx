import { Trophy, Award, Medal } from 'lucide-react';

export default function Awards() {
  const awards = [
    {
      icon: Trophy,
      title: 'ICT Minister Freelancer Award',
      description:
        'Recognized as leading freelancer in Dinajpur; received laptop from ICT Ministry for client delivery excellence.',
      image: '/ict-minister-freelancer-award-dinajpur.jpg',
      color: 'from-[#22C55E]',
    },
    {
      icon: Award,
      title: 'Communication Skills Award',
      description:
        'Recognized for standout participation in professional communication workshop—public speaking, active listening, facilitation.',
      image: '/communication-skills-award-certificate.jpg',
      color: 'from-[#0EA5E9]',
    },
    {
      icon: Medal,
      title: 'Architecture Cricket League — Runners-up',
      description:
        'Vice-captain; led team strategy and morale; demonstrated coordination under pressure.',
      image: '/architecture-cricket-league-runners-up.jpg',
      color: 'from-[#22C55E]',
    },
  ];

  return (
    <section id="awards" className="py-24 bg-gradient-to-b from-[#0B1120] to-[#040816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Awards & Recognition</h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Honored for excellence in design, communication, and leadership.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => {
            const Icon = award.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#111827]/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-[#22C55E] transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={award.image}
                    alt={`${award.title} - Amitabh Chondro Roy receiving recognition for excellence in architecture and digital marketing`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${award.color} to-transparent rounded-xl flex items-center justify-center`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[#22C55E] transition-colors">
                    {award.title}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">
                    {award.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#22C55E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
