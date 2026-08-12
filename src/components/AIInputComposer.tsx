import React, { useRef } from 'react';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';

interface AIInputComposerProps {
  message: string;
  onChangeMessage: (value: string) => void;
  onSubmit: () => void;
  isAnalyzing?: boolean;
}

export const doctorAvatars = [
  {
    name: "Dr. Marcus Vance",
    role: "Cardiologist",
    url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Elena Rostova",
    role: "Neurologist",
    url: "https://images.unsplash.com/photo-1594824813566-7885a3964670?w=150&auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Sarah Chen",
    role: "Endocrinologist",
    url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
  }
];

export const AIInputComposer: React.FC<AIInputComposerProps> = ({
  message,
  onChangeMessage,
  onSubmit,
  isAnalyzing = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 relative z-10">
      {/* MAIN CONTAINER FRAME WITH LIGHT BACKGROUND & ROUNDED CORNERS */}
      <div className="bg-[#F7F6FC]/90 rounded-[28px] p-2.5 sm:p-3 border border-purple-100/60 shadow-xl shadow-purple-950/5">
        
        {/* TOP BAR: SPECIALIST AVAILABILITY */}
        <div className="px-3 py-2 flex items-center justify-between flex-wrap gap-2 mb-1.5">
          
          {/* Left: Doctor Avatars + 37 SPECIALISTS AVAILABLE */}
          <div className="flex items-center space-x-3">
            {/* Overlapping Doctor Avatars */}
            <div className="flex items-center -space-x-2">
              {doctorAvatars.map((doc, idx) => (
                <img
                  key={idx}
                  src={doc.url}
                  alt={doc.name}
                  title={`${doc.name} - ${doc.role}`}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover shadow-xs"
                />
              ))}
            </div>

            {/* Availability Text */}
            <span className="text-[11px] sm:text-xs font-extrabold text-[#10B981] tracking-wider uppercase">
              37 SPECIALISTS AVAILABLE
            </span>
          </div>

          {/* Right: Wait Time Indicator */}
          <div className="text-xs font-medium text-slate-500">
            As soon as <span className="font-bold text-slate-800">15 min</span>
          </div>

        </div>

        {/* WHITE AI INPUT BOX WITH PURPLE BORDER */}
        <div className="bg-white rounded-[24px] border-2 border-[#C4B5FD] p-5 sm:p-6 shadow-sm relative flex flex-col justify-between min-h-[170px] sm:min-h-[200px] transition-all focus-within:border-[#A78BFA] focus-within:ring-2 focus-within:ring-purple-200/50">
          
          {/* Text Area Input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => onChangeMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What would you like help with today?"
            className="w-full bg-transparent resize-none focus:outline-none text-slate-800 text-base sm:text-lg placeholder:text-slate-400 placeholder:font-normal font-medium leading-relaxed min-h-[100px] sm:min-h-[120px]"
          />

          {/* BOTTOM BAR INSIDE COMPOSER */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-3">
            
            {/* Bottom Left: HIPAA Privacy Label */}
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Lock className="w-3.5 h-3.5 stroke-[2.2] text-slate-400" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                HIPAA COMPLIANT | PRIVATE & SECURE
              </span>
            </div>

            {/* Bottom Right: Start AI Analysis Button */}
            <button
              onClick={onSubmit}
              disabled={isAnalyzing || !message.trim()}
              className="bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#6366F1] hover:from-[#5B21B6] hover:to-[#4F46E5] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full flex items-center gap-2.5 shadow-md shadow-purple-600/25 hover:shadow-lg hover:shadow-purple-600/35 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Start AI Analysis</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

