import React, { useEffect, useRef, useState } from 'react';
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

type Tab = 'Dashboard' | 'Appointment' | 'Patient' | 'Reports' | 'Chats' | 'Billing';

const TABS: Tab[] = ['Dashboard', 'Appointment', 'Patient', 'Reports', 'Chats', 'Billing'];

const tabFromHash = (): Tab => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  return TABS.find((t) => t.toLowerCase() === hash) ?? 'Dashboard';
};

export const App: React.FC = () => {
  // Single source of truth for navigation. Previously both AiSuggestionPage's
  // TopNavigation and the summary view's Header kept their own copies, so
  // navigating away from the AI Suggestion screen was a one-way trip.
  const [activeTab, setActiveTab] = useState<Tab>(tabFromHash);
  const [isAvaOpen, setIsAvaOpen] = useState(false);
  const [avaContext, setAvaContext] = useState<string | undefined>(undefined);
  const [selectedVital, setSelectedVital] = useState<VitalItem | null>(null);
  const isFirstRender = useRef(true);

  const handleOpenAva = (contextPrompt?: string) => {
    setAvaContext(contextPrompt);
    setIsAvaOpen(true);
  };

  const handleTabChange = (tab: string) => {
    const next = TABS.find((t) => t === tab);
    if (!next || next === activeTab) return;
    setActiveTab(next);
    window.history.pushState({ tab: next }, '', `#${next.toLowerCase()}`);
  };

  // Browser back/forward moves between screens instead of leaving the app.
  useEffect(() => {
    const onPopState = () => setActiveTab(tabFromHash());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // On screen transition: scroll to top and move focus into the new screen so
  // keyboard and screen-reader users are not left on <body>.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // preventScroll matters: focusing a tabindex=-1 container otherwise
    // scrolls it back into view and undoes the scroll-to-top.
    document.getElementById('main-content')?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [activeTab]);

  // If activeTab is 'Dashboard', render the AI Suggestion Page
  if (activeTab === 'Dashboard') {
    return (
      <AiSuggestionPage
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    );
  }

  // Clinical Summary View for Reports / Other Tabs
  return (
    <div className="min-h-screen bg-[#F6F5FB] text-slate-800 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900 pb-16">
      
      {/* Top Navbar */}
      <Header
        onOpenAva={() => handleOpenAva()}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Main Page Body Container */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 focus:outline-none"
      >
        
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
