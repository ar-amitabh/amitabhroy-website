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
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.24) }}
      className="group mb-5 break-inside-avoid overflow-hidden rounded-xl border border-gray-800 bg-[#0D1423]"
    >
      <div className="relative overflow-hidden bg-[#111D2B]">
        <img
          src={`${photo.image}-1024.webp`}
          srcSet={srcSet(photo)}
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-[#040816]/85 px-3 py-1 text-[11px] font-medium text-[#D6DEE8] backdrop-blur-sm">
          {photo.category}
        </span>
      </div>
      <figcaption className="p-5">
        <h3 className="text-lg font-semibold text-[#F9FAFB]">{photo.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#9CA3AF]">{photo.caption}</p>
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
    <section id="photography" className="scroll-mt-24 border-t border-gray-800 bg-[#080D1B] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-5 xl:grid-cols-[1fr_auto] xl:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold text-[#22C55E]">Photography</p>
            <h2 className="text-3xl font-bold text-[#F9FAFB] sm:text-4xl">A view of place</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-[#9CA3AF]">
              Architecture, urban life, landscape and nature seen through the lens.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Filter photographs">
            {photoCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E] ${
                  activeCategory === category
                    ? 'bg-[#22C55E] text-[#04110A]'
                    : 'border border-gray-700 text-[#B7C0CC] hover:border-[#22C55E] hover:text-white'
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
          transition={{ duration: 0.3 }}
          className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]"
        >
          {visiblePhotos.map((photo, index) => (
            <PhotographyCard key={photo.id} photo={photo} index={index} />
          ))}
        </motion.div>

        <div className="mt-6 flex items-center gap-3 border-t border-gray-800 pt-5 text-sm text-[#758296]">
          {visiblePhotos.length === 0 ? (
            <Camera size={17} className="text-[#22C55E]" aria-hidden="true" />
          ) : (
            <Grid3x3 size={17} className="text-[#22C55E]" aria-hidden="true" />
          )}
          <p>
            {activeCategory === 'All'
              ? `${galleryPhotos.length} photographs so far — the collection grows as new work is added.`
              : `${visiblePhotos.length} photograph${visiblePhotos.length === 1 ? '' : 's'} in ${activeCategory}.`}
          </p>
        </div>
      </div>
    </section>
  );
}
