import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Camera, Grid3x3 } from 'lucide-react';
import {
  galleryPhotos,
  photoCategories,
  photoWidths,
  type GalleryPhoto,
} from '../../data/photography';

function srcSet(photo: GalleryPhoto) {
  return photoWidths
    .map((width) => `${photo.image}-${width}.webp ${width}w`)
    .join(', ');
}

function PhotographyCard({ photo, index }: { photo: GalleryPhoto; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.24), ease: [0.16, 1, 0.3, 1] }}
      className="group mb-6 break-inside-avoid overflow-hidden border border-stone bg-paper-raised"
    >
      <div className="relative overflow-hidden bg-paper">
        <img
          src={`${photo.image}-1024.webp`}
          srcSet={srcSet(photo)}
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="h-auto w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
        />
        <span className="tag-pill absolute bottom-3 left-3 shadow-subtle">
          {photo.category}
        </span>
      </div>
      <figcaption className="p-5">
        <h3 className="font-serif text-2xl text-graphite">{photo.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-graphite-soft">{photo.caption}</p>
      </figcaption>
    </motion.figure>
  );
}

export default function PhotographySection() {
  const [activeCategory, setActiveCategory] = useState<(typeof photoCategories)[number]>('All');
  const visiblePhotos =
    activeCategory === 'All'
      ? galleryPhotos
      : galleryPhotos.filter((photo) => photo.category === activeCategory);

  return (
    <section
      id="photography"
      className="brand-section scroll-mt-24 border-t border-stone bg-paper-raised text-graphite"
    >
      <div className="brand-container">
        <div className="mb-10 grid gap-6 border-b border-stone pb-8 xl:grid-cols-[1fr_auto] xl:items-end">
          <div>
            <p className="type-label mb-3 text-forest-deep">Architectural &amp; Field Photography</p>
            <h2 className="type-h2 text-graphite">
              A view of <span className="accent-italic">place</span>.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-graphite-soft">
              Architecture, urban life, landscape and monsoon light across Bangladesh.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Filter photographs">
            {photoCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`min-h-[40px] rounded-pill px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors ${
                  activeCategory === category
                    ? 'bg-forest text-paper'
                    : 'bg-blush text-graphite hover:bg-sage/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {visiblePhotos.length} photograph{visiblePhotos.length === 1 ? '' : 's'} shown
          {activeCategory === 'All' ? '' : ` in ${activeCategory}`}.
        </p>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]"
        >
          {visiblePhotos.map((photo, index) => (
            <PhotographyCard key={photo.id} photo={photo} index={index} />
          ))}
        </motion.div>

        <div className="mt-8 flex items-center gap-3 border-t border-stone pt-5 font-mono text-xs uppercase tracking-[0.08em] text-graphite-soft">
          {visiblePhotos.length === 0 ? (
            <Camera size={16} strokeWidth={1.5} className="text-forest" aria-hidden="true" />
          ) : (
            <Grid3x3 size={16} strokeWidth={1.5} className="text-forest" aria-hidden="true" />
          )}
          <p>
            {activeCategory === 'All'
              ? `${galleryPhotos.length} photographs archived`
              : `${visiblePhotos.length} photograph${visiblePhotos.length === 1 ? '' : 's'} in ${activeCategory}`}
          </p>
        </div>
      </div>
    </section>
  );
}
