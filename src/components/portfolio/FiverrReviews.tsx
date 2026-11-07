import { Star } from 'lucide-react';

export default function FiverrReviews() {
  const reviews = [
    {
      id: 1,
      rating: 5,
      clientName: 'bethanyellis105',
      reviewText:
        'Amitabh has been a blessing to work with. Communication is great and he produces quality work in a timely fashion.',
      country: 'United States',
    },
    {
      id: 2,
      rating: 5,
      clientName: 'beyondxb',
      reviewText:
        'Communication with Amitabh was fast and easy—he understood what I needed and how to reach my goal quickly without unnecessary jargon. Great work, will hire again.',
      country: 'United Kingdom',
    },
    {
      id: 3,
      rating: 5,
      clientName: 'msrealtor514',
      reviewText:
        'Every question was answered clearly and thoughtfully. I would highly recommend working with Amitabh.',
      country: 'United States',
    },
  ];

  return (
    <section id="fiverr-reviews" className="brand-section bg-paper-raised text-graphite">
      <div className="brand-container">
        <div className="mb-12 border-b border-stone pb-8">
          <p className="type-label mb-3 text-forest-deep">Collaborator &amp; Client Feedback</p>
          <h2 className="type-h2 text-graphite">
            Selected client <span className="accent-italic">testimonials</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote
              key={review.id}
              className="flex flex-col justify-between rounded-card border border-stone bg-paper p-7"
            >
              <div>
                <div className="mb-4 flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={15}
                      strokeWidth={1.5}
                      className="fill-terracotta text-terracotta"
                    />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-graphite-soft">
                  “{review.reviewText}”
                </p>
              </div>

              <footer className="mt-6 border-t border-stone pt-4">
                <p className="font-serif text-xl text-graphite">{review.clientName}</p>
                <p className="type-label mt-0.5 text-graphite-soft">{review.country}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
