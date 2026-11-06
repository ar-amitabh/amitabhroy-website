import { motion, useReducedMotion } from 'framer-motion';

export type RankedRow = {
  label: string;
  value: number;
  meta?: string;
};

type RankedBarsProps = {
  rows: RankedRow[];
  max: number;
  from: string;
  to: string;
  showRank?: boolean;
};

/**
 * Accessible ranked bar list. The bars are decorative; every value is also
 * printed as text, so the chart is readable without colour or motion.
 */
export default function RankedBars({ rows, max, from, to, showRank = false }: RankedBarsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="space-y-3.5">
      {rows.map((row, index) => (
        <motion.li
          key={row.label}
          initial={reduceMotion ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
          className="group"
        >
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex min-w-0 items-baseline gap-2">
              {showRank && (
                <span aria-hidden="true" className="w-4 shrink-0 font-mono text-[10px] text-[#8A96A8]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              <span className="truncate text-[13px] text-[#DCE3EC]">{row.label}</span>
            </div>
            <div className="shrink-0 font-mono text-xs tabular-nums text-[#F9FAFB]">
              {row.value}
              {row.meta && (
                <span className="ml-1.5 font-sans text-[10px] font-normal text-[#8A96A8]">{row.meta}</span>
              )}
            </div>
          </div>

          <div
            aria-hidden="true"
            className={`mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.055] ${showRank ? 'ml-6' : ''}`}
          >
            <motion.div
              className="h-full rounded-full transition-[filter] duration-300 group-hover:brightness-110"
              style={{ backgroundImage: `linear-gradient(90deg, ${from}, ${to})` }}
              initial={reduceMotion ? false : { width: 0 }}
              whileInView={{ width: `${Math.max((row.value / max) * 100, 3)}%` }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.1 + Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
