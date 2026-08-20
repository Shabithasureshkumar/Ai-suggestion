import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Specialist } from '../SpecialistCard';

interface MobileSpecialistCardProps {
  specialist: Specialist;
  onViewProfile?: (docName: string) => void;
}

const AVAILABILITY_LABEL: Record<Specialist['availabilityStatus'], string> = {
  green: 'Available today',
  yellow: 'Limited availability',
};

/**
 * Mobile specialist card. Deliberately NOT the desktop card: the mobile
 * reference has no recommendation box and no Book Appointment button, uses a
 * left-aligned avatar with the AI Match pill beside it, and shows distance
 * instead of years of experience.
 *
 * Reference (440 wide): card 385x336 at x=28, 30px padding, 78px avatar,
 * full-width 58px View Profile button in #E2E4FF.
 */
export const MobileSpecialistCard: React.FC<MobileSpecialistCardProps> = ({
  specialist,
  onViewProfile,
}) => (
  <article className="bg-white rounded-[24px] shadow-[0_6px_24px_rgba(16,24,40,0.08)] border border-slate-100 p-[30px] min-h-[336px] flex flex-col">
    <div className="flex items-start gap-4">
      <div className="relative shrink-0">
        <div className="w-[78px] h-[78px] rounded-[16px] overflow-hidden bg-slate-100 ring-2 ring-[#E2E4FF]">
          <img
            src={specialist.image}
            alt={specialist.name}
            width={78}
            height={78}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.visibility = 'hidden';
            }}
            style={{
              transform: `scale(${specialist.imageScale ?? 1})`,
              objectPosition: `50% ${specialist.imageFocusY ?? 50}%`,
            }}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="sr-only">{AVAILABILITY_LABEL[specialist.availabilityStatus]}</span>
      </div>

      <span className="mt-1.5 px-4 py-[7px] rounded-full bg-[#F1ECFB] font-manrope font-extrabold text-[17px] leading-[20px] text-[#4648D4]">
        AI Match: {specialist.aiMatch}%
      </span>
    </div>

    <h3 className="mt-6 font-manrope font-medium text-[22px] leading-[28px] text-[#131B2E] break-words">
      {specialist.name}
    </h3>
    <p className="mt-1 font-manrope font-bold text-[16px] leading-[21px] text-[#3F4655]">
      {specialist.mobileTitle}
    </p>

    <div className="mt-3 flex items-center gap-3 flex-wrap">
      <span className="inline-flex items-center gap-1.5">
        <Star className="w-[17px] h-[17px] fill-[#F5B700] text-[#F5B700] shrink-0" aria-hidden="true" />
        <span className="font-manrope font-bold text-[16px] leading-[21px] text-[#131B2E]">
          {specialist.rating.toFixed(1)}
        </span>
        <span className="sr-only">out of 5</span>
      </span>
      <span className="inline-flex items-center gap-1.5 font-manrope text-[15px] leading-[20px] text-[#3F4655]">
        <MapPin className="w-[15px] h-[15px] shrink-0" aria-hidden="true" />
        {specialist.distance}
      </span>
    </div>

    <button
      type="button"
      onClick={() => onViewProfile && onViewProfile(specialist.name)}
      aria-label={`View profile for ${specialist.name}`}
      className="mt-6 w-full min-h-[56px] rounded-[16px] bg-[#E2E4FF] hover:bg-[#d6d9ff] text-[#131B2E] font-manrope font-medium text-[19px] leading-[24px] flex items-center justify-center transition-colors active:scale-[0.99] cursor-pointer"
    >
      View Profile
    </button>
  </article>
);
