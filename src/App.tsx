import React, { useState } from 'react';
import { AIConciergePage } from './components/AIConciergePage';
import { Header } from './components/Header';
import { AIHealthHero } from './components/AIHealthHero';
import { OverallHealthStatus } from './components/OverallHealthStatus';
import { VitalsGrid } from './components/VitalsGrid';
import { LabResultsDigest } from './components/LabResultsDigest';
import { ImagingSummary } from './components/ImagingSummary';
import { CareRecommendations } from './components/CareRecommendations';
import { AskAvaModal } from './components/AskAvaModal';
import { VitalDetailModal } from './components/VitalDetailModal';
import { vitalsData } from './data/mockHealthData';
import { VitalItem } from './types/health';
import { Sparkles } from 'lucide-react';

import { AiSuggestionPage } from './components/AiSuggestionPage';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'Appointment' | 'Patient' | 'Reports' | 'Chats' | 'Billing'>('Dashboard');
  const [isAvaOpen, setIsAvaOpen] = useState(false);
  const [avaContext, setAvaContext] = useState<string | undefined>(undefined);
  const [selectedVital, setSelectedVital] = useState<VitalItem | null>(null);

  const handleOpenAva = (contextPrompt?: string) => {
    setAvaContext(contextPrompt);
    setIsAvaOpen(true);
  };

  // If activeTab is 'Dashboard', render the exact Figma AI Suggestion Page
  if (activeTab === 'Dashboard') {
    return (
      <AiSuggestionPage 
        onTabChange={(tab) => setActiveTab(tab as any)}
      />
    );
  }

  // Clinical Summary View for Reports / Other Tabs
  return (
    <div className="min-h-screen bg-[#F6F5FB] text-slate-800 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900 pb-16">
      
      {/* Top Navbar */}
      <Header onOpenAva={() => handleOpenAva()} />

      {/* Main Page Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* HERO / AI SUMMARY SECTION */}
        <section aria-label="AI Health Summary Hero">
          <AIHealthHero onRefresh={() => handleOpenAva("Please re-analyze recent vitals and lab data.")} />
        </section>

        {/* OVERALL HEALTH STATUS CARD */}
        <section aria-label="Overall Health Status">
          <OverallHealthStatus onOpenAva={handleOpenAva} />
        </section>

        {/* KEY VITALS & TRENDS GRID */}
        <section aria-label="Key Vitals and Trends">
          <VitalsGrid
            vitals={vitalsData}
            onSelectVital={(vital) => setSelectedVital(vital)}
          />
        </section>

        {/* COLLAPSIBLE HEALTH SECTIONS */}
        <section aria-label="Detailed Clinical Reports" className="space-y-4">
          <LabResultsDigest onOpenAva={handleOpenAva} />
          <ImagingSummary onOpenAva={handleOpenAva} />
          <CareRecommendations onOpenAva={handleOpenAva} />
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="font-semibold text-slate-700">Ava Clinical Intelligence Platform</span>
            <span>· Encrypted HIPAA Compliant Telemetry</span>
          </div>
          <div>
            <span>Primary Care Physician: Dr. David Brock</span>
          </div>
        </div>
      </footer>

      {/* Interactive Ask Ava AI Slide-over Modal */}
      <AskAvaModal
        isOpen={isAvaOpen}
        onClose={() => setIsAvaOpen(false)}
        initialPrompt={avaContext}
      />

      {/* Vital Detail Popover Modal */}
      <VitalDetailModal
        vital={selectedVital}
        onClose={() => setSelectedVital(null)}
        onAskAva={handleOpenAva}
      />

    </div>
  );
};

export default App;
