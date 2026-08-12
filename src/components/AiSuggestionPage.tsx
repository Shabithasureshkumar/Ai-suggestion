import React, { useState } from 'react';
import { TopNavigation } from './TopNavigation';
import { AiHealthHeader } from './AiHealthHeader';
import { DetectedSymptoms } from './DetectedSymptoms';
import { RecommendedSpecialists } from './RecommendedSpecialists';
import { PrivacyFirstCard } from './PrivacyFirstCard';
import { VirtualClinicCard } from './VirtualClinicCard';
import { CheckCircle2, Calendar, UserCheck, Video } from 'lucide-react';

interface AiSuggestionPageProps {
  onTabChange?: (tab: string) => void;
}

export const AiSuggestionPage: React.FC<AiSuggestionPageProps> = ({ onTabChange }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleChooseDoctor = () => {
    showNotification('Opening Doctor Directory to choose a specialist...');
  };

  const handleBookSpecialist = (docName: string) => {
    showNotification(`Appointment request submitted for ${docName}!`);
  };

  const handleViewProfile = (docName: string) => {
    showNotification(`Opening profile for ${docName}...`);
  };

  const handleLaunchVirtualClinic = () => {
    showNotification('Connecting to Virtual Clinic high-definition video portal...');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 flex flex-col font-manrope selection:bg-purple-100 selection:text-purple-900 pb-16 relative">
      
      {/* 1. TOP NAVIGATION */}
      <TopNavigation activeTab="Dashboard" onTabChange={onTabChange} />

      {/* MAIN DESKTOP CONTAINER (1440px target width reference) */}
      <main className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 space-y-6">
        
        {/* 2. MAIN AI HEALTH ANALYSIS HEADER & CHOOSE DOCTOR ROW */}
        <section aria-label="AI Health Analysis Hero">
          <AiHealthHeader onChooseDoctor={handleChooseDoctor} />
        </section>

        {/* 3. ASYMMETRIC TWO-COLUMN LAYOUT (Frame 2147226854: Left 851px, Right 436px) */}
        <div className="flex flex-col lg:flex-row gap-6 w-full items-start justify-between">
          
          {/* LEFT CONTENT COLUMN (Frame 2147226853 - Width 851px) */}
          <div className="w-full lg:w-[851px] flex flex-col gap-7 shrink-0">
            
            {/* DETECTED SYMPTOMS SECTION */}
            <section aria-label="Detected Symptoms">
              <DetectedSymptoms />
            </section>

            {/* RECOMMENDED SPECIALISTS SECTION */}
            <section aria-label="Recommended Specialists">
              <RecommendedSpecialists
                onBookSpecialist={handleBookSpecialist}
                onViewProfile={handleViewProfile}
                onViewAll={() => showNotification('Viewing all matched medical specialists...')}
              />
            </section>

          </div>

          {/* RIGHT CONTENT COLUMN (Section - Bottom Illustration/Info - Width 436px) */}
          <div className="w-full lg:w-[436px] flex flex-col gap-7 shrink-0">
            
            {/* PRIVACY FIRST CARD */}
            <section aria-label="Privacy and HIPAA Compliance">
              <PrivacyFirstCard />
            </section>

            {/* VIRTUAL CLINIC CARD */}
            <section aria-label="Virtual Clinic Consultation">
              <VirtualClinicCard onLaunchClinic={handleLaunchVirtualClinic} />
            </section>

          </div>

        </div>

      </main>

      {/* TOAST NOTIFICATION FOR USER ACTIONS */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1C30] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-purple-500/30 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-manrope font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default AiSuggestionPage;
