import React from 'react';
import { Star } from 'lucide-react';
import { AiMatchBadge } from './AiMatchBadge';

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  aiMatch: number;
  /** Symptoms this specialist is matched against. Drives the recommendation copy. */
  symptomTags: string[];
  image: string;
  availabilityStatus: 'green' | 'yellow';
  /** Mobile reference shows a single specialty+experience line. */
  mobileTitle: string;
  /** Mobile reference shows distance instead of the recommendation box. */
  distance: string;
  /**
   * Framing for the portrait so the subject fills the avatar box the way the
   * reference crops do. Our photographs are not the reference photographs, so
   * only the framing can be matched, not the backdrop.
   */
  imageScale?: number;
  imageFocusY?: number;
}

interface SpecialistCardProps {
  specialist: Specialist;
  /** Recommendation copy derived from the patient's current symptom list. */
  recommendation: string;
  onBookAppointment?: (docName: string) => void;
  onViewProfile?: (docName: string) => void;
}

const AVAILABILITY_LABEL: Record<Specialist['availabilityStatus'], string> = {
  green: 'Available today',
  yellow: 'Limited availability',
};

export const SpecialistCard: React.FC<SpecialistCardProps> = ({
  specialist,
  recommendation,
  onBookAppointment,
  onViewProfile,
}) => {
  return (
    /*
      `h-[415px]` became `min-h-[415px]`: the card has a fixed-height design but
      hard-clipped any content that grew (long names, longer recommendation
      copy). Grid placement in RecommendedSpecialists keeps cards in a row
      equal-height, so the fixed height is no longer load-bearing.
    */
    <div className="relative w-full min-h-[415px] bg-white rounded-[17.75px] p-[14.2px] border border-[#C7C4D7] shadow-[0_3.55px_17.75px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden">

      {/* DOCTOR PROFILE PORTRAIT & INFO */}
      {/*
        Reference (desktop, 4x): card box y=497..911, AI Match badge y=511..532,
        avatar y=533..618 — the avatar begins exactly where the badge ends.
        The badge is laid out in normal flow rather than absolutely positioned,
        so it can never overlap the avatar at any card width (the old absolute
        badge overlapped it by 36x15px at every viewport).
      */}
      <div className="flex flex-col items-center">
        <div className="w-full flex justify-end">
          <AiMatchBadge percentage={specialist.aiMatch} />
        </div>
        {/* DOCTOR IMAGE CONTAINER WITH AVAILABILITY STATUS DOT */}
        <div className="relative w-[85.18px] h-[85.18px] mb-3 shrink-0">
          {/* Inner wrapper clips the framing transform; the status dot sits
              outside it so it is never cropped. */}
          <div className="w-full h-full rounded-[14.2px] overflow-hidden bg-slate-100">
            <img
              src={specialist.image}
              alt={specialist.name}
              width={85}
              height={85}
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
          {/* Status Dot — colour plus a screen-reader-only text equivalent */}
          {/* Reference renders a ring (white centre + coloured stroke), not a
              solid dot: white background, 3.55px white outer edge, 3px colour. */}
          <span
            className={`absolute -bottom-1 -right-1 w-[21.3px] h-[21.3px] rounded-full bg-white border-[3.55px] border-white ring-[3px] ring-inset shadow-xs ${
              specialist.availabilityStatus === 'green' ? 'ring-[#22C55E]' : 'ring-[#EAB308]'
            }`}
          >
            <span className="sr-only">
              {AVAILABILITY_LABEL[specialist.availabilityStatus]}
            </span>
          </span>
        </div>

        {/* DOCTOR NAME — wraps instead of being clipped by the card */}
        <h3 className="font-inter font-bold text-[17.75px] leading-[24.84px] text-[#0B1C30] text-center text-balance break-words w-full">
          {specialist.name}
        </h3>

        {/* SPECIALTY */}
        <p className="font-manrope font-bold text-[12.42px] leading-[17.75px] text-[#9246D4] text-center mt-0.5">
          {specialist.specialty}
        </p>

        {/* RATING & EXPERIENCE */}
        <div className="flex items-center justify-center gap-3.5 my-2">
          <div className="flex items-center gap-1">
            <Star className="w-[17.75px] h-[16.86px] fill-[#F59E0B] text-[#F59E0B] shrink-0" />
            <span className="font-manrope font-bold text-[14.20px] leading-[21.30px] text-[#0B1C30]">
              {specialist.rating.toFixed(1)}
            </span>
            <span className="sr-only">out of 5</span>
          </div>
          <span className="text-slate-300" aria-hidden="true">|</span>
          <span className="font-manrope font-medium text-[14.20px] leading-[21.30px] text-[#464554]">
            {specialist.experience}
          </span>
        </div>

        {/* RECOMMENDATION BOX */}
        {/* Reference puts this box 228px below the card top; `my-1` left it at 222.3. */}
        <div className="w-full bg-[#F0E5FF] rounded-[14.2px] px-[18px] py-[10.65px] flex items-center justify-center min-h-[57.3px] mt-[10px] mb-1">
          <p className="font-manrope font-normal text-[12.42px] leading-[17.75px] text-[#464554] text-center">
            {recommendation}
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS STACK */}
      <div className="flex flex-col gap-2.5 w-full pt-2">
        {/* VIEW PROFILE BUTTON */}
        <button
          type="button"
          onClick={() => onViewProfile && onViewProfile(specialist.name)}
          aria-label={`View profile for ${specialist.name}`}
          className="w-full h-[46.84px] rounded-[14.2px] border-[1.77px] border-[#9246D4] bg-white hover:bg-purple-50 text-[#9246D4] font-manrope font-bold text-[14.20px] leading-[21.30px] flex items-center justify-center transition-colors cursor-pointer"
        >
          View Profile
        </button>

        {/* BOOK APPOINTMENT BUTTON */}
        <button
          type="button"
          onClick={() => onBookAppointment && onBookAppointment(specialist.name)}
          aria-label={`Book appointment with ${specialist.name}`}
          style={{
            background: 'linear-gradient(92deg, #6B38D4 0%, #6B38D4 100%)',
          }}
          className="w-full min-h-[44px] h-[44px] rounded-[14.2px] text-white hover:opacity-95 font-manrope font-bold text-[14.20px] leading-[21.30px] flex items-center justify-center transition-transform active:scale-[0.98] cursor-pointer shadow-xs"
        >
          Book Appointment
        </button>
      </div>

    </div>
  );
};
