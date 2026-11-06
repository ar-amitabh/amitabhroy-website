export default function BrandIdentity() {
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
    client: client,
  }));

  return (
    <section id="brand-identity" className="py-24 bg-gradient-to-b from-[#040816] to-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Brand Identity Design</h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            70+ logos for international clients via Fiverr with 5-star rating
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] mx-auto mt-6"></div>
        </div>

        <div className="mb-12 p-8 bg-[#111827]/50 backdrop-blur-sm border border-gray-800 rounded-2xl hover:border-[#0EA5E9] transition-all duration-300">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-1/2">
              <div className="rounded-xl overflow-hidden border border-gray-700">
                <img
                  src="/agriculture-journal-logo-cover-design.jpg"
                  alt="International Journal of Agriculture and Medicinal Plants"
                  className="w-full h-full object-contain bg-white"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-start gap-4">
              <div className="w-2 h-2 bg-[#22C55E] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Featured Project</h3>
                <p className="text-lg text-white mb-2">
                  International Journal of Agriculture and Medicinal Plants
                </p>
                <p className="text-[#9CA3AF]">Logo & Cover Page Design</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="group flex flex-col items-center"
            >
              <div className="w-full bg-[#111827]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-[#22C55E] transition-all duration-300 hover:transform hover:scale-105 aspect-square mb-3">
                <img
                  src={logo.image}
                  alt={logo.client}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-[#9CA3AF] text-center">{logo.client}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
