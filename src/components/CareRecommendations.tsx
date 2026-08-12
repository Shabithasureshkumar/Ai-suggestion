import React from 'react';
import { AlertCircle, Calendar, CheckSquare, Sparkles, ArrowRight, ShieldAlert, Clock, Bell } from 'lucide-react';
import { HealthAccordion } from './HealthAccordion';
import { careRecommendationsData } from '../data/mockHealthData';

interface CareRecommendationsProps {
  onOpenAva: (context?: string) => void;
}

export const CareRecommendations: React.FC<CareRecommendationsProps> = ({ onOpenAva }) => {
  const getPriorityBadgeStyle = (priority: string) => {
    switch (priority) {
      case 'Important':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Recommended':
        return 'bg-brand-100 text-brand-800 border-brand-300';
      case 'Upcoming':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Important':
        return <ShieldAlert className="w-4 h-4 text-amber-600" />;
      case 'Recommended':
        return <Sparkles className="w-4 h-4 text-brand-600" />;
      case 'Upcoming':
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <HealthAccordion
      icon={<AlertCircle className="w-5.5 h-5.5 text-brand-600" />}
      title="Care Gaps & Recommendations"
      subtitle="2 items due soon."
      badgeText="2 Action Items Due"
      badgeColor="warning"
      defaultOpen={false}
    >
      <div className="space-y-4 pt-2">
        
        {/* Action Priority Cards */}
        <div className="space-y-3">
          {careRecommendationsData.map((rec) => (
            <div 
              key={rec.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-100/90 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider flex items-center gap-1.5 ${getPriorityBadgeStyle(rec.priority)}`}>
                    {getPriorityIcon(rec.priority)}
                    {rec.priority} Priority
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {rec.dueDate}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">
                  {rec.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {rec.description}
                </p>
              </div>

              {/* Quick Action Button */}
              <div className="shrink-0 flex items-center space-x-2">
                <button 
                  onClick={() => onOpenAva(`How do I complete the action: ${rec.title}?`)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm flex items-center space-x-1.5"
                >
                  <span>{rec.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-3.5 rounded-2xl bg-brand-50/60 border border-brand-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-brand-600" />
            <span>Automated reminders are active for upcoming clinical recommendations.</span>
          </div>
          <button 
            onClick={() => onOpenAva("Can you generate a summary of my preventive care plan?")}
            className="font-bold text-brand-700 hover:underline shrink-0"
          >
            Ask Ava to summarize care plan
          </button>
        </div>

      </div>
    </HealthAccordion>
  );
};
