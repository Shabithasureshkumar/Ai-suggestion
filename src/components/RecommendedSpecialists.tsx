import React from 'react';
import { SpecialistCard, Specialist } from './SpecialistCard';
import { ChevronRight } from 'lucide-react';
import sarahJenkinsImg from '../assets/images/sarah_jenkins.jpg';
import marcusThorneImg from '../assets/images/marcus_thorne.jpg';
import elenaRodriguezImg from '../assets/images/elena_rodriguez.jpg';

interface RecommendedSpecialistsProps {
  /** The patient's current symptom list, owned by AiSuggestionPage. */
  symptoms: string[];
  onBookSpecialist?: (docName: string) => void;
  onViewProfile?: (docName: string) => void;
  onViewAll?: () => void;
}

export const specialistsData: Specialist[] = [
  {
    id: 'sarah-jenkins',
    name: 'Dr. Sarah Jenkins',
    specialty: 'Cardiologist',
    rating: 4.9,
    experience: '12 yrs Exp',
    aiMatch: 98,
    symptomTags: ['Chest Pain', 'Breathlessness'],
    image: sarahJenkinsImg,
    availabilityStatus: 'green',
    mobileTitle: 'Senior Cardiologist • 12Y Exp',
    distance: '1.2 miles away',
    imageScale: 1.3,
    imageFocusY: 26,
  },
  {
    id: 'marcus-thorne',
    name: 'Dr. Marcus Thorne',
    specialty: 'Pulmonologist',
    rating: 4.8,
    experience: '15 yrs Exp',
    aiMatch: 95,
    symptomTags: ['Breathlessness', 'Fatigue'],
    image: marcusThorneImg,
    availabilityStatus: 'green',
    mobileTitle: 'Interventional Cardiology',
    distance: '2.5 miles away',
    imageScale: 1.3,
    imageFocusY: 22,
  },
  {
    id: 'elena-rodriguez',
    name: 'Dr. Elena Rodriguez',
    specialty: 'Cardiologist',
    rating: 5.0,
    experience: '10 yrs Exp',
    aiMatch: 92,
    symptomTags: ['Chest Pain'],
    image: elenaRodriguezImg,
    availabilityStatus: 'yellow',
    mobileTitle: 'Diagnostic Cardiology',
    distance: '0.8 miles away',
    imageScale: 1,
    imageFocusY: 40,
  },
];

/** "A", "A and B", "A, B and C" */
const formatList = (items: string[]): string => {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
};

/**
 * Deterministic mapping only: intersects the specialist's own tags with the
 * symptoms currently on the page. No medical inference is performed, and a
 * neutral fallback is used when there is no overlap.
 */
export const buildRecommendation = (
  specialist: Specialist,
  symptoms: string[]
): string => {
  const matched = specialist.symptomTags.filter((tag) => symptoms.includes(tag));
  if (matched.length === 0) {
    return `"Available for ${specialist.specialty.toLowerCase()} consultation"`;
  }
  return `"Recommended for ${formatList(matched)}"`;
};

export const RecommendedSpecialists: React.FC<RecommendedSpecialistsProps> = ({
  symptoms,
  onBookSpecialist,
  onViewProfile,
  onViewAll,
}) => {
  return (
    <div className="w-full max-w-[851px] flex flex-col gap-[28px]">

      {/*
        SECTION HEADER ROW
        `h-[36px]` became `min-h-[36px]` plus wrapping: the H2 needs two lines
        below ~448px and was overflowing its fixed-height container, collapsing
        the gap to the cards. `gap-x-4 gap-y-2` guarantees View All can never sit
        flush against the heading.
      */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 min-h-[36px]">
        <h2 className="font-manrope font-bold text-[28px] leading-[35.49px] tracking-[-0.57px] text-[#0B1C30]">
          Recommended Specialists
        </h2>

        <button
          type="button"
          onClick={onViewAll}
          /* 44px hit area via ::after so the 36px header row height from the
             reference is preserved (min-h-[44px] pushed the card row down 7px). */
          className="relative inline-flex items-center gap-[3.55px] text-[#4648D4] hover:text-[#5C24FF] font-manrope font-bold text-[14.20px] leading-[21.30px] transition-colors cursor-pointer after:absolute after:-inset-y-[12px] after:-inset-x-2 after:content-['']"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
        </button>
      </div>

      {/*
        SPECIALIST CARDS
        Auto-fit grid instead of a `sm:flex-row` of fixed 269px cards. The row
        previously demanded 851px from 640px upward and pushed cards off-screen.
        With `minmax(240px, 1fr)` the track count adapts to the column width, the
        cards use the width available on mobile, and at the 851px desktop column
        the tracks resolve to 268.9px each — the original card width.
      */}
      <div className="grid gap-[22.18px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] w-full">
        {specialistsData.map((specialist) => (
          <SpecialistCard
            key={specialist.id}
            specialist={specialist}
            recommendation={buildRecommendation(specialist, symptoms)}
            onBookAppointment={onBookSpecialist}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>

    </div>
  );
};
