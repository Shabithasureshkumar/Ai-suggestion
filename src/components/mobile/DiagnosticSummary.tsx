import React from 'react';
import { Activity } from 'lucide-react';
import {
  aiConfidence,
  urgency,
  likelyConditions,
  whyCardiology,
} from '../../data/aiSuggestionData';
import cardioHeartImg from '../../assets/images/cardio_heart.jpg';

interface DiagnosticSummaryProps {
  symptoms: string[];
}

/** Shared card chrome measured from the mobile reference (white, 1px lilac hairline). */
const CARD = 'bg-white border border-[#EDE9FE] rounded-[16px] shadow-[0_4px_16px_rgba(16,24,40,0.05)]';

const SymptomsCard: React.FC<{ symptoms: string[] }> = ({ symptoms }) => (
  <section aria-labelledby="m-symptoms-heading" className={`${CARD} p-3 flex flex-col gap-2`}>
    <div className="flex items-center gap-1.5">
      <Activity className="w-3.5 h-3.5 text-[#5C24FF] stroke-[2.5]" aria-hidden="true" />
      <h2
        id="m-symptoms-heading"
        className="font-manrope font-bold text-[10px] leading-[13px] tracking-[0.8px] text-[#0B1C30] uppercase"
      >
        Symptoms
      </h2>
    </div>

    {symptoms.length === 0 ? (
      <p className="font-manrope text-[11px] leading-[15px] text-[#464554]">
        No symptoms recorded yet.
      </p>
    ) : (
      <ul className="flex flex-wrap gap-[7px]">
        {symptoms.map((s) => (
          <li
            key={s}
            className="px-2.5 py-1 bg-[#EDEDFB] rounded-full font-manrope font-semibold text-[12px] leading-[16px] text-[#4648D4]"
          >
            {s}
          </li>
        ))}
      </ul>
    )}
  </section>
);

const AiConfidenceCard: React.FC = () => {
  const r = 17;
  const circumference = 2 * Math.PI * r;
  const dash = (aiConfidence.score / 100) * circumference;

  return (
    <section aria-labelledby="m-confidence-heading" className={`${CARD} p-3 flex items-center gap-2.5`}>
      <div className="relative w-[40px] h-[40px] shrink-0">
        <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90" aria-hidden="true">
          <circle cx="20" cy="20" r={r} fill="none" stroke="#EDEDFB" strokeWidth="3" />
          <circle
            cx="20"
            cy="20"
            r={r}
            fill="none"
            stroke="#4648D4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference - dash}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-manrope font-bold text-[11px] text-[#4648D4]">
          {aiConfidence.score}%
        </span>
      </div>

      <div className="min-w-0">
        <h2
          id="m-confidence-heading"
          className="font-manrope font-bold text-[12px] leading-[16px] text-[#0B1C30]"
        >
          AI Confidence
        </h2>
        <p className="font-manrope text-[11px] leading-[14px] text-[#464554] mt-0.5">
          {aiConfidence.description}
        </p>
      </div>
    </section>
  );
};

const UrgencyCard: React.FC = () => (
  <section aria-labelledby="m-urgency-heading" className={`${CARD} px-3 py-2 flex flex-col gap-2`}>
    <div className="flex items-center justify-between gap-3">
      <h2
        id="m-urgency-heading"
        className="font-manrope font-bold text-[15px] leading-[20px] text-[#0B1C30]"
      >
        Urgency
      </h2>
      <span className="px-2.5 py-1 rounded-full bg-[#EDEDFB] font-manrope font-semibold text-[10px] leading-[13px] text-[#4648D4] shrink-0">
        {urgency.riskLabel}
      </span>
    </div>

    <div>
      {/* Track + fill. `role=img` gives assistive tech the value without a control. */}
      <div
        className="h-[7px] w-full rounded-full bg-[#E4E8FB] overflow-hidden"
        role="img"
        aria-label={`Urgency: ${urgency.riskLabel}. ${urgency.note}`}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${urgency.level}%`,
            background: 'linear-gradient(90deg, #FBBF24 0%, #F97316 100%)',
          }}
        />
      </div>
      <div className="mt-1 flex items-center justify-between font-manrope text-[10px] leading-[13px] text-[#464554]">
        {urgency.scale.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>

    <p className="font-manrope text-[11px] leading-[14px] text-[#464554]">{urgency.note}</p>
  </section>
);

const LikelyConditionsCard: React.FC = () => (
  <section aria-labelledby="m-conditions-heading" className={`${CARD} p-3 flex flex-col gap-2.5`}>
    <h2
      id="m-conditions-heading"
      className="font-manrope font-bold text-[13px] leading-[18px] text-[#0B1C30]"
    >
      Likely Conditions
    </h2>
    <ul className="flex flex-col gap-[7px]">
      {likelyConditions.map((c) => (
        <li
          key={c.id}
          className="flex items-center gap-2 bg-[#DBE7FE] rounded-[8px] px-2.5 py-[2px]"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: c.dotColor }}
            aria-hidden="true"
          />
          <span className="font-manrope font-semibold text-[11px] leading-[16px] text-[#0B1C30] min-w-0 truncate">
            {c.label}
          </span>
          <span className="ml-auto font-manrope text-[9px] leading-[14px] text-[#464554] shrink-0">
            {c.probability}% Probability
          </span>
        </li>
      ))}
    </ul>
  </section>
);

const WhyCardiologyCard: React.FC = () => (
  <section
    aria-labelledby="m-why-heading"
    className="relative rounded-[16px] overflow-hidden bg-[#EEF0F6] flex items-end"
  >
    <img
      src={cardioHeartImg}
      alt=""
      aria-hidden="true"
      width={300}
      height={396}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="relative m-2 max-w-[94%] rounded-[10px] bg-white/85 backdrop-blur-sm p-2">
      <h2
        id="m-why-heading"
        className="font-manrope font-bold text-[12px] leading-[16px] text-[#0B1C30]"
      >
        {whyCardiology.title}
      </h2>
      <p className="font-manrope text-[9px] leading-[12px] text-[#464554] mt-1">
        {whyCardiology.body}
      </p>
    </div>
  </section>
);

/**
 * Mobile-only diagnostic summary. The desktop reference does not contain these
 * cards; the mobile reference places them between the hero and the specialist
 * CTA in two 2-up rows separated by the full-width Urgency card.
 */
export const DiagnosticSummary: React.FC<DiagnosticSummaryProps> = ({ symptoms }) => (
  /* Reference @440 vertical rhythm: row1 231..340, urgency 351..443,
     row2 471..602 — i.e. gaps of 11 and 28, not a uniform gap. */
  <div className="flex flex-col">
    <div className="grid grid-cols-2 gap-3 items-stretch min-h-[109px]">
      <SymptomsCard symptoms={symptoms} />
      <AiConfidenceCard />
    </div>

    <div className="mt-[11px]">
      <UrgencyCard />
    </div>

    <div className="mt-[28px] grid grid-cols-2 gap-3 items-stretch min-h-[131px]">
      <LikelyConditionsCard />
      <WhyCardiologyCard />
    </div>
  </div>
);
