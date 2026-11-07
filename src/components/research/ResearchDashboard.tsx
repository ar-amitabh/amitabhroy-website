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
    valueClass: 'text-graphite',
    icon: Users,
    iconClass: 'text-forest-deep',
  },
  {
    label: 'Baseline IEQ mean',
    value: surveyMeta.baselineMean,
    decimals: 2,
    prefix: '',
    suffix: '',
    sub: 'current workplace, of 5.00',
    valueClass: 'text-graphite',
    icon: Activity,
    iconClass: 'text-graphite-soft',
  },
  {
    label: 'Proposed IEQ mean',
    value: surveyMeta.proposedMean,
    decimals: 2,
    prefix: '',
    suffix: '',
    sub: `+${surveyMeta.meanGain}% against baseline`,
    valueClass: 'text-forest-deep',
    icon: TrendingUp,
    iconClass: 'text-forest',
  },
  {
    label: 'Perceived productivity',
    value: surveyMeta.productivityGain,
    decimals: 1,
    prefix: '+',
    suffix: '%',
    sub: 'expected growth',
    valueClass: 'text-terracotta-deep',
    icon: TrendingUp,
    iconClass: 'text-terracotta-deep',
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-card border border-stone bg-paper-raised p-6 sm:p-8"
      >
        <div className="relative">
          <p className="type-meta text-forest-deep">Empirical Field Evidence</p>
          <h2
            id="field-evidence-heading"
            className="mt-2 max-w-3xl type-h2 text-graphite"
          >
            What thirty IT professionals told us about their workplace
          </h2>
          <p className="mt-3 max-w-3xl type-body text-graphite-soft">
            Indoor environmental quality, ergonomic comfort and perceived productivity were rated for the
            workplace as it is today and for the human-centred environment proposed at Rangpur Hi-Tech
            Park. The results became the architectural brief and the evidence base for the thesis’s 18
            Design Attributes Framework.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="tag-pill inline-flex items-center gap-1.5">
              <Database size={12} className="text-forest-deep" aria-hidden="true" />
              Verified field dataset · n = 30
            </span>
            <span className="tag-pill inline-flex items-center gap-1.5">
              <MapPin size={12} className="text-forest-deep" aria-hidden="true" />
              {surveyMeta.location}
            </span>
            <span className="tag-pill inline-flex items-center gap-1.5">
              <Activity size={12} className="text-forest-deep" aria-hidden="true" />
              5-point Likert scale
            </span>
          </div>
        </div>
      </motion.div>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: 0.06 * index }}
              className="rounded-card border border-stone bg-paper-raised p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="type-meta text-graphite-soft">
                  {kpi.label}
                </p>
                <Icon size={15} className={kpi.iconClass} aria-hidden="true" />
              </div>
              <p className={`mt-2 font-serif text-3xl sm:text-4xl tabular-nums ${kpi.valueClass}`}>
                <AnimatedNumber
                  value={kpi.value}
                  decimals={kpi.decimals}
                  prefix={kpi.prefix}
                  suffix={kpi.suffix}
                />
                {kpi.decimals === 2 && (
                  <span className="ml-1 hidden font-mono text-xs font-normal text-graphite-soft sm:inline">/ 5.00</span>
                )}
              </p>
              <p className="mt-1 type-caption text-graphite-soft">{kpi.sub}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 type-meta text-graphite-soft">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-flex h-2 w-2 rounded-full bg-forest" />
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
          tone="green"
          insight={
            <>
              <strong className="font-semibold text-graphite">Software engineering and QA make up half the sample</strong>{' '}
              — 15 of 30 respondents. With analysts, technical build and systems roles reach 70%, so
              acoustic focus and screen comfort dominate the brief.
            </>
          }
        >
          <RankedBars rows={roleRows} max={roleMax} from="var(--forest)" to="var(--sage)" />
        </ChartCard>

        <PriorityDonut />

        <IeqComparison className="lg:col-span-2" />

        <div className="space-y-6">
          <HealthSymptoms />

          <div className="rounded-card border border-stone bg-paper-raised p-5 sm:p-6">
            <p className="type-meta text-forest-deep">
              Method note
            </p>
            <div className="mt-3 space-y-2.5 type-caption text-graphite-soft">
              <p>
                A structured questionnaire was administered to 30 IT / ITES professionals in desk-based
                roles. Respondents rated the current workplace and the proposed environment on six
                five-point dimensions, reported symptom frequency, and ranked three spatial preferences.
              </p>
              <p>
                Ratings are descriptive. They indicate perceived conditions rather than measured
                environmental performance; the criteria below set the targets that post-occupancy
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
              <strong className="font-semibold text-graphite">Outdoor courtyards, ergonomic furniture and breakout areas lead.</strong>{' '}
              Occupants ask for restorative space and better equipment ahead of more floor area.
            </>
          }
        >
          <RankedBars rows={preferenceRows} max={preferenceMax} from="var(--terracotta-deep)" to="var(--terracotta)" showRank />
        </ChartCard>
      </div>

      <BriefMatrix />

      <SpatialTranslation />
    </section>
  );
}
