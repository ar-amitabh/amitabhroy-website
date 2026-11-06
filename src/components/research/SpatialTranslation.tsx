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
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6 overflow-hidden rounded-2xl border border-gray-800 bg-[#111827] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-3xl">
          <h3 id={headingId} className="mt-1.5 text-lg font-semibold leading-snug text-[#F9FAFB] sm:text-xl">
            Spatial translation: form finding &amp; design outcomes
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
            Translating empirical survey priorities into spatial typologies — from the masterplan down to
            the desk and the view beyond it.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7DD3FC]">
          <Layers size={11} aria-hidden="true" />
          {spatialFigures.length} renders
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {spatialFigures.map((figure, index) => (
          <motion.figure
            key={figure.id}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.24) }}
            className="group overflow-hidden rounded-xl border border-gray-800 bg-[#0B1120]"
          >
            <div className="relative overflow-hidden bg-[#0B1120]">
              <img
                src={`${figure.image}-1024.webp`}
                srcSet={srcSet(figure)}
                sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
                width={figure.width}
                height={figure.height}
                alt={figure.alt}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="p-4 sm:p-5">
              <h4 className="mt-1 text-sm font-semibold text-[#F9FAFB]">{figure.title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-[#9CA3AF]">{figure.caption}</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </motion.section>
  );
}
