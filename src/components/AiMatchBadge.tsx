import React from 'react';
import { Zap } from 'lucide-react';

interface AiMatchBadgeProps {
  percentage: number;
}

export const AiMatchBadge: React.FC<AiMatchBadgeProps> = ({ percentage }) => {
  return (
    <div className="inline-flex items-center gap-1 px-[10.65px] py-[3.55px] bg-[#6B38D4]/10 rounded-full select-none">
      <Zap className="w-3 h-3 text-[#6B38D4] fill-[#6B38D4]" />
      <span className="font-manrope font-bold text-[10.65px] leading-[14.2px] tracking-[0.53px] text-[#6B38D4]">
        {percentage}% AI Match
      </span>
    </div>
  );
};
