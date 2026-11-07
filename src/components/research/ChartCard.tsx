import type { ReactNode } from 'react';
import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type CardTone = 'green' | 'blue' | 'amber' | 'violet' | 'teal' | 'rose';

const toneClasses: Record<CardTone, string> = {
  green: 'border-forest/40 bg-sage/20 text-forest-deep',
  blue: 'border-stone bg-paper text-graphite-soft',
  amber: 'border-terracotta/40 bg-blush/35 text-terracotta-deep',
  violet: 'border-stone bg-blush/25 text-graphite',
  teal: 'border-forest/40 bg-sage/20 text-forest-deep',
  rose: 'border-terracotta/40 bg-blush/35 text-terracotta-deep',
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
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5 }}
      className={`relative flex flex-col overflow-hidden rounded-card border border-stone bg-paper-raised p-5 sm:p-6 ${className}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          {eyebrow && (
            <p className="type-meta text-forest-deep">
              {eyebrow}
            </p>
          )}
          <h3 id={headingId} className="mt-1 font-serif text-xl sm:text-2xl text-graphite">
            {title}
          </h3>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <span
            className={`hidden items-center rounded-pill border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] sm:inline-flex ${toneClasses[tone]}`}
          >
            {badge}
          </span>
          {actions}
        </div>
      </div>

      <p className="mt-2 type-caption text-graphite-soft">{description}</p>

      <div className="mt-5 flex-1">{children}</div>

      <footer className="mt-5 flex items-start gap-2.5 rounded-card border border-stone bg-paper px-3.5 py-3 type-caption text-graphite-soft">
        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
        <p>{insight}</p>
      </footer>
    </motion.section>
  );
}
