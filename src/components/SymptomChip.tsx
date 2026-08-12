import React from 'react';
import { X } from 'lucide-react';

interface SymptomChipProps {
  label: string;
  onRemove?: () => void;
}

export const SymptomChip: React.FC<SymptomChipProps> = ({ label, onRemove }) => {
  return (
    <div className="h-[40px] px-4 py-2 bg-[#F5F3FF] border border-[#E1E0FF] rounded-full inline-flex items-center gap-2 transition-all hover:bg-[#ede9fe] shrink-0 select-none">
      <span className="font-manrope font-normal text-[14px] leading-[20px] text-[#4648D4]">
        {label}
      </span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="w-4 h-4 rounded-full flex items-center justify-center text-[#4648D4] hover:bg-[#E1E0FF] transition-colors cursor-pointer"
          aria-label={`Remove ${label}`}
        >
          <X className="w-3.5 h-3.5 stroke-[2.2]" />
        </button>
      )}
    </div>
  );
};
