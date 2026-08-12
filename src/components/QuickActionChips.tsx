import React from 'react';
import { 
  Activity, 
  Calendar, 
  UserCheck, 
  FileText, 
  Pill, 
  HeartHandshake 
} from 'lucide-react';

export interface QuickActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
  row: 1 | 2;
}

interface QuickActionChipsProps {
  onSelectAction: (prompt: string) => void;
}

export const quickActionsData: QuickActionItem[] = [
  {
    id: 'check-symptoms',
    label: 'CHECK SYMPTOMS',
    icon: <Activity className="w-3.5 h-3.5 text-slate-700 stroke-[2.2]" />,
    prompt: 'I would like help checking my symptoms.',
    row: 1,
  },
  {
    id: 'book-appointment',
    label: 'BOOK APPOINTMENT',
    icon: <Calendar className="w-3.5 h-3.5 text-slate-700 stroke-[2.2]" />,
    prompt: 'I would like to book an appointment with a specialist.',
    row: 1,
  },
  {
    id: 'find-specialist',
    label: 'FIND SPECIALIST',
    icon: <UserCheck className="w-3.5 h-3.5 text-slate-700 stroke-[2.2]" />,
    prompt: 'Help me find the right specialist for my health concern.',
    row: 1,
  },
  {
    id: 'review-labs',
    label: 'REVIEW LAB RESULTS',
    icon: <FileText className="w-3.5 h-3.5 text-slate-700 stroke-[2.2]" />,
    prompt: 'I would like to review my recent lab results.',
    row: 1,
  },
  {
    id: 'medication-review',
    label: 'MEDICATION REVIEW',
    icon: <Pill className="w-3.5 h-3.5 text-slate-700 stroke-[2.2]" />,
    prompt: 'I would like to review my active medications and dosages.',
    row: 2,
  },
  {
    id: 'mental-health',
    label: 'MENTAL HEALTH SUPPORT',
    icon: <HeartHandshake className="w-3.5 h-3.5 text-slate-700 stroke-[2.2]" />,
    prompt: 'I need mental health support and guidance.',
    row: 2,
  },
];

export const QuickActionChips: React.FC<QuickActionChipsProps> = ({ onSelectAction }) => {
  const row1Actions = quickActionsData.filter(item => item.row === 1);
  const row2Actions = quickActionsData.filter(item => item.row === 2);

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 sm:mt-5 space-y-2.5 relative z-10 flex flex-col items-center">
      
      {/* ROW 1 CHIPS */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {row1Actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onSelectAction(action.prompt)}
            className="bg-white hover:bg-purple-50/80 border border-slate-200/80 hover:border-purple-300 text-slate-700 hover:text-purple-800 font-bold text-[10px] sm:text-[11px] tracking-wider uppercase px-3.5 sm:px-4 py-2 rounded-xl shadow-xs transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95 hover:shadow-sm"
          >
            {action.icon}
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* ROW 2 CHIPS */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {row2Actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onSelectAction(action.prompt)}
            className="bg-white hover:bg-purple-50/80 border border-slate-200/80 hover:border-purple-300 text-slate-700 hover:text-purple-800 font-bold text-[10px] sm:text-[11px] tracking-wider uppercase px-3.5 sm:px-4 py-2 rounded-xl shadow-xs transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95 hover:shadow-sm"
          >
            {action.icon}
            <span>{action.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
};

