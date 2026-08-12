import React, { useState } from 'react';
import { HeartPulse, SlidersHorizontal, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { VitalItem } from '../types/health';
import { VitalCard } from './VitalCard';

interface VitalsGridProps {
  vitals: VitalItem[];
  onSelectVital: (vital: VitalItem) => void;
}

export const VitalsGrid: React.FC<VitalsGridProps> = ({ vitals, onSelectVital }) => {
  const [filter, setFilter] = useState<'all' | 'alert'>('all');
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('7d');
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredVitals = vitals.filter(v => {
    if (filter === 'alert') return v.severity === 'elevated' || v.severity === 'warning';
    return true;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100/90 shadow-sm transition-all">
      
      {/* Header Bar - Original exact title & subtitle text */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200/60">
            <HeartPulse className="w-5.5 h-5.5 text-brand-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Key Vitals & Trends
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-100 text-brand-700 rounded-full uppercase">
                {vitals.length} Active Sensors
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
              BP down 15%, HR steady, weight stable.
            </p>
          </div>
        </div>

        {/* Filter Controls & Toggle Accordion */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All Vitals ({vitals.length})
            </button>
            <button
              onClick={() => setFilter('alert')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'alert' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Needs Attention (1)
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors"
            aria-label="Toggle Vitals Grid"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Grid Content */}
      {isExpanded && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
          {filteredVitals.map((vital) => (
            <VitalCard
              key={vital.id}
              vital={vital}
              onSelect={onSelectVital}
            />
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-400 font-medium">
        <span>Continuous telemetry synchronized via Ava Health Gateway</span>
        <span>Click any vital card for 30-day historical trend graph</span>
      </div>

    </div>
  );
};
