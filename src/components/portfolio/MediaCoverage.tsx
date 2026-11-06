import { Newspaper } from 'lucide-react';

export default function MediaCoverage() {
  const coverage = [
    {
      id: 1,
      image: '/context-bd-media-coverage.jpg',
      title: 'Modern Masterpieces in Models | Episode 1',
      link: 'https://contextbd.com/modern-masterpieces-models',
    },
    {
      id: 2,
      image: '/media-coverage-publication.png',
      title: 'Photography is the Passion',
      link: 'https://www.kalerkantho.com/print-edition/campus/2019/07/17/792168?fbclid=IwY2xjawN9sUxleHRuA2FlbQIxMQBzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeJFSgLSHMEXolSlrFUFp1PTJrcsl-HRtIdOYFgmhT_JunSTR_wMgYxYqKrEA_aem_ATLHWB-Xp1m2YqkpVxPKyg&brid=8BA1bKHeMOA6XgF8m0QhvQ',
    },
  ];

  return (
    <section id="media" className="py-16 bg-[#040816] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-[#22C55E]" />
            <h2 className="text-3xl font-bold">Featured In</h2>
          </div>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            HSTU Photographic Society initiatives covered in national newspapers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {coverage.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#111827]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-[#22C55E] transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.title} - Media coverage featuring Amitabh Chondro Roy's architectural work and HSTU Photographic Society initiatives`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#9CA3AF] hover:text-[#22C55E] text-center block transition-colors duration-300"
                  >
                    {item.title}
                  </a>
                ) : (
                  <p className="text-sm text-[#9CA3AF] text-center">{item.title}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
