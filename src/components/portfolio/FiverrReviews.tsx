import { Star } from 'lucide-react';

export default function FiverrReviews() {
  const reviews = [
    {
      id: 1,
      rating: 5,
      clientName: 'bethanyellis105',
      reviewText: "Amitabh, has been a blessing to work with. It's communication is great and produces quality work in a timely fashion.",
      country: 'USA',
    },
    {
      id: 2,
      rating: 5,
      clientName: 'beyondxb',
      reviewText: "Communication with Amitabh was fast and easy, he understood what I need and how to get to my goal quickly. More importantly he didn't use a lot of technical jargons so I was able to understand him too. Work done on time. Great will hire again!",
      country: 'UK',
    },
    {
      id: 3,
      rating: 5,
      clientName: 'msrealtor514',
      reviewText: 'Amitabh was Awesome. every question was answered. I am new setting up things digitally, and he was a God sent. I am now ready to take my business to the next level. I would highly recommend him. He has me as a returning customer.',
      country: 'USA',
    },
  ];

  return (
    <section id="fiverr-reviews" className="py-24 bg-[#0A1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Fiverr Reviews</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#111827] rounded-xl p-6 border border-gray-800 hover:border-[#22C55E] transition-all hover:shadow-lg hover:shadow-[#22C55E]/10"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    className={
                      index < review.rating
                        ? 'fill-[#22C55E] text-[#22C55E]'
                        : 'text-gray-600'
                    }
                  />
                ))}
              </div>

              <p className="text-[#9CA3AF] mb-6 leading-relaxed min-h-[80px]">
                {review.reviewText}
              </p>

              <div className="border-t border-gray-800 pt-4">
                <p className="font-semibold text-[#F9FAFB] mb-1">{review.clientName}</p>
                <p className="text-sm text-[#9CA3AF]">Client Country: {review.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
