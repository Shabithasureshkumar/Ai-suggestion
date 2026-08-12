import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export const AuraHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto pt-2 sm:pt-4">
      
      {/* PURPLE CIRCULAR ROBOT / AI ICON CONTAINER */}
      <div className="relative">
        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#6366F1] flex items-center justify-center text-white shadow-lg shadow-purple-500/25 ring-4 ring-purple-100/80 transition-transform duration-300 hover:scale-105">
          <Bot className="w-7 h-7 text-white stroke-[2.2]" />
        </div>
      </div>

      {/* AURA AI CONCIERGE PILL */}
      <div className="mt-3">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-[11px] sm:text-xs font-bold text-[#7C3AED] bg-[#F2EEFE] border border-purple-200/60 shadow-xs tracking-tight">
          Aura AI Concierge
        </span>
      </div>

      {/* MAIN HEADING */}
      <h1 className="mt-3.5 text-3xl sm:text-4xl font-extrabold text-[#1E1B4B] tracking-tight leading-tight">
        How are you feeling today?
      </h1>

      {/* SUBHEADING */}
      <p className="mt-2 text-sm sm:text-base font-medium text-slate-500 max-w-lg mx-auto leading-relaxed">
        I’ll help you find the right specialist based on what you're experiencing.
      </p>

      {/* AI INTRO FLOATING TEXT COMPOSITION MATCHING FIGMA */}
      <div className="mt-5 flex items-start justify-center gap-2.5 max-w-xl mx-auto text-left px-2">
        <Sparkles className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5 fill-[#7C3AED]/20 stroke-[2]" />
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          Hi, I'm <span className="text-[#7C3AED] font-bold">Aura</span>. Tell me what you're dealing with and I'll help you understand your symptoms, recommend the right specialist, estimate wait times, and connect you with a doctor today.
        </p>
      </div>

    </div>
  );
};

