import React, { useEffect, useRef, useState } from 'react';
import { Search, Settings, Bell, LayoutGrid, Menu, X } from 'lucide-react';
import davidBrockImg from '../assets/images/david_brock.jpg';

interface TopNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  /**
   * Max-width utility for the bar, so each screen can align the nav with its
   * own content column. Defaults to the original 1380px used by
   * AIConciergePage; AiSuggestionPage passes 1411px because its reference puts
   * the nav flush with the 1347px hero row.
   */
  containerClassName?: string;
}

const NAV_ITEMS = [
  { id: 'Dashboard', label: 'Dashboard' },
  { id: 'Appointment', label: 'Appointment' },
  { id: 'Patient', label: 'Patient' },
  { id: 'Reports', label: 'Reports' },
  { id: 'Chats', label: 'Chats' },
  { id: 'Billing', label: 'Billing' },
];

const DESKTOP_UTILITIES = [
  { id: 'search', label: 'Search', Icon: Search },
  { id: 'settings', label: 'Settings', Icon: Settings },
  { id: 'notifications', label: 'Notifications', Icon: Bell },
];

/**
 * Shared between AiSuggestionPage and AIConciergePage.
 *
 * Two references, two bars:
 *  - desktop (>= xl): pill nav + three 51.54px utility circles + avatar with
 *    name and specialty. The desktop row is intrinsically ~1064px wide, so it
 *    only renders from `xl` upward.
 *  - mobile (< xl): 40px rounded-square hamburger on the left; search circle,
 *    bare bell, and avatar with name on the right. No settings control, per the
 *    mobile reference. Nav items move into a drawer.
 */
