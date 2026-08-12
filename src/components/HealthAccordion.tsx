import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface HealthAccordionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badgeText?: string;
  badgeColor?: 'normal' | 'warning' | 'purple';
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export const HealthAccordion: React.FC<HealthAccordionProps> = ({
  icon,
  title,
  subtitle,
  badgeText,
  badgeColor = 'purple',
  defaultOpen = false,
  children
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const getBadgeStyle = () => {
    switch (badgeColor) {
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'normal':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'purple':
      default:
        return 'bg-brand-50 text-brand-700 border-brand-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-brand-100/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      
      {/* Accordion Header Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-brand-50/20 transition-colors group"
      >
        <div className="flex items-center space-x-4 min-w-0">
          
          {/* Section Icon Container */}
          <div className="w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200/60 shrink-0 group-hover:scale-105 transition-transform">
            {icon}
          </div>

          {/* Title & Subtitle */}
          <div className="truncate">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-brand-700 transition-colors">
                {title}
              </h3>
              {badgeText && (
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${getBadgeStyle()}`}>
                  {badgeText}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-500 truncate mt-0.5">
              {subtitle}
            </p>
          </div>

        </div>

        {/* Chevron open/close trigger */}
        <div className="flex items-center space-x-3 shrink-0">
          <span className="text-xs font-semibold text-slate-400 group-hover:text-brand-600 hidden sm:inline">
            {isOpen ? 'Collapse' : 'Expand Details'}
          </span>
          <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-brand-100 group-hover:text-brand-700 transition-all duration-300 ${
            isOpen ? 'rotate-180 bg-brand-100 text-brand-700' : ''
          }`}>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

      </button>

      {/* Accordion Expanded Content */}
      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-100 animate-fadeIn">
          {children}
        </div>
      )}

    </div>
  );
};
