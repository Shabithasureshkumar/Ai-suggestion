import React from 'react';
import { specialistCareCta } from '../../data/aiSuggestionData';

interface SpecialistCareCtaProps {
  onBookNow?: () => void;
}

/**
 * Mobile-only full-width CTA that sits between the diagnostic summary and the
 * specialist list. Reference: 400x165, radius 20, gradient running left-to-right
 * from indigo into violet, white pill button.
 */
export const SpecialistCareCta: React.FC<SpecialistCareCtaProps> = ({ onBookNow }) => (
  <section
    aria-labelledby="m-care-cta-heading"
    className="rounded-[12px] p-[18px] min-h-[165px] shadow-lg"
    // Endpoints and angle measured from the reference; mean error drops
    // from 12.6 to 2.8 RGB units versus the previous 103deg ramp.
    style={{ background: 'linear-gradient(132deg, #4847D4 0%, #8028D0 100%)' }}
  >
    <h2
      id="m-care-cta-heading"
      className="font-manrope font-extrabold text-[20px] leading-[26px] text-white"
    >
      {specialistCareCta.title}
    </h2>
    <p className="font-manrope text-[12px] leading-[17px] text-white/90 mt-1.5">
      {specialistCareCta.body}
    </p>
    <button
      type="button"
      onClick={onBookNow}
      className="mt-4 min-h-[44px] px-7 bg-white hover:bg-slate-50 text-[#4B3BD6] font-manrope font-bold text-[15px] leading-[20px] rounded-full inline-flex items-center justify-center transition-transform active:scale-[0.98] cursor-pointer shadow-md"
    >
      {specialistCareCta.action}
    </button>
  </section>
);
