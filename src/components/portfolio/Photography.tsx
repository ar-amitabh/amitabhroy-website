export default function Photography() {
  const photos = [
    {
      id: 1,
      image: 'https://placehold.co/600x800/1F2937/22C55E?text=Portrait',
      aspect: 'tall',
    },
    {
      id: 2,
      image: 'https://placehold.co/800x500/1F2937/0EA5E9?text=Architecture',
      aspect: 'wide',
    },
    {
      id: 3,
      image: 'https://placehold.co/600x600/1F2937/22C55E?text=Nature',
      aspect: 'square',
    },
    {
      id: 4,
      image: 'https://placehold.co/600x800/1F2937/0EA5E9?text=Street',
      aspect: 'tall',
    },
    {
      id: 5,
      image: '/photography/landscape/landscape-photography-bangladesh.jpg',
      aspect: 'wide',
    },
    {
      id: 6,
      image: 'https://placehold.co/600x600/1F2937/0EA5E9?text=Urban',
      aspect: 'square',
    },
    {
      id: 7,
      image: 'https://placehold.co/600x800/1F2937/22C55E?text=Documentary',
      aspect: 'tall',
    },
    {
      id: 8,
      image: 'https://placehold.co/800x500/1F2937/0EA5E9?text=Culture',
      aspect: 'wide',
    },
  ];

  return (
    <section id="photography" className="py-24 bg-gradient-to-b from-[#0B1120] to-[#040816]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Photography</h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Photography sharpens how I see spaces and light, which I bring to my architectural work.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] mx-auto mt-6"></div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-gray-800 hover:border-[#22C55E] transition-all duration-300"
            >
              <img
                src={photo.image}
                alt={`Photography by Amitabh Chondro Roy - Architectural and landscape photography showcasing design perspective`}
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040816]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
