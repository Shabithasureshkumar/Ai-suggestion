import React from 'react';
import { Video } from 'lucide-react';

interface VirtualClinicCardProps {
  onLaunchClinic?: () => void;
}

export const VirtualClinicCard: React.FC<VirtualClinicCardProps> = ({ onLaunchClinic }) => {
  return (
    <div 
      style={{
        background: 'linear-gradient(103deg, #4648D4 0%, #6B38D4 100%)',
      }}
      className="relative w-full max-w-[436px] min-h-[220px] rounded-[20px] p-8 flex flex-col justify-between overflow-hidden shadow-lg shrink-0"
    >
      {/* ABSTRACT GEOMETRIC WATERMARK ARTWORK IN LOWER-RIGHT */}
      <div 
        aria-hidden="true"
        className="absolute right-[-20px] bottom-[-20px] w-[198px] h-[198px] opacity-10 rotate-[12deg] pointer-events-none flex items-center justify-center text-white"
      >
        <div className="w-[166px] h-[166px] border-[14px] border-white rounded-[36px] flex items-center justify-center">
          <Video className="w-20 h-20 text-white fill-white" />
        </div>
      </div>

      {/* CONTENT STACK */}
      <div className="z-10 flex flex-col gap-2">
        <h3 className="font-manrope font-bold text-[20px] leading-[28px] text-white">
          Ready to start your consultation?
        </h3>
        <p className="font-manrope font-normal text-[14px] leading-[20px] text-white/90 max-w-[364px] mb-4">
          Connect with our top specialists within minutes via high-definition video call or secure chat.
        </p>
      </div>

      {/* LAUNCH VIRTUAL CLINIC BUTTON */}
      <div className="z-10">
        <button
          onClick={onLaunchClinic}
          className="h-[48px] px-8 bg-white hover:bg-slate-50 text-[#4648D4] font-manrope font-bold text-[16px] leading-[24px] rounded-[16px] flex items-center justify-center transition-transform active:scale-[0.98] cursor-pointer shadow-md"
        >
          Launch Virtual Clinic
        </button>
      </div>

    </div>
  );
};
