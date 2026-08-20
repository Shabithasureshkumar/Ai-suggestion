import React from 'react';
import { Search, Settings, Bell, Sparkles, ArrowLeft } from 'lucide-react';
import { patientInfo } from '../data/mockHealthData';

interface HeaderProps {
  onOpenAva: () => void;
  /** Navigation state is owned by App; this header holds none of its own. */
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAva, activeTab, onTabChange }) => {
  const navItems = [
    'Dashboard',
    'Appointment',
    'Patient',
    'Reports',
    'Chats',
    'Billing'
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-brand-100/70 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          
          {/* Left: Brand Logo & Navigation Links Pill */}
          <div className="flex items-center space-x-3 sm:space-x-6 lg:space-x-8 min-w-0">
            {/*
              Back affordance. The nav pill below is `hidden lg:flex`, so without
              this there is no way off this view at mobile/tablet widths.
            */}
            {activeTab !== 'Dashboard' && (
              <button
                type="button"
                onClick={() => onTabChange('Dashboard')}
                aria-label="Back to Dashboard"
                className="lg:hidden w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-slate-600 hover:text-brand-700 hover:bg-brand-50 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </button>
            )}

            {/* Brand Logo */}
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-200">
                <Sparkles className="w-5.5 h-5.5 animate-pulse" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Ava<span className="text-brand-600">Health</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-brand-100 text-brand-700 rounded-full uppercase tracking-wider">AI 4.2</span>
                </span>
                <span className="text-xs text-slate-400 block -mt-1 font-medium">Clinical Intelligence</span>
              </div>
            </div>

            {/* Navigation Pill Container - exact links from original design */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60"
            >
              {navItems.map((item) => {
                const isActive = activeTab === item;
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => onTabChange(item)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Utilities: Search, Actions, Profile */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Bar */}
            <div className="relative hidden md:block w-48 xl:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search patient vitals, labs..."
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all placeholder:text-slate-400 text-slate-700"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                ⌘K
              </span>
            </div>

            {/* Quick Ask Ava CTA */}
            <button
              type="button"
              onClick={onOpenAva}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100/80 border border-brand-200/80 rounded-full transition-all duration-200 shadow-sm"
              title="Ask Ava AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span className="hidden sm:inline">Ask Ava</span>
            </button>

            {/* Settings & Bell Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                type="button"
                className="p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 bg-brand-600 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white"></span>
              </button>
            </div>

            {/* User Profile Pill - exact from original: David Brock - General Physician */}
            <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-200/80">
              <img
                src={patientInfo.avatarUrl}
                alt={patientInfo.name}
                width={36}
                height={36}
                decoding="async"
                onError={(e) => {
                  e.currentTarget.style.visibility = 'hidden';
                }}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-200/70 bg-slate-100"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                  {patientInfo.name}
                </p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  {patientInfo.role}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
