import React from 'react';
import { Activity, Sparkles, ArrowRight, MessageSquare, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { overallHealthStatusData } from '../data/mockHealthData';

interface OverallHealthStatusProps {
  onOpenAva: (context?: string) => void;
}

export const OverallHealthStatus: React.FC<OverallHealthStatusProps> = ({ onOpenAva }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-100/90 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
      
      {/* Decorative Top Gradient Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-brand-600 to-emerald-400" />

      {/* Main Content Layout */}
      <div className="space-y-6">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-200/60 shadow-inner">
              <Activity className="w-6 h-6 animate-pulse text-brand-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {overallHealthStatusData.title}
                </h2>
                <span className="px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Stable • Positive Trend
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                {overallHealthStatusData.shortSummary}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold text-brand-700 bg-brand-50/80 px-3 py-1.5 rounded-xl border border-brand-100 self-start sm:self-auto">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Ava AI Insight Engine</span>
          </div>

        </div>

        {/* Narrative & Key Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Detailed Narrative Text (Original exact text with styled highlights) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-5 rounded-2xl bg-brand-50/40 border border-brand-100/60 leading-relaxed text-sm text-slate-700 font-normal">
              <p>
                Your overall health picture is{' '}
                <strong className="text-slate-900 font-semibold bg-emerald-100/80 text-emerald-900 px-1.5 py-0.5 rounded">
                  stable and trending positive
                </strong>
                . Blood pressure is under control on your current regimen. Recent labs show{' '}
                <span className="font-semibold text-amber-900 bg-amber-100/80 px-1.5 py-0.5 rounded">
                  mild elevation in LDL cholesterol
                </span>{' '}
                worth monitoring at your next visit. Weight and BMI remain in a healthy range and your resting heart rate has trended down since November — likely reflecting your daily walking habit.
              </p>
            </div>
          </div>

          {/* Quick AI Clinical Digest Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {overallHealthStatusData.keyHighlights.map((highlight, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between text-xs"
              >
                <span className="font-bold text-slate-800">{highlight.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${
                  highlight.status === 'positive' ? 'bg-emerald-100 text-emerald-800' :
                  highlight.status === 'managed' ? 'bg-brand-100 text-brand-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {highlight.status === 'positive' && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                  {highlight.status === 'managed' && <Activity className="w-3 h-3 text-brand-600" />}
                  {highlight.status === 'monitor' && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                  {highlight.text}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar Action: "Ask Ava about this" Secondary CTA Button */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-500"></span>
            <span>Reviewed alongside your primary clinical care team</span>
          </div>

          <button
            onClick={() => onOpenAva("Can you explain my overall health status summary in detail?")}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-brand-700 bg-white border-2 border-brand-300 hover:border-brand-600 hover:bg-brand-50 transition-all duration-200 shadow-sm hover:shadow group/btn"
          >
            <Sparkles className="w-4 h-4 text-brand-600 group-hover/btn:scale-110 transition-transform" />
            <span>Ask Ava about this</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-600 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
