import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TopNavigation } from './TopNavigation';
import { AiHealthHeader } from './AiHealthHeader';
import { AiHealthHeroBanner } from './AiHealthHeroBanner';
import { DetectedSymptoms } from './DetectedSymptoms';
import { RecommendedSpecialists } from './RecommendedSpecialists';
import { PrivacyFirstCard } from './PrivacyFirstCard';
import { VirtualClinicCard } from './VirtualClinicCard';
import { DiagnosticSummary } from './mobile/DiagnosticSummary';
import { SpecialistCareCta } from './mobile/SpecialistCareCta';
import { MatchedSpecialists } from './mobile/MatchedSpecialists';
import { CheckCircle2, X } from 'lucide-react';

interface AiSuggestionPageProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const INITIAL_SYMPTOMS = ['Chest Pain', 'Fatigue', 'Breathlessness'];

export const AiSuggestionPage: React.FC<AiSuggestionPageProps> = ({
  activeTab = 'Dashboard',
  onTabChange,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>(INITIAL_SYMPTOMS);
  const toastTimerRef = useRef<number | undefined>(undefined);

  const dismissToast = useCallback(() => {
    window.clearTimeout(toastTimerRef.current);
    setToastMessage(null);
  }, []);

  const showNotification = useCallback((msg: string) => {
    window.clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = window.setTimeout(() => setToastMessage(null), 5000);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimerRef.current), []);

  useEffect(() => {
    if (!toastMessage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissToast();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [toastMessage, dismissToast]);

  const handleAddSymptom = (symptom: string) =>
    setSymptoms((prev) => (prev.includes(symptom) ? prev : [...prev, symptom]));

  const handleRemoveSymptom = (indexToRemove: number) =>
    setSymptoms((prev) => prev.filter((_, idx) => idx !== indexToRemove));

  const handleChooseDoctor = () =>
    showNotification('Opening Doctor Directory to choose a specialist...');
  const handleBookSpecialist = (docName: string) =>
    showNotification(`Appointment request submitted for ${docName}!`);
  const handleViewProfile = (docName: string) =>
    showNotification(`Opening profile for ${docName}...`);
  const handleLaunchVirtualClinic = () =>
    showNotification('Connecting to Virtual Clinic high-definition video portal...');
  const handleBookNow = () =>
    showNotification('Finding the earliest specialist appointment for you...');

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 flex flex-col font-manrope selection:bg-purple-100 selection:text-purple-900 pb-16 relative">

      {/* SKIP LINK — visually hidden until focused, so layout is unaffected */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-3 focus:left-4 focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#5C24FF] focus:text-white focus:font-manrope focus:font-bold focus:text-sm"
      >
        Skip to main content
      </a>

      <TopNavigation
        activeTab={activeTab}
        onTabChange={onTabChange}
        containerClassName="max-w-[1411px]"
      />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">

        {/*
          DESKTOP COMPOSITION — reference "Ai Suggestion.png" @1440.
          Measured anchors: hero row x=49..1395 (1347 wide); columns row
          x=65..1375 (1311 = 851 + 24 gap + 436). `max-w-[1411px]` minus the
          32px lg gutter yields exactly 1347, and the inner 1311 wrapper
          reproduces the column row.
        */}
        <div className="hidden lg:block w-full max-w-[1411px] mx-auto px-4 sm:px-6 lg:px-8 pt-[5px]">
          {/*
            Reference vertical rhythm @1440: nav pill 29..75, hero 96..217,
            column row top 246. `pt-[5px]` puts the hero at 96 and the 29px
            gap below puts both columns at 246.
            Horizontal: the hero row is outdented 16px left / 20px right from
            the centred 1311px grid, giving x=48.5..1395.5 against the
            reference's 49..1396.
          */}
          <div className="w-full max-w-[1311px] mx-auto">
            <section aria-label="AI Health Analysis Hero" className="-ml-4 -mr-5">
              <AiHealthHeader onChooseDoctor={handleChooseDoctor} />
            </section>
          </div>

          <div className="w-full max-w-[1311px] mx-auto mt-[29px] grid grid-cols-[851fr_436fr] gap-6 items-start">
            <div className="flex flex-col gap-7 min-w-0">
              <section aria-label="Detected Symptoms">
                <DetectedSymptoms
                  symptoms={symptoms}
                  onAddSymptom={handleAddSymptom}
                  onRemoveSymptom={handleRemoveSymptom}
                />
              </section>

              <section aria-label="Recommended Specialists">
                <RecommendedSpecialists
                  symptoms={symptoms}
                  onBookSpecialist={handleBookSpecialist}
                  onViewProfile={handleViewProfile}
                  onViewAll={() => showNotification('Viewing all matched medical specialists...')}
                />
              </section>
            </div>

            <div className="flex flex-col gap-7 min-w-0">
              <section aria-label="Privacy and HIPAA Compliance">
                <PrivacyFirstCard />
              </section>

              <section aria-label="Virtual Clinic Consultation">
                <VirtualClinicCard onLaunchClinic={handleLaunchVirtualClinic} />
              </section>
            </div>
          </div>
        </div>

        {/*
          MOBILE COMPOSITION — reference "Ai suggestion-mob.png" @440.
          Hero, then the diagnostic summary, then the specialist care CTA, then
          the stacked Matched Specialists list. Deliberately not the desktop
          layout stacked: there is no Choose Doctor button, no Detected Symptoms
          editor card, and no Privacy/Virtual Clinic column in this reference.
          Toggled with CSS rather than JS so it can never desync from the
          viewport; the hidden tree is display:none and therefore out of the
          accessibility tree and the tab order.
        */}
        {/*
          Reference @440 vertical rhythm (device status bar removed):
          hero 80..210, diagnostic row1 231, CTA 625, matched heading 828.
          The gaps are 21 / 23 / 38 — deliberately not uniform.
        */}
        <div className="lg:hidden w-full max-w-[440px] mx-auto px-5 pt-1 pb-2 flex flex-col">
          <section aria-label="AI Health Analysis Hero">
            <AiHealthHeroBanner />
          </section>

          <div className="mt-[21px]">
            <DiagnosticSummary symptoms={symptoms} />
          </div>

          <div className="mt-[23px]">
            <SpecialistCareCta onBookNow={handleBookNow} />
          </div>

          {/* Reference insets this block ~6px further than the hero/CTA:
              heading x=25, cards x=28, versus x=20 for the hero. */}
          <div className="mt-[38px] px-1.5">
            <MatchedSpecialists onViewProfile={handleViewProfile} />
          </div>
        </div>

      </main>

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-[#0B1C30] text-white pl-5 pr-3 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-purple-500/30 animate-toast-in"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
          <span className="font-manrope font-semibold text-sm min-w-0 flex-1">{toastMessage}</span>
          <button
            type="button"
            onClick={dismissToast}
            aria-label="Dismiss notification"
            className="w-11 h-11 -my-2 shrink-0 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          </button>
        </div>
      )}

    </div>
  );
};

export default AiSuggestionPage;
