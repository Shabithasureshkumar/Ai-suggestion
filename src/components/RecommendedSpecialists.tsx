import React from 'react';
import { SpecialistCard, Specialist } from './SpecialistCard';
import { ChevronRight } from 'lucide-react';
import sarahJenkinsImg from '../assets/images/sarah_jenkins.jpg';
import marcusThorneImg from '../assets/images/marcus_thorne.jpg';
import elenaRodriguezImg from '../assets/images/elena_rodriguez.jpg';

interface RecommendedSpecialistsProps {
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
    recommendation: '"Recommended for Chest Pain and Breathlessness"',
    image: sarahJenkinsImg,
    availabilityStatus: 'green',
  },
  {
    id: 'marcus-thorne',
    name: 'Dr. Marcus Thorne',
    specialty: 'Pulmonologist',
    rating: 4.8,
    experience: '15 yrs Exp',
    aiMatch: 95,
    recommendation: '"Recommended for Breathlessness and Fatigue"',
    image: marcusThorneImg,
    availabilityStatus: 'green',
  },
  {
    id: 'elena-rodriguez',
    name: 'Dr. Elena Rodriguez',
    specialty: 'Cardiologist',
    rating: 5.0,
    experience: '10 yrs Exp',
    aiMatch: 92,
    recommendation: '"Recommended for Chest Pain"',
    image: elenaRodriguezImg,
    availabilityStatus: 'yellow',
  },
];

export const RecommendedSpecialists: React.FC<RecommendedSpecialistsProps> = ({
  onBookSpecialist,
  onViewProfile,
  onViewAll,
}) => {
  return (
    <div className="w-full max-w-[851px] flex flex-col gap-[28px]">
      
      {/* SECTION HEADER ROW */}
      <div className="flex items-center justify-between h-[36px]">
        <h2 className="font-manrope font-bold text-[28px] leading-[35.49px] tracking-[-0.57px] text-[#0B1C30]">
          Recommended Specialists
        </h2>

        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-[3.55px] text-[#4648D4] hover:text-[#5C24FF] font-manrope font-bold text-[14.20px] leading-[21.30px] transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* SPECIALIST CARDS ROW */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-[22.18px] w-full">
        {specialistsData.map((specialist) => (
          <SpecialistCard
            key={specialist.id}
            specialist={specialist}
            onBookAppointment={onBookSpecialist}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>

    </div>
  );
};
