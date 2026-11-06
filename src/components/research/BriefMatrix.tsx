import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { briefMatrix, type Gap } from '../../data/thesisSurvey';

const gapStyles: Record<Gap, string> = {
  Critical: 'border-[#F43F5E]/30 bg-[#F43F5E]/10 text-[#FDA4AF]',
  High: 'border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#FCD34D]',
  Moderate: 'border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#7DD3FC]',
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
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6 overflow-hidden rounded-2xl border border-gray-800 bg-[#111827] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-3xl">
          <h3 id={headingId} className="mt-1.5 text-lg font-semibold leading-snug text-[#F9FAFB] sm:text-xl">
            From survey scores to architectural criteria
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
            Each weak dimension is mapped to a physical strategy and a measurable performance target for
            the Rangpur Hi-Tech Park brief.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#86EFAC]">
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
            <tr className="border-b border-gray-800 text-[10px] uppercase tracking-[0.14em] text-[#8A96A8]">
              <th scope="col" className="py-3 pr-4 font-semibold">
                Survey dimension
              </th>
              <th scope="col" className="py-3 pr-4 font-semibold">
                Baseline
              </th>
              <th scope="col" className="py-3 pr-4 font-semibold">
                Architectural strategy
              </th>
              <th scope="col" className="py-3 font-semibold">
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
                  className="border-b border-gray-800/70 align-top last:border-0"
                >
                  <th scope="row" className="py-5 pr-4 font-medium">
                    <span className="block text-[13px] text-[#F9FAFB]">{row.dimension}</span>
                    <span
                      className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${gapStyles[row.gap]}`}
                    >
                      {gapLabel[row.gap]}
                    </span>
                  </th>
                  <td className="py-5 pr-4">
                    <span className="font-mono text-lg font-semibold tabular-nums text-[#F9FAFB]">
                      {row.baseline.toFixed(2)}
                    </span>
                    <span className="font-mono text-[10px] text-[#8A96A8]"> / 5</span>
                    <span className="mt-1 block whitespace-nowrap text-[10px] font-semibold text-[#4ADE80]">
                      target {row.target.toFixed(2)} · +{gain.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-5 pr-4 text-xs leading-relaxed text-[#AEBAC9]">{row.strategy}</td>
                  <td className="py-5">
                    <ul className="space-y-1.5">
                      {row.criteria.map((criterion) => (
                        <li key={criterion} className="flex items-start gap-1.5 text-xs leading-snug text-[#94A3B8]">
                          <Check size={12} className="mt-0.5 shrink-0 text-[#22C55E]" aria-hidden="true" />
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
      <div className="mt-6 grid gap-3 lg:hidden">
        {briefMatrix.map((row, index) => {
          const gain = row.gain;
          return (
            <motion.article
              key={row.dimension}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="rounded-xl border border-gray-800 bg-[#0B1120] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-semibold text-[#F9FAFB]">{row.dimension}</h4>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${gapStyles[row.gap]}`}
                >
                  {gapLabel[row.gap]}
                </span>
              </div>
              <p className="mt-2 font-mono text-xs tabular-nums text-[#94A3B8]">
                <span className="text-lg font-semibold text-[#F9FAFB]">{row.baseline.toFixed(2)}</span> / 5
                <span className="ml-2 text-[#4ADE80]">target {row.target.toFixed(2)} · +{gain.toFixed(1)}%</span>
              </p>
              <p className="mt-3 text-xs leading-relaxed text-[#AEBAC9]">{row.strategy}</p>
              <ul className="mt-3 space-y-1.5 border-t border-gray-800 pt-3">
                {row.criteria.map((criterion) => (
                  <li key={criterion} className="flex items-start gap-1.5 text-xs leading-snug text-[#94A3B8]">
                    <Check size={12} className="mt-0.5 shrink-0 text-[#22C55E]" aria-hidden="true" />
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
