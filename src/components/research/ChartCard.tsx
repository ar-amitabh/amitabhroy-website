import type { ReactNode } from 'react';
import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type CardTone = 'green' | 'blue' | 'amber' | 'violet' | 'teal' | 'rose';

const toneClasses: Record<CardTone, string> = {
  green: 'border-[#22C55E]/30 bg-[#22C55E]/10 text-[#86EFAC]',
  blue: 'border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[#7DD3FC]',
  amber: 'border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#FCD34D]',
  violet: 'border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#C4B5FD]',
  teal: 'border-[#14B8A6]/30 bg-[#14B8A6]/10 text-[#5EEAD4]',
  rose: 'border-[#F43F5E]/30 bg-[#F43F5E]/10 text-[#FDA4AF]',
};

type ChartCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  badge: string;
  tone?: CardTone;
  actions?: ReactNode;
  insight: ReactNode;
  className?: string;
  children: ReactNode;
};

export default function ChartCard({
  eyebrow,
  title,
  description,
  badge,
  tone = 'green',
  actions,
  insight,
  className = '',
  children,
}: ChartCardProps) {
  const headingId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby={headingId}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-[#111827] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-6 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#22C55E]">
              {eyebrow}
            </p>
          )}
          <h3 id={headingId} className="mt-1.5 text-base font-semibold leading-snug text-[#F9FAFB] sm:text-lg">
            {title}
          </h3>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <span
            className={`hidden items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:inline-flex ${toneClasses[tone]}`}
          >
            {badge}
          </span>
          {actions}
        </div>
      </div>

      <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">{description}</p>

      <div className="mt-5 flex-1">{children}</div>

      <footer className="mt-5 flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-[#0B1120] px-3.5 py-3 text-xs leading-relaxed text-[#AEBAC9]">
        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22C55E]" />
        <p>{insight}</p>
      </footer>
    </motion.section>
  );
}
