import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BottomContinuationMessageProps {
  onOpenPasteModal: () => void;
}

export const BottomContinuationMessage: React.FC<BottomContinuationMessageProps> = ({
  onOpenPasteModal,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6 mb-2 text-center relative z-10">
      <button
        onClick={onOpenPasteModal}
        className="inline-flex items-center gap-1.5 text-[#7C3AED] hover:text-[#5B21B6] font-semibold text-xs sm:text-sm transition-colors group cursor-pointer"
      >
        <span>Already spoke with another AI? Paste your conversation and we'll continue from there.</span>
        <ArrowRight className="w-4 h-4 text-[#7C3AED] group-hover:translate-x-1 transition-transform stroke-[2.5]" />
      </button>
    </div>
  );
};

