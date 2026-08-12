import React, { useState } from 'react';
import { Search, Settings, Bell, LayoutGrid } from 'lucide-react';
import davidBrockImg from '../assets/images/david_brock.jpg';

interface TopNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab = 'Dashboard',
  onTabChange,
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const navItems = [
    { id: 'Dashboard', label: 'Dashboard' },
    { id: 'Appointment', label: 'Appointment' },
    { id: 'Patient', label: 'Patient' },
    { id: 'Reports', label: 'Reports' },
    { id: 'Chats', label: 'Chats' },
    { id: 'Billing', label: 'Billing' },
  ];

  const handleSelectTab = (tabId: string) => {
    setCurrentTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <header className="w-full max-w-[1380px] mx-auto pt-3 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between min-h-[79px] gap-4">
        
        {/* LEFT NAV PILLS CONTAINER (Frame 1597881228 / Rectangle 39911) */}
        <div className="flex items-center">
          <div className="flex items-center bg-white border border-[#4648D4]/5 rounded-[43.16px] p-2 sm:p-2.5 gap-6 sm:gap-10 shadow-xs overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;

              if (isActive) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className="bg-gradient-to-r from-[#7C3AED] via-[#6B38D4] to-[#5C24FF] text-white px-5 sm:px-6 py-2.5 rounded-[43.16px] font-manrope font-extrabold text-[14.84px] leading-tight flex items-center gap-2.5 shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
                  >
                    <LayoutGrid className="w-4 h-4 text-white fill-white stroke-[2.2]" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className="text-black hover:text-[#5C24FF] font-manrope font-bold text-[14.84px] leading-tight px-2 py-1 transition-colors shrink-0 cursor-pointer"
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT UTILITIES & DOCTOR PROFILE (Frame 1597881249) */}
        <div className="flex items-center gap-3 sm:gap-7 shrink-0">
          {/* Action icons group (Frame 1597881235) */}
          <div className="flex items-center gap-2.5">
            {/* Search circular button (Ellipse 2322) */}
            <button
              className="w-[51.54px] h-[51.54px] rounded-full bg-[#DDE2E8] hover:bg-[#cfd5de] text-slate-800 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              aria-label="Search"
              title="Search"
            >
              <Search className="w-5 h-5 text-slate-700 stroke-[2]" />
            </button>

            {/* Settings circular button (Ellipse 2323) */}
            <button
              className="w-[51.54px] h-[51.54px] rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              aria-label="Settings"
              title="Settings"
            >
              <Settings className="w-5 h-5 text-slate-700 stroke-[2]" />
            </button>

            {/* Bell/Notification circular button (Ellipse 2324) */}
            <button
              className="w-[51.54px] h-[51.54px] rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-700 stroke-[2]" />
            </button>
          </div>

          {/* Doctor Profile Info (Frame 1597881233) */}
          <div className="flex items-center gap-2.5 pl-1">
            <img
              src={davidBrockImg}
              alt="David Brock"
              className="w-[41.43px] h-[41.43px] rounded-full object-cover border border-[#8E8E8E]/15 shadow-xs"
            />
            <div className="hidden md:block text-left">
              <p className="text-[12.08px] font-manrope font-semibold text-[#232C2B] leading-tight">
                David Brock
              </p>
              <p className="text-[10.36px] font-manrope font-semibold text-[#232C2B]/50 leading-tight mt-0.5">
                General Physician
              </p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
