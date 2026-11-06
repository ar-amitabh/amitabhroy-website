import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const featuredProject = {
  title: 'Human-Centered Hi-Tech Park, Rangpur',
  tags: ['Workplace', 'Biophilia', 'Thesis'],
  year: '2021',
  image: '/hi-tech-park-rangpur-biophilic-architecture.jpg',
  description: 'A comprehensive thesis project focusing on creating a technology park that prioritizes human needs and integrates biophilic design principles. The design emphasizes natural light, green spaces, and sustainable workplace environments that foster innovation and well-being.',
};

const selectedWork = [
  {
    title: '500-Bed Hospital Design',
    tags: ['Healthcare', 'Healing Spaces', 'Passive Cooling'],
    year: '2020',
    image: '/hospital-design-500-bed-healing-spaces.jpg',
    description: 'A large-scale healthcare facility designed with patient-centered healing spaces. Incorporates passive cooling strategies and natural ventilation to create comfortable, energy-efficient environments that support recovery and wellness.',
  },
  {
    title: 'Sundar Bari Competition',
    tags: ['Competition', 'Climate Housing'],
    year: '2020',
    image: '/sundar-bari-climate-housing-competition.jpg',
    description: 'Competition entry for climate-responsive housing design. The project addresses environmental challenges through innovative architectural solutions that balance traditional living patterns with modern sustainability requirements.',
  },
  {
    title: 'HSTU Residential Complex',
    tags: ['Housing', 'Courtyard Living'],
    year: '2019',
    image: '/hstu-residential-complex-courtyard-living.jpg',
    description: 'A residential complex design that embraces courtyard living principles, creating communal spaces that encourage social interaction while maintaining privacy. The design integrates local architectural traditions with contemporary needs.',
  },
  {
    title: 'SK+F Office Rendering',
    tags: ['Commercial', 'Intern Work', '3D Rendering'],
    year: '2019',
    image: '/skf-office-commercial-3d-rendering.jpg',
    description: 'Professional 3D visualization work completed during internship. The project showcases modern commercial office design with attention to lighting, materials, and spatial quality to create impressive client presentations.',
  },
  {
    title: 'Renewal of Public Realm, Dinajpur',
    tags: ['Urban Design', 'Heritage', 'Placemaking'],
    year: '2018',
    image: '/dinajpur-public-realm-urban-design.jpg',
    description: 'Urban design project focused on revitalizing public spaces in Dinajpur. The design respects heritage values while introducing contemporary placemaking strategies that enhance community engagement and urban vitality.',
  },
];

const clients = [
  'Finance59 LLC',
  'HBCU',
  'Affordable Smart Homes',
  'Stremline Bookeeping',
  'Benjamin Franklin',
  'My Biz Answers',
  'Opulence Radio',
];

const logoImages = [
  '/brand-logo-design-1.jpg',
  '/brand-logo-design-2.jpg',
  '/brand-logo-design-3.jpg',
  '/brand-logo-design-4.jpg',
  '/brand-logo-design-5.jpg',
  '/brand-logo-design-6.jpg',
  '/brand-logo-design-7.jpg',
];

const logos = clients.map((client, i) => ({
  id: i + 1,
  image: logoImages[i],
  client,
}));

type SelectedProject = { title: string; tags: string[]; year: string; image: string; description: string } | null;

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<SelectedProject>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject !== null) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="work" className="py-24 bg-[#040816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Featured Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Work</h1>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Architecture, urban design and research projects.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] mx-auto mt-6"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-xs uppercase tracking-widest text-[#22C55E] font-semibold">Featured Project</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onClick={() => setSelectedProject(featuredProject)}
          className="group mb-20 bg-[#111827] rounded-2xl overflow-hidden border border-[#22C55E]/40 hover:border-[#22C55E] transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-2"
        >
          <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
            <img
              src={featuredProject.image}
              alt={featuredProject.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <span className="text-[#22C55E] text-sm font-semibold mb-3">{featuredProject.year}</span>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-[#22C55E] transition-colors">
              {featuredProject.title}
            </h3>
            <p className="text-[#9CA3AF] leading-relaxed mb-6">{featuredProject.description}</p>
            <div className="flex flex-wrap gap-2">
              {featuredProject.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-[#22C55E]/10 text-[#22C55E] text-xs uppercase tracking-wide rounded-full border border-[#22C55E]/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Selected Work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-xs uppercase tracking-widest text-[#9CA3AF] font-semibold">Selected Work</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {selectedWork.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-[#111827] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#22C55E] transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#22C55E] text-sm font-semibold">{project.year}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#22C55E] transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-[#1F2937] text-[#9CA3AF] text-xs uppercase tracking-wide rounded-full border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Identity — below architecture work */}
        <div id="brand-identity" className="mt-8 pt-16 border-t border-gray-800">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Independent Design & Visual Communication</h2>
            <p className="text-lg text-[#9CA3AF] max-w-3xl mx-auto">
              70+ logos for international clients via Fiverr with 5-star rating
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] mx-auto mt-6"></div>
          </motion.div>

          <div className="mb-12 p-8 bg-[#111827]/50 backdrop-blur-sm border border-gray-800 rounded-2xl hover:border-[#0EA5E9] transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-full md:w-1/2">
                <div className="rounded-xl overflow-hidden border border-gray-700">
                  <img
                    src="/agriculture-journal-logo-cover-design.jpg"
                    alt="International Journal of Agriculture and Medicinal Plants logo and cover page design by Amitabh Chondro Roy"
                    className="w-full h-full object-contain bg-white"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex items-start gap-4">
                <div className="w-2 h-2 bg-[#22C55E] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Featured Design</h3>
                  <p className="text-lg text-white mb-2">
                    International Journal of Agriculture and Medicinal Plants
                  </p>
                  <p className="text-[#9CA3AF]">Logo & Cover Page Design</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {logos.map((logo, idx) => (
              <motion.div
                key={logo.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group flex flex-col items-center"
              >
                <div className="w-full bg-[#111827]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-[#22C55E] transition-all duration-300 aspect-square mb-3">
                  <img
                    src={logo.image}
                    alt={`${logo.client} logo design by Amitabh Chondro Roy`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm text-[#9CA3AF] text-center">{logo.client}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#111827] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#22C55E] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-[#1F2937] hover:bg-[#22C55E] rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/10] overflow-hidden rounded-t-2xl">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#22C55E] text-sm font-semibold">{selectedProject.year}</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-[#1F2937] text-[#9CA3AF] text-xs uppercase tracking-wide rounded-full border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-xl font-semibold mb-4 text-[#22C55E]">Project Description</h3>
                  <p className="text-[#9CA3AF] leading-relaxed text-lg">{selectedProject.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
