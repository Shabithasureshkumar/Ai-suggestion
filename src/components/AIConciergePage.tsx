import React, { useState } from 'react';
import { TopNavigation } from './TopNavigation';
import { StethoscopeBackground } from './StethoscopeBackground';
import { AuraHeader } from './AuraHeader';
import { AIInputComposer } from './AIInputComposer';
import { QuickActionChips } from './QuickActionChips';
import { BottomContinuationMessage } from './BottomContinuationMessage';
import { PasteConversationModal } from './PasteConversationModal';
import { AIAnalysisResultsModal } from './AIAnalysisResultsModal';

interface AIConciergePageProps {
  onTabChange?: (tab: string) => void;
}

export const AIConciergePage: React.FC<AIConciergePageProps> = ({ onTabChange }) => {
  const [message, setMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [activeUserPrompt, setActiveUserPrompt] = useState('');

  // Select Quick Action Prompt
  const handleSelectQuickAction = (prompt: string) => {
    setMessage(prompt);
  };

  // Start AI Analysis
  const handleStartAnalysis = () => {
    if (!message.trim()) return;

    setActiveUserPrompt(message);
    setIsAnalyzing(true);

    // Simulate realistic AI Triage processing delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsResultsOpen(true);
    }, 1200);
  };

  // Handle Pasted Conversation from another AI
  const handleImportPastedConversation = (pastedText: string) => {
    setMessage(`Imported AI Chat Transcript:\n"${pastedText.slice(0, 180)}..."`);
    setActiveUserPrompt(pastedText);
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setIsResultsOpen(true);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#F7F6FB] text-slate-800 flex flex-col font-sans relative selection:bg-purple-200 selection:text-purple-900 pb-12 overflow-x-hidden">
      
      {/* 1. TOP NAVIGATION */}
      <TopNavigation activeTab="Dashboard" onTabChange={onTabChange} />

      {/* MAIN CONTENT AREA WITH STETHOSCOPE & PURPLE GLOW BACKGROUND */}
      <div className="flex-1 relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-between">
        
        {/* 2 & 3. BACKGROUND ARTWORK & SOFT PURPLE GLOWS */}
        <StethoscopeBackground />

        {/* CENTER CONTENT WRAPPER */}
        <main className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 relative z-10 my-auto">
          
          {/* 4, 5, 6, 7. AURA AI HEADER, HEADING, SUBTITLE & INTRO MESSAGE */}
          <section aria-label="Aura AI Introduction">
            <AuraHeader />
          </section>

          {/* 8, 9, 10, 11, 12. SPECIALIST AVAILABILITY + LARGE AI INPUT CONTAINER */}
          <section aria-label="AI Consultation Composer">
            <AIInputComposer
              message={message}
              onChangeMessage={setMessage}
              onSubmit={handleStartAnalysis}
              isAnalyzing={isAnalyzing}
            />
          </section>

          {/* 13, 14. QUICK ACTION CHIPS */}
          <section aria-label="Quick Symptom & Consultation Actions">
            <QuickActionChips onSelectAction={handleSelectQuickAction} />
          </section>

          {/* 15. BOTTOM CONTINUATION MESSAGE */}
          <section aria-label="Cross-AI Chat Continuation">
            <BottomContinuationMessage onOpenPasteModal={() => setIsPasteModalOpen(true)} />
          </section>

        </main>

      </div>

      {/* PASTE CONVERSATION MODAL */}
      <PasteConversationModal
        isOpen={isPasteModalOpen}
        onClose={() => setIsPasteModalOpen(false)}
        onImportConversation={handleImportPastedConversation}
      />

      {/* AI ANALYSIS RESULTS MODAL */}
      <AIAnalysisResultsModal
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
        userPrompt={activeUserPrompt || message}
        onBookSpecialist={(docName) => {
          console.log(`Specialist booked: ${docName}`);
        }}
      />

    </div>
  );
};

export default AIConciergePage;
