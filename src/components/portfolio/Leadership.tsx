import { useState, useEffect } from 'react';
import { Building2, MapPin, Globe, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Leadership() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null);
      }
    };

    if (selectedEvent !== null) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent]);

  const events = [
    {
      icon: Building2,
      title: 'University Exhibition Coordinator',
      role: 'Presented with Vice-Chancellor',
      year: '2019',
      audience: '150+ visitors',
      image: '/university-exhibition-coordinator-vice-chancellor.jpg',
      description: 'Coordinated a major university exhibition showcasing student architectural projects to over 150 visitors. Managed all aspects from space planning to presentation setup, working closely with faculty and students. Had the honor of presenting key projects alongside the Vice-Chancellor, highlighting the innovative work of the architecture department and its impact on the community.',
    },
    {
      icon: MapPin,
      title: '15-Day Heritage Study Tour',
      role: 'Coordinator — 30 Architecture Students',
      year: '2019',
      audience: 'Logistics & Finance',
      image: '/heritage-study-tour-15-day-coordinator.jpg',
      description: 'Successfully coordinated a comprehensive 15-day heritage study tour for 30 architecture students. Managed all logistics including transportation, accommodation, site visits, and financial planning. The tour covered significant historical and architectural landmarks, providing students with hands-on learning experiences and exposure to diverse architectural styles and conservation practices.',
    },
    {
      icon: Globe,
      title: 'International Cultural Exchange',
      role: 'Hosting Nepali & Bhutanese Peers',
      year: '2019',
      audience: 'International',
      image: '/international-cultural-exchange-nepal-bhutan.jpg',
      description: 'Organized and facilitated a cultural exchange program hosting architecture students from Nepal and Bhutan. Coordinated campus tours, arranged academic sessions, and organized cultural activities to promote cross-border understanding and collaboration. The program fostered lasting friendships and professional networks while showcasing our institution\'s commitment to international engagement.',
    },
  ];

  const stats = [
    { label: '6 Events Delivered', value: '6' },
    { label: '2,500+ Visitors Hosted', value: '2,500+' },
    { label: '80% Sponsorship Raised', value: '80%' },
    { label: '4 Guest Lectures Organized', value: '4' },
  ];

  return (
    <section id="leadership" className="py-24 bg-[#040816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Leadership & Community Impact</h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Coordinating events, facilitating exchanges, and building connections that matter.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#111827]/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-[#22C55E] transition-all duration-300"
            >
              <div className="text-3xl font-bold text-[#22C55E] mb-2">{stat.value}</div>
              <div className="text-sm text-[#9CA3AF]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedEvent(index)}
                className="group relative bg-[#111827]/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-[#22C55E] transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={event.image}
                    alt={`${event.title} - Amitabh Chondro Roy demonstrating leadership in architecture community engagement and cultural exchange programs`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#22C55E]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[#22C55E] text-sm font-semibold">{event.year}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-[#22C55E] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm mb-3">{event.role}</p>
                  <span className="inline-block px-3 py-1 bg-[#1F2937] text-[#9CA3AF] text-xs uppercase tracking-wide rounded-full border border-gray-700">
                    {event.audience}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#22C55E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-[#111827] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#22C55E] relative"
              onClick={(e) => e.stopPropagation()}
            >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-[#1F2937] hover:bg-[#22C55E] rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] overflow-hidden rounded-t-2xl">
              <img
                src={events[selectedEvent].image}
                alt={events[selectedEvent].title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#22C55E]/10 rounded-lg flex items-center justify-center">
                  {(() => {
                    const Icon = events[selectedEvent].icon;
                    return <Icon className="w-6 h-6 text-[#22C55E]" />;
                  })()}
                </div>
                <span className="text-[#22C55E] text-sm font-semibold">
                  {events[selectedEvent].year}
                </span>
              </div>

              <h2 className="text-3xl font-bold mb-4">
                {events[selectedEvent].title}
              </h2>

              <p className="text-[#0EA5E9] text-lg font-semibold mb-2">
                {events[selectedEvent].role}
              </p>

              <span className="inline-block px-3 py-1 bg-[#1F2937] text-[#9CA3AF] text-xs uppercase tracking-wide rounded-full border border-gray-700 mb-6">
                {events[selectedEvent].audience}
              </span>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-xl font-semibold mb-4 text-[#22C55E]">Event Details</h3>
                <p className="text-[#9CA3AF] leading-relaxed text-lg">
                  {events[selectedEvent].description}
                </p>
              </div>
            </div>
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
