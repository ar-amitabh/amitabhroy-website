import { motion } from 'framer-motion';
import { Activity, Database, MapPin, TrendingUp, Users } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';
import ChartCard from './ChartCard';
import RankedBars from './RankedBars';
import PriorityDonut from './PriorityDonut';
import IeqComparison from './IeqComparison';
import HealthSymptoms from './HealthSymptoms';
import BriefMatrix from './BriefMatrix';
import SpatialTranslation from './SpatialTranslation';
import { jobRoles, preferences, surveyMeta, totalPreferenceSelections } from '../../data/thesisSurvey';

const kpis = [
  {
    label: 'Sample size',
    value: surveyMeta.sampleSize,
    decimals: 0,
    prefix: '',
    suffix: '',
    sub: 'IT / ITES professionals',
    valueClass: 'text-[#F9FAFB]',
    icon: Users,
    iconClass: 'text-[#7DD3FC]',
  },
  {
    label: 'Baseline IEQ mean',
    value: surveyMeta.baselineMean,
    decimals: 2,
    prefix: '',
    suffix: '',
    sub: 'current workplace, of 5.00',
    valueClass: 'text-[#F9FAFB]',
    icon: Activity,
    iconClass: 'text-[#94A3B8]',
  },
  {
    label: 'Proposed IEQ mean',
    value: surveyMeta.proposedMean,
    decimals: 2,
    prefix: '',
    suffix: '',
    sub: `+${surveyMeta.meanGain}% against baseline`,
    valueClass: 'text-[#86EFAC]',
    icon: TrendingUp,
    iconClass: 'text-[#22C55E]',
  },
  {
    label: 'Perceived productivity',
    value: surveyMeta.productivityGain,
    decimals: 1,
    prefix: '+',
    suffix: '%',
    sub: 'expected growth',
    valueClass: 'text-[#FCD34D]',
    icon: TrendingUp,
    iconClass: 'text-[#F59E0B]',
  },
];

const roleRows = jobRoles.map((role) => ({
  label: role.label,
  value: role.count,
  meta: `${((role.count / surveyMeta.sampleSize) * 100).toFixed(1)}%`,
}));

const roleMax = Math.max(...jobRoles.map((role) => role.count));

const preferenceRows = preferences.map((preference) => ({
  label: preference.label,
  value: preference.count,
  meta: 'picks',
}));

const preferenceMax = Math.max(...preferences.map((preference) => preference.count));

export default function ResearchDashboard() {
  return (
    <section id="field-evidence" aria-labelledby="field-evidence-heading" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-[#111827] via-[#0E1626] to-[#0B1120] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] sm:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#22C55E]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#22C55E]/60 to-transparent"
        />

        <div className="relative">
          <h2
            id="field-evidence-heading"
            className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-[#F9FAFB] sm:text-3xl"
          >
            What thirty IT professionals told us about their workplace
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#AEBAC9]">
            Indoor environmental quality, ergonomic comfort and perceived productivity were rated for the
            workplace as it is today and for the human-centred environment proposed at Rangpur Hi-Tech
            Park. The results became the architectural brief and the evidence base for the thesis’s 18
            Design Attributes Framework.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22C55E]/25 bg-[#22C55E]/[0.08] px-3 py-1 text-[10px] font-medium text-[#C7F9D8]">
              <Database size={12} className="text-[#22C55E]" aria-hidden="true" />
              Verified field dataset · n = 30
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-white/[0.04] px-3 py-1 text-[10px] font-medium text-[#C9D2DE]">
              <MapPin size={12} className="text-[#94A3B8]" aria-hidden="true" />
              {surveyMeta.location}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-white/[0.04] px-3 py-1 text-[10px] font-medium text-[#C9D2DE]">
              <Activity size={12} className="text-[#94A3B8]" aria-hidden="true" />
              5-point Likert scale
            </span>
          </div>
        </div>
      </motion.div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: 0.08 * index }}
              className="rounded-xl border border-gray-800 bg-[#0B1120] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8A96A8]">
                  {kpi.label}
                </p>
                <Icon size={15} className={kpi.iconClass} aria-hidden="true" />
              </div>
              <p className={`mt-2 font-mono text-2xl font-semibold tabular-nums sm:text-[26px] ${kpi.valueClass}`}>
                <AnimatedNumber
                  value={kpi.value}
                  decimals={kpi.decimals}
                  prefix={kpi.prefix}
                  suffix={kpi.suffix}
                />
                {kpi.decimals === 2 && (
                  <span className="ml-1 hidden font-sans text-[10px] font-normal text-[#94A3B8] sm:inline">/ 5.00</span>
                )}
              </p>
              <p className="mt-1 text-[10px] text-[#8A96A8]">{kpi.sub}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#94A3B8]">
        <span className="flex items-center gap-1.5 text-[#8A96A8]">
          <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
          </span>
          Field dataset
        </span>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <span>30 responses</span>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <span>{jobRoles.length} role groups · collected {surveyMeta.year}</span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
        <ChartCard
          title="Who took part"
          description="Distribution of desk-bound technical roles across the surveyed IT / ITES teams."
          badge="Demographics"
          tone="blue"
          insight={
            <>
              <strong className="font-semibold text-[#E5E7EB]">Software engineering and QA make up half the sample</strong>{' '}
              — 15 of 30 respondents. With analysts, technical build and systems roles reach 70%, so
              acoustic focus and screen comfort dominate the brief.
            </>
          }
        >
          <RankedBars rows={roleRows} max={roleMax} from="#0EA5E9" to="#38BDF8" />
        </ChartCard>

        <PriorityDonut />

        <IeqComparison className="lg:col-span-2" />

        <div className="space-y-6">
          <HealthSymptoms />

          <div className="rounded-2xl border border-gray-800 bg-[#0B1120] p-5 sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#22C55E]">
              Method note
            </p>
            <div className="mt-3 space-y-2 text-xs leading-relaxed text-[#94A3B8]">
              <p>
                A structured questionnaire was administered to 30 IT / ITES professionals in desk-based
                roles. Respondents rated the current workplace and the proposed environment on six
                five-point dimensions, reported symptom frequency, and ranked three spatial preferences.
              </p>
              <p>
                Ratings are descriptive. They indicate perceived conditions rather than measured
                environmental performance; the criteria above set the targets that post-occupancy
                monitoring can verify.
              </p>
            </div>
          </div>
        </div>

        <ChartCard
          title="What occupants want more of"
          description={`Every respondent placed three choices, giving ${totalPreferenceSelections} selections across the feature list.`}
          badge="Preferences"
          tone="teal"
          insight={
            <>
              <strong className="font-semibold text-[#E5E7EB]">Outdoor courtyards, ergonomic furniture and breakout areas lead.</strong>{' '}
              Occupants ask for restorative space and better equipment ahead of more floor area.
            </>
          }
        >
          <RankedBars rows={preferenceRows} max={preferenceMax} from="#0D9488" to="#2DD4BF" showRank />
        </ChartCard>
      </div>

      <BriefMatrix />

      <SpatialTranslation />
    </section>
  );
}
