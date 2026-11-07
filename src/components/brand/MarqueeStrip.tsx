import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

const disciplines = [
  'Architecture',
  'Urban Planning',
  'Climate-Responsive Design',
  'Biophilic Workplaces',
  'Architectural Research',
];

export default function MarqueeStrip() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label="Practice disciplines"
      className="relative overflow-hidden border-y border-stone bg-paper-raised py-5"
    >
      <div className="flex items-center overflow-hidden">
        <div className={`animate-brand-marquee flex shrink-0 items-center whitespace-nowrap ${paused ? 'is-paused' : ''}`}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center whitespace-nowrap" aria-hidden={copy === 1}>
              {disciplines.map((item) => (
                <div key={`${copy}-${item}`} className="flex shrink-0 items-center whitespace-nowrap">
                  <span className="whitespace-nowrap px-6 font-serif text-3xl italic text-graphite sm:px-8 sm:text-[40px]">
                    {item}
                  </span>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" aria-hidden="true" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Section 10.5: Visible pause control for any looping motion over 5s */}
      <div className="brand-container mt-3 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((prev) => !prev)}
          aria-pressed={paused}
          aria-label={paused ? 'Resume discipline marquee' : 'Pause discipline marquee'}
          className="type-label inline-flex min-h-[36px] items-center gap-1.5 rounded-pill border border-stone bg-paper px-3 py-1 text-graphite-soft transition-colors hover:border-graphite hover:text-graphite"
        >
          {paused ? <Play size={12} strokeWidth={1.5} /> : <Pause size={12} strokeWidth={1.5} />}
          {paused ? 'Play motion' : 'Pause motion'}
        </button>
      </div>
    </section>
  );
}
