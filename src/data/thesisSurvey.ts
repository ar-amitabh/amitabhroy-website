/**
 * Field survey data for the B.Arch thesis "Human-Centred Work Environment for
 * Rangpur Hi-Tech Park". Single source of truth for the /research dashboard.
 *
 * All ratings use a 5-point Likert scale (1 = very low, 5 = very high).
 * Percentages are the rounded values reported in the thesis (Chapter 5).
 *
 * Note: the per-dimension change figures are the percentages reported in the
 * thesis, not values recomputed from the rounded means. Recomputing from the
 * two-decimal means drifts by up to 0.3 points (for example 38.6% vs 38.9%),
 * so the reported figure is stored explicitly.
 */

export const surveyMeta = {
  studyTitle: 'Human-centred workplace assessment',
  site: 'Rangpur Hi-Tech Park',
  location: 'Rangpur, Bangladesh',
  year: '2024',
  chapter: 'Chapter 5',
  sampleSize: 30,
  scaleMax: 5,
  baselineMean: 3.12,
  proposedMean: 4.07,
  /** Rounded mean uplift across the six rated dimensions. */
  meanGain: 30.4,
  /** Expected growth in perceived productivity. */
  productivityGain: 21.9,
} as const;

export const pctChange = (from: number, to: number) => ((to - from) / from) * 100;

export type JobRole = {
  label: string;
  count: number;
};

/** Aggregated role groups, largest first, as reported in Figure 5.1. */
export const jobRoles: JobRole[] = [
  { label: 'Software engineer / developer', count: 10 },
  { label: 'Data / systems analyst', count: 6 },
  { label: 'QA engineer', count: 5 },
  { label: 'Project manager', count: 4 },
  { label: 'UI / UX designer', count: 3 },
  { label: 'Web developer', count: 2 },
];

export type Priority = {
  label: string;
  count: number;
  color: string;
};

export const priorities: Priority[] = [
  { label: 'Views of greenery', count: 8, color: 'var(--forest)' },
  { label: 'Ventilation & temperature', count: 8, color: 'var(--sage)' },
  { label: 'Ergonomic furniture', count: 5, color: 'var(--terracotta)' },
  { label: 'Quiet focus zones', count: 3, color: 'var(--terracotta-deep)' },
  { label: 'Breakout & rest areas', count: 3, color: 'var(--blush)' },
  { label: 'Greenery & daylight', count: 3, color: 'var(--stone)' },
];

/**
 * Share choosing greenery or ventilation as their single most important
 * intervention. Sum of the two rounded 26.7% shares, as reported in the thesis.
 */
export const combinedPriorityShare = 53.4;

export type IeqDimension = {
  key: string;
  label: string;
  short: string;
  baseline: number;
  proposed: number;
  /** Change reported in the thesis, in percent. */
  changePct: number;
};

export const ieqDimensions: IeqDimension[] = [
  { key: 'physical', label: 'Physical comfort', short: 'Physical', baseline: 3.0, proposed: 3.97, changePct: 32.2 },
  { key: 'ergonomic', label: 'Ergonomic comfort', short: 'Ergonomic', baseline: 3.2, proposed: 4.07, changePct: 27.1 },
  { key: 'light', label: 'Light & ventilation', short: 'Light & vent.', baseline: 2.93, proposed: 4.07, changePct: 38.6 },
  { key: 'focus', label: 'Concentration', short: 'Focus', baseline: 3.13, proposed: 4.17, changePct: 33.0 },
  { key: 'mental', label: 'Mental comfort', short: 'Mental', baseline: 3.23, proposed: 4.13, changePct: 27.8 },
  { key: 'productivity', label: 'Perceived productivity', short: 'Productivity', baseline: 3.2, proposed: 3.9, changePct: 21.9 },
];

export const healthFrequencies = ['Never', 'Rarely', 'Sometimes', 'Often', 'Daily'] as const;

