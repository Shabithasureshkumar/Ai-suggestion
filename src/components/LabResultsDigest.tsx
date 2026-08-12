import React from 'react';
import { FlaskConical, AlertCircle, CheckCircle2, Sparkles, ArrowUpRight } from 'lucide-react';
import { HealthAccordion } from './HealthAccordion';
import { labPanelsData } from '../data/mockHealthData';

interface LabResultsDigestProps {
  onOpenAva: (context?: string) => void;
}

export const LabResultsDigest: React.FC<LabResultsDigestProps> = ({ onOpenAva }) => {
  return (
    <HealthAccordion
      icon={<FlaskConical className="w-5.5 h-5.5 text-brand-600" />}
      title="Lab Results Digest"
      subtitle="3 panels reviewed. 1 borderline finding."
      badgeText="1 Borderline Finding"
      badgeColor="warning"
      defaultOpen={false}
    >
      <div className="space-y-6 pt-2">
        
        {/* AI Interpretation Box */}
        <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
          <Sparkles className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block mb-0.5">Ava AI Clinical Synthesis:</span>
            Lipid panel shows mild elevation in <strong className="text-amber-800 font-semibold bg-amber-100/70 px-1 rounded">LDL Cholesterol (135 mg/dL)</strong> relative to optimal target (&lt;100 mg/dL). Comprehensive Metabolic Panel (CMP) and Complete Blood Count (CBC) are fully within normal physiological parameters.
          </div>
        </div>

        {/* Lab Panels Tables */}
        <div className="space-y-4">
          {labPanelsData.map((panel, idx) => (
            <div key={idx} className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/60">
              
              {/* Panel Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>{panel.panelName}</span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border">
                    {panel.category}
                  </span>
                </h4>
                <span className="text-xs text-slate-400 font-medium">{panel.results.length} Tests</span>
              </div>

              {/* Tests Grid */}
              <div className="mt-3 divide-y divide-slate-100">
                {panel.results.map((test) => (
                  <div key={test.id} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                    <div className="min-w-0">
                      <span className="font-bold text-slate-800 block truncate">{test.testName}</span>
                      <span className="text-[11px] text-slate-400">Ref Range: {test.referenceRange}</span>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="text-right">
                        <span className="font-extrabold text-slate-900 text-sm">{test.value}</span>
                        <span className="text-slate-500 text-[11px] ml-1">{test.unit}</span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                        test.status === 'Borderline' 
                          ? 'bg-amber-100 text-amber-800 border-amber-300' 
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}>
                        {test.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="flex items-center justify-between pt-2 text-xs">
          <span className="text-slate-400 font-medium">Last lab draw: May 20, 2026 • Quest Diagnostics</span>
          <button
            onClick={() => onOpenAva("Can you explain why my LDL cholesterol is borderline and what dietary changes help?")}
            className="inline-flex items-center space-x-1.5 font-bold text-brand-700 hover:text-brand-900 hover:underline"
          >
            <span>Discuss Lab Findings with Ava</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </HealthAccordion>
  );
};
