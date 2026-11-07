import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import ChartCard from './ChartCard';
import { combinedPriorityShare, priorities, surveyMeta } from '../../data/thesisSurvey';

const SIZE = 200;
const CENTER = SIZE / 2;
const RADIUS = 72;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SEGMENT_GAP = 3;

export default function PriorityDonut() {
  const total = priorities.reduce((sum, item) => sum + item.count, 0);
  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (inView) setDrawn(true);
  }, [inView]);

  const focus = hovered ?? active;

  let cursor = 0;
  const segments = priorities.map((item, index) => {
    const fraction = item.count / total;
    const length = fraction * CIRCUMFERENCE;
    const offset = cursor * CIRCUMFERENCE;
    cursor += fraction;
    return { ...item, index, fraction, length, offset };
  });

  const focusItem = focus !== null ? segments[focus] : null;

  const summary = priorities
    .map((item) => `${item.label}: ${item.count} of ${total}`)
    .join('; ');

  return (
    <ChartCard
      title="The one change occupants would make first"
      description="Single most important architectural intervention, chosen from one list per respondent."
      badge="Priorities"
      tone="amber"
      insight={
        <>
          <strong className="font-semibold text-graphite">Greenery and ventilation each hold 26.7%.</strong>{' '}
          Together they carry {combinedPriorityShare}% of first-choice demand, so the brief leads with
          biophilic micro-climates rather than a single headline feature.
        </>
      }
    >
      <div ref={wrapperRef} className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-7">
        <div className="relative shrink-0">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="h-44 w-44 sm:h-48 sm:w-48"
            role="img"
            aria-label={`Doughnut chart of first-choice interventions. ${summary}.`}
          >
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="var(--stone)"
              strokeOpacity={0.35}
              strokeWidth={26}
            />
            <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
              {segments.map((segment) => {
                const dash = drawn ? Math.max(segment.length - SEGMENT_GAP, 0.5) : 0;
                const dimmed = focus !== null && focus !== segment.index;
                return (
                  <circle
                    key={segment.label}
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth={focus === segment.index ? 28 : 24}
                    strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
                    strokeDashoffset={-segment.offset}
                    opacity={dimmed ? 0.35 : 1}
                    className="cursor-pointer"
                    style={{
                      transition: reduceMotion
                        ? 'opacity 150ms linear'
                        : 'stroke-dasharray 900ms cubic-bezier(0.22, 1, 0.36, 1), stroke-width 200ms ease, opacity 200ms ease',
                    }}
                    onClick={() => setActive(active === segment.index ? null : segment.index)}
                    onMouseEnter={() => setHovered(segment.index)}
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })}
            </g>
          </svg>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-11 text-center"
          >
            {focusItem ? (
              <>
                <span className="font-serif text-2xl font-normal tabular-nums text-graphite">
                  {((focusItem.count / total) * 100).toFixed(1)}
                  <span className="text-sm">%</span>
                </span>
                <span className="mt-1 line-clamp-2 w-full text-[10px] leading-tight text-graphite-soft">
                  {focusItem.label}
                </span>
                <span className="mt-1 font-mono text-[10px] text-graphite-soft">
                  {focusItem.count} of {total}
                </span>
              </>
            ) : (
              <>
                <span className="font-serif text-3xl font-normal tabular-nums text-graphite">
                  {combinedPriorityShare}<span className="text-base">%</span>
                </span>
                <span className="mt-1 max-w-[7rem] font-mono text-[9px] uppercase leading-tight tracking-[0.08em] text-graphite-soft">
                  greenery + ventilation
                </span>
              </>
            )}
          </div>
        </div>

        <ul className="grid w-full grid-cols-1 gap-1">
          {segments.map((segment) => {
            const selected = active === segment.index;
            return (
              <li key={segment.label}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(selected ? null : segment.index)}
                  onMouseEnter={() => setHovered(segment.index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(segment.index)}
                  onBlur={() => setHovered(null)}
                  className={`flex w-full items-center gap-2.5 rounded-card border px-2.5 py-1.5 text-left transition-colors ${
                    selected
                      ? 'border-forest bg-sage/20'
                      : 'border-transparent hover:bg-stone/20'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 rounded-card"
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="min-w-0 flex-1 truncate text-xs text-graphite">{segment.label}</span>
                  <span className="shrink-0 font-mono text-[11px] tabular-nums text-graphite-soft">
                    {((segment.count / surveyMeta.sampleSize) * 100).toFixed(1)}%
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </ChartCard>
  );
}
