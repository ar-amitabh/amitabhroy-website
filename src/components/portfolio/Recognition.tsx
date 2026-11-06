export default function Recognition() {
  const logos = [
    {
      name: 'HSTU',
      url: 'https://placehold.co/200x80/1F2937/9CA3AF?text=HSTU',
    },
    {
      name: 'ETH Zurich',
      url: 'https://placehold.co/200x80/1F2937/9CA3AF?text=ETH+Zurich',
    },
    {
      name: 'ICT Division',
      url: 'https://placehold.co/200x80/1F2937/9CA3AF?text=ICT+Division',
    },
    {
      name: 'Fiverr',
      url: 'https://placehold.co/200x80/1F2937/9CA3AF?text=Fiverr+5★',
    },
  ];

  return (
    <section className="py-16 bg-[#0B1120] border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="relative grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={logo.url}
                alt={`${logo.name} - Organization recognizing Amitabh Chondro Roy's achievements in architecture and sustainable design`}
                className="h-20 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
