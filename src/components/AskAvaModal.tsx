import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Send, Bot, User, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ava' | 'user';
  text: string;
  timestamp: string;
}

interface AskAvaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AskAvaModal: React.FC<AskAvaModalProps> = ({ isOpen, onClose, initialPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ava',
      text: "Hello Dr. Brock! I'm Ava, your Clinical AI assistant. I have analyzed all recent vitals, lab panels, and imaging reports. How can I assist you with this patient summary?",
      timestamp: '10:30 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate AI clinical reasoning response
    setTimeout(() => {
      let aiResponseText = "Based on the May 27, 2026 AI Health Summary, all vital signs (HR 72 bpm, SpO2 98%, Temp 98.6°F) remain in optimal stability. Blood pressure is 132/86 mmHg, representing a 2% improvement vs yesterday. Mild LDL cholesterol elevation (135 mg/dL) is the primary item flagged for follow-up.";

      if (text.toLowerCase().includes('ldl') || text.toLowerCase().includes('cholesterol') || text.toLowerCase().includes('lab')) {
        aiResponseText = "The patient's LDL cholesterol is currently 135 mg/dL (borderline elevated above the <100 mg/dL target). HDL is normal at 52 mg/dL and Triglycerides are 140 mg/dL. Re-checking a full lipid panel in 2 weeks alongside aerobic walking habits is recommended.";
      } else if (text.toLowerCase().includes('bp') || text.toLowerCase().includes('blood pressure')) {
        aiResponseText = "Blood pressure is currently 132/86 mmHg. This is down 15% from baseline and controlled under the current regimen. The patient's 8,420 daily step habit is contributing positively to vascular tone.";
      } else if (text.toLowerCase().includes('recommend') || text.toLowerCase().includes('care gap')) {
        aiResponseText = "There are 2 pending care gap recommendations: 1) Schedule Annual Lipid & HbA1c re-check in 2 weeks, and 2) Maintain daily 10,000 step walking goal. Influenza booster is scheduled for October 2026.";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ava',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const samplePrompts = [
    "Explain borderline LDL cholesterol finding",
    "How is blood pressure trending over 30 days?",
    "Summarize key care gaps and action items",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end animate-fadeIn">
      
      {/* Slide-over Container */}
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-brand-200">
        
        {/* Header Bar */}
        <div className="p-5 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-800 text-white flex items-center justify-between border-b border-brand-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-brand-200 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Ava AI Assistant</span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-full">
                  Clinical v4.2
                </span>
              </h3>
              <p className="text-xs text-brand-100/90 font-medium">
                Context: David Brock · AI Health Summary May 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  msg.sender === 'ava'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-800 text-white'
                }`}
              >
                {msg.sender === 'ava' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[10px] block mt-1.5 font-medium ${
                    msg.sender === 'user' ? 'text-brand-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs font-semibold text-brand-600 bg-brand-50 p-3 rounded-2xl w-fit">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Ava is analyzing health metrics...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 px-3 py-1.5 rounded-full shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Ava clinical questions..."
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl disabled:opacity-40 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
