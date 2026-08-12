import React from 'react';
import { ChooseDoctorButton } from './ChooseDoctorButton';
import heroDoctorImg from '../assets/images/hero_doctor.jpg';

interface AiHealthHeaderProps {
  onChooseDoctor?: () => void;
}

export const AiHealthHeader: React.FC<AiHealthHeaderProps> = ({ onChooseDoctor }) => {
  return (
    <div className="w-full max-w-[1347px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 my-4">
      
      {/* PURPLE HERO BANNER (Frame 2147226305) */}
      <div 
        className="relative w-full max-w-[515px] h-[121px] rounded-[36.67px] pl-[24.93px] pr-[12.96px] py-[19.43px] flex items-center justify-between overflow-hidden shadow-lg shrink-0"
        style={{
          background: 'linear-gradient(102deg, #B18CFF 0%, #5C24FF 100%)',
        }}
      >
        {/* Banner Text Left */}
        <div className="z-10 flex flex-col justify-center max-w-[310px]">
          <h1 className="font-sora font-bold text-[27px] text-white leading-[49.87px] tracking-[-1.14px] whitespace-nowrap">
            AI Health Analysis
          </h1>
          <p className="font-sora font-normal text-[15px] text-[#F6F6F6] leading-[28.42px] whitespace-nowrap">
            Diagnostic Scan ID: #882-AI-V4
          </p>
        </div>

        {/* Hero Doctor Image Overlay (GettyImages-1497103569_resize-removebg-preview 1) */}
        <div className="absolute right-0 bottom-0 top-0 w-[150px] h-[122px] flex items-end justify-end pointer-events-none z-0">
          <img
            src={heroDoctorImg}
            alt="AI Diagnostic Scan Doctor"
            className="w-[149.6px] h-[121.7px] object-cover object-top filter drop-shadow-md rounded-br-[36.67px]"
          />
        </div>
      </div>

      {/* CHOOSE DOCTOR BUTTON ON RIGHT */}
      <div className="flex items-center justify-end">
        <ChooseDoctorButton onClick={onChooseDoctor} />
      </div>

    </div>
  );
};