export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab = 'Dashboard',
  onTabChange,
  containerClassName = 'max-w-[1380px]',
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSelectTab = (tabId: string) => {
    setIsDrawerOpen(false);
    if (onTabChange) onTabChange(tabId);
  };

  // Escape to close, focus trap, and body scroll lock while the drawer is open.
  useEffect(() => {
    if (!isDrawerOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const focusablesIn = (root: HTMLElement) =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'));

    if (drawerRef.current) focusablesIn(drawerRef.current)[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setIsDrawerOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !drawerRef.current) return;

      const focusable = focusablesIn(drawerRef.current);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = overflow;
      // Restore focus to the trigger explicitly rather than to whatever held
      // focus at open time, which is unreliable for programmatic opens.
      menuButtonRef.current?.focus();
    };
  }, [isDrawerOpen]);

  return (
    <header className={`w-full ${containerClassName} mx-auto pt-3 px-4 sm:px-6 lg:px-8`}>
      <div className="flex items-center justify-between min-h-[64px] xl:min-h-[79px] gap-3">

        {/* LEFT: MENU TRIGGER (below xl) + DESKTOP NAV PILLS (xl and up) */}
        <div className="flex items-center min-w-0">
          {/* Mobile / tablet menu trigger — 40px visual, 44px hit area */}
          <button
            type="button"
            ref={menuButtonRef}
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isDrawerOpen}
            aria-controls="primary-navigation-drawer"
            className="relative xl:hidden w-10 h-10 rounded-[14px] bg-[#F2F2F2] hover:bg-[#e8e8e8] flex items-center justify-center text-[#424754] transition-colors cursor-pointer shrink-0 after:absolute after:-inset-[2px] after:content-['']"
          >
            <Menu className="w-5 h-5 stroke-[2.4]" aria-hidden="true" />
          </button>

          {/* DESKTOP NAV PILLS CONTAINER (Frame 1597881228 / Rectangle 39911) */}
          <nav
            aria-label="Primary navigation"
            className="hidden xl:flex items-center bg-white border border-[#4648D4]/5 rounded-[43.16px] p-2 sm:p-2.5 gap-6 sm:gap-10 shadow-xs"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;

              if (isActive) {
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    aria-current="page"
                    className="bg-[linear-gradient(125deg,#433FE2_0%,#9E77FD_100%)] text-white px-5 sm:px-6 py-3.5 rounded-[43.16px] font-manrope font-extrabold text-[14.84px] leading-tight flex items-center gap-2.5 shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
                  >
                    <LayoutGrid className="w-4 h-4 text-white fill-white stroke-[2.2]" aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  /* 44px hit area via ::after; the reference's compact 26.5px pill
                     height is preserved exactly. */
                  className="relative text-black hover:text-[#5C24FF] font-manrope font-bold text-[14.84px] leading-tight px-2 py-1 transition-colors shrink-0 cursor-pointer after:absolute after:-inset-y-[9px] after:-inset-x-2 after:content-['']"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* RIGHT UTILITIES & DOCTOR PROFILE (Frame 1597881249) */}
        <div className="flex items-center gap-3 sm:gap-5 xl:gap-7 shrink-0 min-w-0">

          {/* Mobile utilities: search circle + bare bell (no settings in the reference) */}
          <div className="flex xl:hidden items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              title="Search"
              className="relative w-10 h-10 rounded-full bg-[#F0F0F0] hover:bg-[#e6e6e6] flex items-center justify-center text-[#191C1D] transition-colors cursor-pointer shrink-0 after:absolute after:-inset-[2px] after:content-['']"
            >
              <Search className="w-[18px] h-[18px] stroke-[2.4]" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Notifications"
              title="Notifications"
              className="relative w-11 h-11 -mx-1.5 flex items-center justify-center text-[#64748B] hover:text-[#475569] transition-colors cursor-pointer shrink-0"
            >
              <Bell className="w-[19px] h-[19px] fill-current stroke-[1.6]" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop utilities (Frame 1597881235) */}
          <div className="hidden xl:flex items-center gap-2.5">
            {DESKTOP_UTILITIES.map(({ id, label, Icon }) => (
              <button
                type="button"
                key={id}
                className={`w-[51.54px] h-[51.54px] rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  id === 'search'
                    ? 'bg-[#DDE2E8] hover:bg-[#cfd5de] text-slate-800'
                    : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs'
                }`}
                aria-label={label}
                title={label}
              >
                <Icon className="w-5 h-5 text-slate-700 stroke-[2]" aria-hidden="true" />
              </button>
            ))}
          </div>

          {/* Doctor Profile Info (Frame 1597881233) */}
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={davidBrockImg}
              alt="David Brock"
              width={41}
              height={41}
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.visibility = 'hidden';
              }}
              className="w-10 h-10 xl:w-[41.43px] xl:h-[41.43px] rounded-full object-cover border border-[#8E8E8E]/15 shadow-xs shrink-0"
            />
            <div className="hidden min-[380px]:block text-left min-w-0">
              <p className="text-[13px] xl:text-[12.08px] font-manrope font-bold xl:font-semibold text-[#232C2B] leading-tight truncate">
                David Brock
              </p>
              <p className="text-[11px] xl:text-[10.36px] font-manrope font-medium xl:font-semibold text-[#232C2B]/50 leading-tight mt-0.5 truncate">
                <span className="xl:hidden">Free user</span>
                <span className="hidden xl:inline">General Physician</span>
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* MOBILE / TABLET NAVIGATION DRAWER */}
      {isDrawerOpen && (
        <div className="xl:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-[#0B1C30]/40 animate-backdrop-in"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />

          <div
            id="primary-navigation-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Primary navigation"
            className="absolute inset-x-0 top-0 max-h-full overflow-y-auto bg-white rounded-b-[24px] shadow-2xl p-4 animate-drawer-in"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-manrope font-extrabold text-[16px] text-[#0B1C30] px-2">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close navigation menu"
                className="w-11 h-11 rounded-full flex items-center justify-center text-[#0B1C30] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Primary navigation" className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full min-h-[48px] px-4 rounded-[16px] font-manrope text-[14.84px] leading-tight flex items-center gap-2.5 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[linear-gradient(125deg,#433FE2_0%,#9E77FD_100%)] text-white font-extrabold shadow-md'
                        : 'text-black font-bold hover:bg-slate-50'
                    }`}
                  >
                    {isActive && (
                      <LayoutGrid className="w-4 h-4 text-white fill-white stroke-[2.2]" aria-hidden="true" />
                    )}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Settings is not part of the mobile bar, so it lives in the drawer */}
            <div className="mt-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                aria-label="Settings"
                className="w-full min-h-[48px] px-4 rounded-[16px] font-manrope font-bold text-[14.84px] text-black hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <Settings className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
