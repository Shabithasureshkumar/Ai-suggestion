import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Clock, Calendar, ShieldCheck, UserCheck, MessageSquare, ChevronRight } from 'lucide-react';
import { doctorAvatars } from './AIInputComposer';

interface AIAnalysisResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPrompt: string;
  onBookSpecialist: (doctorName: string) => void;
}

export const AIAnalysisResultsModal: React.FC<AIAnalysisResultsModalProps> = ({
  isOpen,
  onClose,
  userPrompt,
  onBookSpecialist,
}) => {
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBook = (docName: string) => {
    setBookingConfirmed(docName);
    onBookSpecialist(docName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-purple-200 overflow-hidden relative transform transition-all my-8">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-700 via-violet-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-purple-200 uppercase block">
                Aura AI Triage & Recommendation
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">
                Specialist Match Results
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* USER INQUIRY SUMMARY */}
          <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 flex items-start space-x-3">
            <MessageSquare className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-purple-900 uppercase tracking-wider">Your Inquiry</p>
              <p className="text-sm font-medium text-slate-800 italic mt-0.5">"{userPrompt}"</p>
            </div>
          </div>

          {/* CONFIRMATION BANNER IF BOOKED */}
          {bookingConfirmed && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center space-x-3 text-emerald-900">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-bold">Appointment Requested with {bookingConfirmed}!</p>
                <p className="text-xs text-emerald-700">A consultation invitation has been dispatched to your portal.</p>
              </div>
            </div>
          )}

          {/* AI SPECIALIST RECOMMENDATION SUMMARY */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Recommended Department
              </h4>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                37 Specialists On-Call
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-purple-300">PRIMARY RECOMMENDATION</span>
                <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-300" /> Wait Time: &lt; 15 mins
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">Cardiovascular & Internal Medicine</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Based on your symptom narrative and recent vitals, consulting an Internal Medicine Specialist or Cardiologist is recommended for comprehensive assessment.
              </p>
            </div>
          </div>

          {/* MATCHED DOCTORS LIST */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Top Matched On-Duty Physicians
            </h4>

            <div className="space-y-3">
              {doctorAvatars.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 bg-white hover:shadow-md transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={doc.url}
                      alt={doc.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100 shadow-sm"
                    />
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        {doc.name}
                        <UserCheck className="w-3.5 h-3.5 text-purple-600" />
                      </h5>
                      <p className="text-xs text-slate-500 font-medium">{doc.role} · Board Certified</p>
                      <div className="flex items-center space-x-3 mt-1 text-[11px] text-slate-600">
                        <span className="text-emerald-600 font-bold">● Available in {15 + idx * 10} min</span>
                        <span>★ 4.9 (120+ reviews)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBook(doc.name)}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1 shrink-0"
                  >
                    <span>Connect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* HIPAA SAFETY NOTICE */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
            <span>Encrypted HIPAA clinical triage telemetry · Reviewed by Dr. David Brock</span>
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between">
          <span className="text-xs text-slate-500">Aura AI Concierge v4.2</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors"
          >
            Close Results
          </button>
        </div>

      </div>
    </div>
  );
};