export const healthColors = [
  'var(--sage)',
  'var(--forest)',
  'var(--blush)',
  'var(--terracotta)',
  'var(--terracotta-deep)',
];

export type HealthSymptom = {
  label: string;
  short: string;
  values: number[];
};

export const healthSymptoms: HealthSymptom[] = [
  { label: 'Back & neck discomfort', short: 'Back / neck', values: [6.7, 6.7, 40, 33.3, 13.3] },
  { label: 'Eye strain', short: 'Eye strain', values: [0, 20, 36.7, 20, 23.3] },
  { label: 'Work stress', short: 'Stress', values: [3.3, 20, 33.3, 40, 3.3] },
];

/** Share reporting the symptom "sometimes", "often" or "daily". */
export const atLeastSometimes = (symptom: HealthSymptom) =>
  symptom.values.slice(2).reduce((sum, value) => sum + value, 0);

/** Share reporting the symptom "often" or "daily". */
export const atLeastOften = (symptom: HealthSymptom) =>
  symptom.values.slice(3).reduce((sum, value) => sum + value, 0);

export type Preference = {
  label: string;
  count: number;
};

/** Each respondent placed three preferences, so the total is 90 selections. */
export const preferences: Preference[] = [
  { label: 'Outdoor courtyard', count: 12 },
  { label: 'Ergonomic furniture', count: 12 },
  { label: 'Breakout areas', count: 11 },
  { label: 'Quiet focus rooms', count: 9 },
  { label: 'Indoor plants', count: 9 },
  { label: 'Collaboration spaces', count: 9 },
  { label: 'Temperature control', count: 8 },
  { label: 'Natural ventilation', count: 7 },
  { label: 'Views of nature', count: 7 },
  { label: 'Natural daylight', count: 6 },
];

export const totalPreferenceSelections = preferences.reduce((sum, item) => sum + item.count, 0);

export type Gap = 'Critical' | 'High' | 'Moderate';

export type BriefRow = {
  dimension: string;
  baseline: number;
  target: number;
  /** Change reported in the thesis, in percent. */
  gain: number;
  gap: Gap;
  strategy: string;
  criteria: string[];
};

export const briefMatrix: BriefRow[] = [
  {
    dimension: 'Light, air & greenery',
    baseline: 2.93,
    target: 4.07,
    gain: 38.6,
    gap: 'Critical',
    strategy:
      'Orient the building envelope on the east–west axis and thread daylight atria and shaded micro-courtyards through the plan.',
    criteria: [
      'Daylight factor above 2.5% in occupied zones',
      'Exterior shading louvers on exposed glazing',
      'Cross-ventilation to every workstation cluster',
    ],
  },
  {
    dimension: 'Physical & postural comfort',
    baseline: 3.0,
    target: 3.97,
    gain: 32.2,
    gap: 'High',
    strategy:
      'Specify height-adjustable sit–stand desks and task seating, with generous personal clearance between work settings.',
    criteria: [
      'Minimum 6 m² of floor area per workstation',
      'Clearance above 1.5 m behind seated users',
      'Ergonomic certification for all task furniture',
    ],
  },
  {
    dimension: 'Concentration & acoustics',
    baseline: 3.13,
    target: 4.17,
    gain: 33.0,
    gap: 'High',
    strategy:
      'Separate active collaboration zones from quiet focus pods, with three to five focus booths on every floor.',
    criteria: [
      'Party-wall acoustic rating of STC 45 or higher',
      'Ceiling sound baffles with NRC ≥ 0.85',
      'Focus pods kept outside primary circulation',
    ],
  },
  {
    dimension: 'Mental comfort & rest',
    baseline: 3.23,
    target: 4.13,
    gain: 27.8,
    gap: 'Moderate',
    strategy:
      'Design shaded outdoor terraces and biophilic rest lounges that look onto planting rather than back-of-house areas.',
    criteria: [
      'Sightline to greenery within 15 m of every desk',
      'Shaded breakout terraces on each level',
      'Rest areas screened from workstations',
    ],
  },
];
