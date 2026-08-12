import React from 'react';
import { Scan, Activity, FileText, CheckCircle, Sparkles, ExternalLink } from 'lucide-react';
import { HealthAccordion } from './HealthAccordion';
import { imagingSummaryData } from '../data/mockHealthData';

interface ImagingSummaryProps {
  onOpenAva: (context?: string) => void;
}

export const ImagingSummary: React.FC<ImagingSummaryProps> = ({ onOpenAva }) => {
  return (
    <HealthAccordion
      icon={<Scan className="w-5.5 h-5.5 text-brand-600" />}
      title="Imaging & Waveform Summary"
      subtitle="ECG normal sinus. Chest X-ray unremarkable."
      badgeText="3 Studies Unremarkable"
      badgeColor="normal"
      defaultOpen={false}
    >
      <div className="space-y-4 pt-2">
        
        {/* Synthetic ECG Waveform Visual Banner */}
        <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-inner">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">ECG Telemetry Sync</span>
              <span className="text-sm font-semibold text-white">Normal Sinus Rhythm • 72 bpm</span>
            </div>
          </div>

          {/* Synthetic ECG Line SVG */}
          <div className="w-full sm:w-48 h-8 opacity-90">
            <svg viewBox="0 0 200 40" className="w-full h-full stroke-emerald-400 fill-none" strokeWidth="2">
              <path d="M 0 20 L 30 20 L 35 10 L 40 30 L 45 5 L 50 35 L 55 20 L 90 20 L 95 10 L 100 30 L 105 5 L 110 35 L 115 20 L 150 20 L 155 10 L 160 30 L 165 5 L 170 35 L 175 20 L 200 20" />
            </svg>
          </div>
        </div>

        {/* Imaging Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {imagingSummaryData.map((study) => (
            <div 
              key={study.id}
              className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:border-brand-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100/70 px-2 py-0.5 rounded-md">
                    {study.modality}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">{study.date}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-tight mb-2">
                  {study.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {study.impression}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs">
                <span className="inline-flex items-center text-[11px] font-bold text-emerald-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                  {study.status}
                </span>
                
                <button 
                  onClick={() => onOpenAva(`Can you explain the impression of my ${study.title}?`)}
                  className="text-brand-600 hover:text-brand-800 font-semibold text-[11px] flex items-center gap-1"
                >
                  <span>Explain</span>
                  <Sparkles className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </HealthAccordion>
  );
};
