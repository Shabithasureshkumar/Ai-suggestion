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
  recommendation: string;
  image: string;
  availabilityStatus: 'green' | 'yellow';
}

interface SpecialistCardProps {
  specialist: Specialist;
  onBookAppointment?: (docName: string) => void;
  onViewProfile?: (docName: string) => void;
}

export const SpecialistCard: React.FC<SpecialistCardProps> = ({
  specialist,
  onBookAppointment,
  onViewProfile,
}) => {
  return (
    <div className="relative w-full max-w-[269px] h-[415px] bg-white rounded-[17.75px] p-[14.2px] border border-[#C7C4D7] shadow-[0_3.55px_17.75px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden shrink-0">
      
      {/* TOP AI MATCH BADGE POSITIONED TOP RIGHT */}
      <div className="absolute top-[14.2px] right-[14.2px] z-10">
        <AiMatchBadge percentage={specialist.aiMatch} />
      </div>

      {/* DOCTOR PROFILE PORTRAIT & INFO */}
      <div className="flex flex-col items-center pt-2">
        {/* DOCTOR IMAGE CONTAINER WITH AVAILABILITY STATUS DOT */}
        <div className="relative w-[85.18px] h-[85.18px] mb-3">
          <img
            src={specialist.image}
            alt={specialist.name}
            className="w-[85.18px] h-[85.18px] rounded-[14.2px] object-cover"
          />
          {/* Status Dot */}
          <span
            className={`absolute -bottom-1 -right-1 w-[21.3px] h-[21.3px] rounded-full border-[3.55px] border-white shadow-xs ${
              specialist.availabilityStatus === 'green' ? 'bg-[#22C55E]' : 'bg-[#EAB308]'
            }`}
          />
        </div>

        {/* DOCTOR NAME */}
        <h3 className="font-inter font-bold text-[17.75px] leading-[24.84px] text-[#0B1C30] text-center whitespace-nowrap">
          {specialist.name}
        </h3>

        {/* SPECIALTY */}
        <p className="font-manrope font-bold text-[12.42px] leading-[17.75px] text-[#9246D4] text-center mt-0.5">
          {specialist.specialty}
        </p>

        {/* RATING & EXPERIENCE */}
        <div className="flex items-center justify-center gap-3.5 my-2">
          <div className="flex items-center gap-1">
            <Star className="w-[17.75px] h-[16.86px] fill-[#F59E0B] text-[#F59E0B]" />
            <span className="font-manrope font-bold text-[14.20px] leading-[21.30px] text-[#0B1C30]">
              {specialist.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="font-manrope font-medium text-[14.20px] leading-[21.30px] text-[#464554]">
            {specialist.experience}
          </span>
        </div>

        {/* RECOMMENDATION BOX */}
        <div className="w-full bg-[#F0E5FF] rounded-[14.2px] px-[18px] py-[10.65px] flex items-center justify-center min-h-[57.3px] my-1">
          <p className="font-manrope font-normal text-[12.42px] leading-[17.75px] text-[#464554] text-center">
            {specialist.recommendation}
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS STACK */}
      <div className="flex flex-col gap-2.5 w-full pt-2">
        {/* VIEW PROFILE BUTTON */}
        <button
          onClick={() => onViewProfile && onViewProfile(specialist.name)}
          className="w-full h-[46.84px] rounded-[14.2px] border-[1.77px] border-[#9246D4] bg-white hover:bg-purple-50 text-[#9246D4] font-manrope font-bold text-[14.20px] leading-[21.30px] flex items-center justify-center transition-colors cursor-pointer"
        >
          View Profile
        </button>

        {/* BOOK APPOINTMENT BUTTON */}
        <button
          onClick={() => onBookAppointment && onBookAppointment(specialist.name)}
          style={{
            background: 'linear-gradient(92deg, #6B38D4 0%, #6B38D4 100%)',
          }}
          className="w-full h-[43.30px] rounded-[14.2px] text-white hover:opacity-95 font-manrope font-bold text-[14.20px] leading-[21.30px] flex items-center justify-center transition-transform active:scale-[0.98] cursor-pointer shadow-xs"
        >
          Book Appointment
        </button>
      </div>

    </div>
  );
};
