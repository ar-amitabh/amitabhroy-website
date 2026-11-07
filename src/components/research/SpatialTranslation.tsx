import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { spatialFigures, thesisFigureWidths, type ThesisFigure } from '../../data/thesisFigures';

function srcSet(figure: ThesisFigure) {
  return thesisFigureWidths
    .map((width) => `${figure.image}-${width}.webp ${width}w`)
    .join(', ');
}

export default function SpatialTranslation() {
  const headingId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby={headingId}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5 }}
      className="mt-8 overflow-hidden rounded-card border border-stone bg-paper-raised p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-3xl">
          <p className="type-meta text-forest-deep">Design Synthesis</p>
          <h3 id={headingId} className="mt-1 type-h3 text-graphite">
            Spatial translation: form finding &amp; design outcomes
          </h3>
          <p className="mt-2 type-caption text-graphite-soft">
            Translating empirical survey priorities into spatial typologies — from the masterplan down to
            the desk and the view beyond it.
          </p>
        </div>
        <span className="tag-pill inline-flex items-center gap-1.5">
          <Layers size={11} aria-hidden="true" />
          {spatialFigures.length} architectural plates
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {spatialFigures.map((figure, index) => (
          <motion.figure
            key={figure.id}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.24) }}
            className="group overflow-hidden rounded-card border border-stone bg-paper"
          >
            <div className="relative overflow-hidden bg-stone/20">
              <img
                src={`${figure.image}-1024.webp`}
                srcSet={srcSet(figure)}
                sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
                width={figure.width}
                height={figure.height}
                alt={figure.alt}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="p-4 sm:p-5 border-t border-stone">
              <h4 className="font-serif text-lg text-graphite">{figure.title}</h4>
              <p className="mt-1.5 type-caption text-graphite-soft">{figure.caption}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </motion.section>
  );
}
