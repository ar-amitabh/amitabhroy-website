import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { briefMatrix, type Gap } from '../../data/thesisSurvey';

const gapStyles: Record<Gap, string> = {
  Critical: 'border-terracotta/50 bg-blush/40 text-terracotta-deep',
  High: 'border-forest/50 bg-sage/25 text-forest-deep',
  Moderate: 'border-stone bg-paper text-graphite-soft',
};

const gapLabel: Record<Gap, string> = {
  Critical: 'Critical gap',
  High: 'High priority',
  Moderate: 'Moderate',
};

export default function BriefMatrix() {
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
          <p className="type-meta text-forest-deep">Translation Matrix</p>
          <h3 id={headingId} className="mt-1 type-h3 text-graphite">
            From survey scores to architectural criteria
          </h3>
          <p className="mt-2 type-caption text-graphite-soft">
            Each weak dimension is mapped to a physical strategy and a measurable performance target for
            the Rangpur Hi-Tech Park brief.
          </p>
        </div>
        <span className="tag-pill">
          4 dimensions
        </span>
      </div>

      {/* Desktop table */}
      <div className="mt-6 hidden overflow-x-auto lg:block" tabIndex={0} role="region" aria-label="Survey translation matrix">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">
            Survey dimensions, baseline ratings, architectural strategies and design performance criteria
          </caption>
          <thead>
            <tr className="border-b border-stone type-meta text-graphite-soft">
              <th scope="col" className="py-3 pr-4">
                Survey dimension
              </th>
              <th scope="col" className="py-3 pr-4">
                Baseline
              </th>
              <th scope="col" className="py-3 pr-4">
                Architectural strategy
              </th>
              <th scope="col" className="py-3">
                Performance criteria
              </th>
            </tr>
          </thead>
          <tbody>
            {briefMatrix.map((row, index) => {
              const gain = row.gain;
              return (
                <motion.tr
                  key={row.dimension}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="border-b border-stone align-top last:border-0"
                >
                  <th scope="row" className="py-5 pr-4 font-medium">
                    <span className="block text-sm font-semibold text-graphite">{row.dimension}</span>
                    <span
                      className={`mt-2 inline-flex rounded-pill border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] ${gapStyles[row.gap]}`}
                    >
                      {gapLabel[row.gap]}
                    </span>
                  </th>
                  <td className="py-5 pr-4">
                    <span className="font-serif text-2xl tabular-nums text-graphite">
                      {row.baseline.toFixed(2)}
                    </span>
                    <span className="font-mono text-xs text-graphite-soft"> / 5</span>
                    <span className="mt-1 block whitespace-nowrap font-mono text-xs font-medium text-forest-deep">
                      target {row.target.toFixed(2)} · +{gain.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-5 pr-4 type-caption text-graphite-soft">{row.strategy}</td>
                  <td className="py-5">
                    <ul className="space-y-1.5">
                      {row.criteria.map((criterion) => (
                        <li key={criterion} className="flex items-start gap-2 type-caption text-graphite">
                          <Check size={13} className="mt-0.5 shrink-0 text-forest-deep" aria-hidden="true" />
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Narrow screens */}
      <div className="mt-6 grid gap-4 lg:hidden">
        {briefMatrix.map((row, index) => {
          const gain = row.gain;
          return (
            <motion.article
              key={row.dimension}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="rounded-card border border-stone bg-paper p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-semibold text-graphite">{row.dimension}</h4>
                <span
                  className={`shrink-0 rounded-pill border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] ${gapStyles[row.gap]}`}
                >
                  {gapLabel[row.gap]}
                </span>
              </div>
              <p className="mt-2 font-mono text-xs tabular-nums text-graphite-soft">
                <span className="font-serif text-xl text-graphite">{row.baseline.toFixed(2)}</span> / 5
                <span className="ml-2 text-forest-deep">target {row.target.toFixed(2)} · +{gain.toFixed(1)}%</span>
              </p>
              <p className="mt-3 type-caption text-graphite-soft">{row.strategy}</p>
              <ul className="mt-3 space-y-1.5 border-t border-stone pt-3">
                {row.criteria.map((criterion) => (
                  <li key={criterion} className="flex items-start gap-1.5 type-caption text-graphite">
                    <Check size={13} className="mt-0.5 shrink-0 text-forest-deep" aria-hidden="true" />
                    <span>{criterion}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}
