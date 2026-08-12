import React from 'react';
import { Sparkles, Info, RefreshCw, Share2, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { heroMetadata } from '../data/mockHealthData';

interface AIHealthHeroProps {
  onRefresh?: () => void;
}

export const AIHealthHero: React.FC<AIHealthHeroProps> = ({ onRefresh }) => {
  const score = heroMetadata.healthScore;
  const strokeDashoffset = 283 - (283 * score) / 100;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white p-6 sm:p-8 xl:p-10 shadow-xl shadow-brand-900/20 border border-brand-500/30">
      {/* Background Decorative Futuristic Glow & Grid Patterns */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-brand-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)', backgroundSize: '24px 24px' }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        
        {/* Left Side: Badge, Title, Metadata & AI Disclaimer */}
        <div className="space-y-4 max-w-3xl">
          
          {/* Top Label & Status Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-md border border-white/20 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-200 animate-spin-slow" />
              <span>{heroMetadata.title.toUpperCase()}</span>
            </span>

            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1" />
              Live Clinical Sync Active
            </span>
          </div>

          {/* Main Title - Original Exact Text */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {heroMetadata.title}
            </h1>
            <p className="text-sm sm:text-base text-brand-100/90 font-medium">
              Generated {heroMetadata.generatedDate} · {heroMetadata.dataSources}
            </p>
          </div>

          {/* AI Disclaimer Box - Original Exact Text */}
          <div className="flex items-start space-x-3 p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs sm:text-sm leading-relaxed">
            <Info className="w-5 h-5 text-brand-200 shrink-0 mt-0.5" />
            <span>
              {heroMetadata.disclaimer}
            </span>
          </div>

          {/* Action Quick Links */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button 
              onClick={onRefresh}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh AI Analysis</span>
            </button>
            <button className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10">
              <Download className="w-3.5 h-3.5" />
              <span>Export Clinical PDF</span>
            </button>
            <button className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share with Specialist</span>
            </button>
          </div>

        </div>

        {/* Right Side: Modern Circular Health Score & Status Visualization */}
        <div className="w-full lg:w-auto flex flex-col items-center justify-center">
          <div className="relative p-6 sm:p-7 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center text-center min-w-[220px]">
            
            {/* Circular Progress Gauge */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-white/15"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Foreground Animated Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-emerald-400 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              
              {/* Inner Radial Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-3xl font-extrabold tracking-tight">{score}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">Optimal</span>
              </div>
            </div>

            {/* Subtext info */}
            <div className="mt-3 space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Overall Readiness</span>
              </div>
              <p className="text-[11px] text-brand-200 font-medium">
                {heroMetadata.scoreChange}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
