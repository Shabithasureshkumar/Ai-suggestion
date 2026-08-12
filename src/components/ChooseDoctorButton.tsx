import React from 'react';
import { UserPlus } from 'lucide-react';

interface ChooseDoctorButtonProps {
  onClick?: () => void;
}

export const ChooseDoctorButton: React.FC<ChooseDoctorButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'linear-gradient(180deg, #AB83FD 0%, #5C24FF 100%)',
      }}
      className="w-[182.5px] h-[45.4px] rounded-full hover:opacity-95 text-white font-sora font-bold text-[14.48px] tracking-[0.21px] flex items-center justify-center gap-2 shadow-[0_1.46px_2.93px_-1.46px_rgba(0,0,0,0.1),0_2.93px_4.39px_-0.73px_rgba(0,0,0,0.1)] transition-all active:scale-95 cursor-pointer shrink-0"
    >
      <UserPlus className="w-[14.4px] h-[16.5px] text-white stroke-[2.2]" />
      <span>Choose Doctor</span>
    </button>
  );
};
