import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MobileSpecialistCard } from './MobileSpecialistCard';
import { specialistsData } from '../RecommendedSpecialists';
import { matchedSpecialistsHeading } from '../../data/aiSuggestionData';

interface MatchedSpecialistsProps {
  onViewProfile?: (docName: string) => void;
}

/**
 * Mobile "Matched Specialists" list. The reference shows the same three
 * specialists stacked vertically with previous/next controls; the fourth card
 * visible in the reference is the list repeating as it scrolls, so only the
 * three unique specialists are rendered here.
 *
 * The arrows step focus/scroll through the stack rather than paginating, which
 * keeps every card reachable by scroll and by keyboard.
 */
export const MatchedSpecialists: React.FC<MatchedSpecialistsProps> = ({ onViewProfile }) => {
  const [index, setIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(specialistsData.length - 1, next));
    setIndex(clamped);
    itemRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section aria-labelledby="m-matched-heading" className="flex flex-col gap-[17px]">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h2
            id="m-matched-heading"
            className="font-manrope font-extrabold text-[17px] leading-[22px] tracking-[-0.3px] text-[#0B1C30]"
          >
            {matchedSpecialistsHeading.title}
          </h2>
          <p className="font-manrope text-[12px] leading-[18px] text-[#3F4655] mt-1">
            {matchedSpecialistsHeading.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-center">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous specialist"
            className="relative w-[30px] h-[30px] rounded-full border border-slate-300 text-[#0B1C30] flex items-center justify-center transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer after:absolute after:-inset-[7px] after:content-['']"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === specialistsData.length - 1}
            aria-label="Next specialist"
            className="relative w-[30px] h-[30px] rounded-full border border-slate-300 text-[#0B1C30] flex items-center justify-center transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer after:absolute after:-inset-[7px] after:content-['']"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul className="flex flex-col gap-[31px] list-none p-0 m-0">
        {specialistsData.map((specialist, i) => (
          <li
            key={specialist.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
          >
            <MobileSpecialistCard specialist={specialist} onViewProfile={onViewProfile} />
          </li>
        ))}
      </ul>
    </section>
  );
};
