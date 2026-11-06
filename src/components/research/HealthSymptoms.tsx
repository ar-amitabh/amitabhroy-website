import { motion, useReducedMotion } from 'framer-motion';
import ChartCard from './ChartCard';
import {
  atLeastOften,
  atLeastSometimes,
  healthColors,
  healthFrequencies,
  healthSymptoms,
} from '../../data/thesisSurvey';

export default function HealthSymptoms() {
  const reduceMotion = useReducedMotion();
  const ranked = [...healthSymptoms].sort((a, b) => atLeastSometimes(b) - atLeastSometimes(a));
  const worst = ranked[0];
  const eyeStrain = healthSymptoms.find((symptom) => symptom.short === 'Eye strain') ?? ranked[1];

  return (
    <ChartCard
      title="How often discomfort shows up"
      description="Frequency of physical symptoms during a typical working week, as a share of all respondents."
      badge="Wellbeing"
      tone="rose"
      insight={
        <>
          <strong className="font-semibold text-[#E5E7EB]">{worst.label} is the most widespread</strong> —{' '}
          {atLeastSometimes(worst).toFixed(1)}% report it at least “sometimes” and{' '}
          {atLeastOften(worst).toFixed(1)}% often or daily. Eye strain follows at{' '}
          {atLeastSometimes(eyeStrain).toFixed(1)}%, with {eyeStrain.values[4].toFixed(1)}% experiencing it
          daily.
        </>
      }
    >
      <ul className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-[#AEBAC9]">
        {healthFrequencies.map((frequency, index) => (
          <li key={frequency} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-[2px]"
              style={{ backgroundColor: healthColors[index] }}
            />
            {frequency}
          </li>
        ))}
      </ul>

      <div className="space-y-5">
        {healthSymptoms.map((symptom, symptomIndex) => {
          const total = symptom.values.reduce((sum, value) => sum + value, 0);
          const risk = atLeastSometimes(symptom);
          return (
            <div key={symptom.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[13px] text-[#DCE3EC]">{symptom.label}</span>
                <span className="shrink-0 text-[10px] text-[#94A3B8]">
                  <strong className="font-mono text-xs font-semibold tabular-nums text-[#F9FAFB]">
                    {risk.toFixed(1)}%
                  </strong>{' '}
                  at least sometimes
                </span>
              </div>
              <div
                aria-hidden="true"
                className="mt-2 flex h-3 overflow-hidden rounded-full bg-white/[0.06]"
              >
                {symptom.values.map((value, index) => (
                  <motion.div
                    key={healthFrequencies[index]}
                    className="h-full first:rounded-l-full last:rounded-r-full"
                    style={{ backgroundColor: healthColors[index] }}
                    initial={reduceMotion ? false : { width: 0 }}
                    whileInView={{ width: `${(value / total) * 100}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + symptomIndex * 0.08 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    title={`${healthFrequencies[index]}: ${value}%`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <table className="sr-only">
        <caption>Share of respondents reporting each symptom frequency, in percent</caption>
        <thead>
          <tr>
            <th scope="col">Symptom</th>
            {healthFrequencies.map((frequency) => (
              <th key={frequency} scope="col">
                {frequency}
              </th>
            ))}
            <th scope="col">At least sometimes</th>
          </tr>
        </thead>
        <tbody>
          {healthSymptoms.map((symptom) => (
            <tr key={symptom.label}>
              <th scope="row">{symptom.label}</th>
              {symptom.values.map((value, index) => (
                <td key={healthFrequencies[index]}>{value}%</td>
              ))}
              <td>{atLeastSometimes(symptom).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ChartCard>
  );
}
