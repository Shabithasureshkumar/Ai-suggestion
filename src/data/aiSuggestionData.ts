/**
 * Content for the AI Suggestion screen's mobile diagnostic summary.
 * Values are transcribed from the mobile design reference.
 */

export interface LikelyCondition {
  id: string;
  label: string;
  probability: number;
  /** Dot colour used in the reference for this row. */
  dotColor: string;
}

export const aiConfidence = {
  score: 92,
  description: 'High precision match with current health metrics and history.',
};

export const urgency = {
  /** Position of the filled portion of the scale, 0-100. */
  level: 62,
  riskLabel: 'Medium Risk',
  scale: ['Low', 'Moderate', 'High'] as const,
  note: 'Action recommended within 24 hours.',
};

export const likelyConditions: LikelyCondition[] = [
  { id: 'hypertension', label: 'Hypertension', probability: 88, dotColor: '#E5484D' },
  { id: 'cardiac-stress', label: 'Cardiac Stress', probability: 74, dotColor: '#8B5CF6' },
  { id: 'anxiety', label: 'Anxiety', probability: 42, dotColor: '#6366F1' },
];

export const whyCardiology = {
  title: 'Why Cardiologist?',
  body:
    'Analysis of your vitals and reported symptoms shows anomalies in heart rate variability consistent with early-stage cardiac fatigue.',
};

export const specialistCareCta = {
  title: 'Recommended Specialist Care',
  body:
    "Our AI analysis suggests you should speak with a specialist. We've identified matching cardiologists with immediate availability.",
  action: 'Book Now',
};

export const matchedSpecialistsHeading = {
  title: 'Matched Specialists',
  subtitle: 'Top doctors matched by AI Score and Patient Ratings',
};
