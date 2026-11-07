import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BarChart3, Radar as RadarIcon } from 'lucide-react';
import ChartCard from './ChartCard';
import { ieqDimensions, surveyMeta } from '../../data/thesisSurvey';

const VIEWBOX = { width: 420, height: 384 };
const RADAR = { cx: 210, cy: 190, radius: 116 };
const LABEL_RADIUS = RADAR.radius + 28;

const angleFor = (index: number) =>
  (Math.PI * 2 * index) / ieqDimensions.length - Math.PI / 2;

const pointFor = (index: number, value: number) => {
  const angle = angleFor(index);
  const radius = (value / surveyMeta.scaleMax) * RADAR.radius;
  return [RADAR.cx + Math.cos(angle) * radius, RADAR.cy + Math.sin(angle) * radius] as const;
};

const polygonFor = (values: number[]) =>
  values
    .map((value, index) => {
      const [x, y] = pointFor(index, value);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

function IeqBar({ value, color, delay }: { value: number; color: string; delay: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-hidden="true" className="h-2 overflow-hidden rounded-pill bg-stone/30">
      <motion.div
        className="h-full rounded-pill"
        style={{ background: color }}
        initial={reduceMotion ? false : { width: 0 }}
        whileInView={{ width: `${(value / surveyMeta.scaleMax) * 100}%` }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export default function IeqComparison({ className = '' }: { className?: string }) {
  const [view, setView] = useState<'bar' | 'radar'>('bar');
  const reduceMotion = useReducedMotion();

  const lightAndAir = ieqDimensions[2];
  const lightGain = lightAndAir.changePct;
  const productivity = ieqDimensions[5];
  const productivityGain = productivity.changePct;

  const baselineValues = ieqDimensions.map((dimension) => dimension.baseline);
  const proposedValues = ieqDimensions.map((dimension) => dimension.proposed);

  const viewToggle = (
    <div
      role="group"
      aria-label="IEQ chart view"
      className="flex items-center gap-1 rounded-pill border border-stone bg-paper p-1"
    >
      <button
        type="button"
        aria-label="Bars view"
        aria-pressed={view === 'bar'}
        onClick={() => setView('bar')}
        className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors ${
          view === 'bar'
            ? 'bg-forest text-paper'
            : 'text-graphite-soft hover:text-graphite'
        }`}
      >
        <BarChart3 size={13} aria-hidden="true" />
        <span className="hidden sm:inline">Bars</span>
      </button>
      <button
        type="button"
        aria-label="Radar profile view"
        aria-pressed={view === 'radar'}
        onClick={() => setView('radar')}
        className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors ${
          view === 'radar'
            ? 'bg-forest text-paper'
            : 'text-graphite-soft hover:text-graphite'
        }`}
      >
        <RadarIcon size={13} aria-hidden="true" />
        <span className="hidden sm:inline">Radar</span>
      </button>
    </div>
  );

  return (
    <ChartCard
      title="Current baseline vs. proposed environment"
      description="Mean rating of the workplace as it is today against the human-centred environment the design proposes. Five-point scale."
      badge="Comparison"
      tone="green"
      actions={viewToggle}
      className={className}
      insight={
        <>
          Every dimension improves. Light and air gains most at{' '}
          <strong className="font-semibold text-forest-deep">+{lightGain.toFixed(1)}%</strong>; productivity
          gains least at +{productivityGain.toFixed(1)}%, yet comfort still converts into output.
        </>
      }
    >
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 type-meta text-graphite-soft">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-3 rounded-card bg-stone" />
            Current baseline
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-3 rounded-card bg-forest" />
            Proposed environment
          </span>
          <span className="ml-auto font-mono text-[11px] text-graphite-soft">Scale 1–5</span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {view === 'bar' ? (
            <motion.div
              key="bar"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {ieqDimensions.map((dimension, index) => {
                const gain = dimension.changePct;
                return (
                  <div key={dimension.key}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-graphite font-medium">{dimension.label}</span>
                      <span className="shrink-0 font-mono text-xs tabular-nums text-graphite-soft">
                        {dimension.baseline.toFixed(2)}
                        <span aria-hidden="true"> → </span>
                        <span className="sr-only"> to </span>
                        <span className="text-graphite font-medium">{dimension.proposed.toFixed(2)}</span>
                        <span className="ml-2 text-forest-deep font-medium">+{gain.toFixed(1)}%</span>
                      </span>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      <IeqBar value={dimension.baseline} color="var(--stone)" delay={index * 0.05} />
                      <IeqBar value={dimension.proposed} color="var(--forest)" delay={0.1 + index * 0.05} />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="radar"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                className="mx-auto h-auto w-full max-w-[620px]"
                role="img"
                aria-label={`Radar profile. Current baseline: ${ieqDimensions
                  .map((dimension) => `${dimension.label} ${dimension.baseline.toFixed(2)}`)
                  .join(', ')}. Proposed: ${ieqDimensions
                  .map((dimension) => `${dimension.label} ${dimension.proposed.toFixed(2)}`)
                  .join(', ')}.`}
              >
                {[1, 2, 3, 4, 5].map((ring) => (
                  <polygon
                    key={ring}
                    points={polygonFor(ieqDimensions.map(() => ring))}
                    fill="none"
                    stroke="var(--stone)"
                    strokeWidth={ring === 5 ? 1.2 : 0.8}
                  />
                ))}

                {ieqDimensions.map((dimension, index) => {
                  const [x, y] = pointFor(index, surveyMeta.scaleMax);
                  return (
                    <line
                      key={dimension.key}
                      x1={RADAR.cx}
                      y1={RADAR.cy}
                      x2={x}
                      y2={y}
                      stroke="var(--stone)"
                      strokeWidth={0.8}
                    />
                  );
                })}

                <motion.g
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                >
                  <polygon
                    points={polygonFor(baselineValues)}
                    fill="var(--stone)"
                    fillOpacity={0.25}
                    stroke="var(--graphite-soft)"
                    strokeWidth={1.6}
                    strokeDasharray="4 4"
                  />
                  <polygon
                    points={polygonFor(proposedValues)}
                    fill="var(--sage)"
                    fillOpacity={0.35}
                    stroke="var(--forest)"
                    strokeWidth={2.2}
                  />
                  {proposedValues.map((value, index) => {
                    const [x, y] = pointFor(index, value);
                    return <circle key={ieqDimensions[index].key} cx={x} cy={y} r={3.5} fill="var(--forest)" />;
                  })}
                </motion.g>

                {ieqDimensions.map((dimension, index) => {
                  const angle = angleFor(index);
                  const x = RADAR.cx + Math.cos(angle) * LABEL_RADIUS;
                  const y = RADAR.cy + Math.sin(angle) * LABEL_RADIUS;
                  const anchor = Math.cos(angle) > 0.2 ? 'start' : Math.cos(angle) < -0.2 ? 'end' : 'middle';
                  return (
                    <text
                      key={dimension.key}
                      x={x}
                      y={y}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      fontSize="12"
                      fill="var(--graphite)"
                    >
                      {dimension.short}
                    </text>
                  );
                })}
              </svg>

              <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
                {ieqDimensions.map((dimension) => (
                  <li
                    key={dimension.key}
                    className="rounded-card border border-stone bg-paper px-2.5 py-2 text-center"
                  >
                    <span className="block truncate type-meta text-graphite-soft">
                      {dimension.short}
                    </span>
                    <span className="mt-0.5 block font-mono text-xs tabular-nums text-graphite">
                      {dimension.baseline.toFixed(2)}
                      <span aria-hidden="true"> → </span>
                      <span className="sr-only"> to </span>
                      <span className="font-semibold">{dimension.proposed.toFixed(2)}</span>
                    </span>
                    <span className="block font-mono text-[11px] font-medium text-forest-deep">
                      +{dimension.changePct.toFixed(1)}%
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <table className="sr-only">
          <caption>Mean ratings before and after the proposed intervention, out of five</caption>
          <thead>
            <tr>
              <th scope="col">Dimension</th>
              <th scope="col">Current baseline</th>
              <th scope="col">Proposed environment</th>
              <th scope="col">Change</th>
            </tr>
          </thead>
          <tbody>
            {ieqDimensions.map((dimension) => (
              <tr key={dimension.key}>
                <th scope="row">{dimension.label}</th>
                <td>{dimension.baseline.toFixed(2)}</td>
                <td>{dimension.proposed.toFixed(2)}</td>
                <td>+{dimension.changePct.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}
