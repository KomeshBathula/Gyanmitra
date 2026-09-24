import React, { useState } from 'react';
import {
  Bell,
  ChevronDown,
  Sun,
  Moon,
  Check,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const {
    currentRole,
    userProfile,
    currentScreen,
    setCurrentScreen,
    notifications,
    setIsAiDrawerOpen,
    isSidebarOpen,
    toggleSidebar,
    language,
    setLanguage,
    t,
    logoutUser,
    showToast,
    theme,
    toggleTheme,
    fontScale,
    setFontScale
  } = useApp();

  const handleFontDecrease = () => {
    const next = Math.max(90, fontScale - 10);
    setFontScale(next);
    showToast(`Font size set to ${next}%`, "info");
  };

  const handleFontReset = () => {
    setFontScale(100);
    showToast("Font size reset to 100%", "info");
  };

  const handleFontIncrease = () => {
    const next = Math.min(150, fontScale + 10);
    setFontScale(next);
    showToast(`Font size set to ${next}%`, "info");
  };

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications?.filter(n => !n.read)?.length || 0;

  const getInitials = (name) => {
    if (!name) return 'RM';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B3A63] text-white border-b border-[#12304A] select-none">
      {/* Top tricolor stripe */}
      <div className="h-0.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Logo & Portal Name */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div
            className="flex items-center space-x-2.5 cursor-pointer"
            onClick={() => setCurrentScreen(userProfile?.role === 'trainer' ? 'trainer-dashboard' : 'dashboard')}
          >
            {/* Ashoka Chakra placeholder */}
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
              <span className="text-[#FF9933] font-black text-sm leading-none">G</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm sm:text-base tracking-tight leading-tight">
                GyanMitra
                {userProfile?.role === 'trainer' && (
                  <span className="ml-1.5 text-[10px] font-semibold text-blue-200">(Admin)</span>
                )}
              </span>
              <span className="text-[10px] text-blue-200 tracking-wide leading-tight">
                {userProfile?.role === 'trainer'
                  ? 'Ministry Administration Console'
                  : 'iGOT Karmayogi · MoSPI Capacity Building'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-lg mx-2 sm:mx-6 hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-blue-200 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, competencies..."
              className="w-full pl-9 pr-20 py-1.5 text-xs bg-white/10 border border-white/20 rounded text-white placeholder-blue-200 focus:outline-none focus:ring-1 focus:ring-white/40 transition-all"
            />
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  showToast(`Searching for: ${searchQuery}`, "info");
                  setCurrentScreen('courses');
                }
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-semibold bg-white/15 hover:bg-white/25 text-white rounded border border-white/20 transition-colors cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center space-x-1 sm:space-x-2">

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded text-xs font-semibold text-blue-100 hover:bg-white/10 border border-white/20 transition-colors cursor-pointer"
            >
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isLangMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)} />
                <div className="absolute right-0 mt-1 w-36 bg-white rounded border border-[#D5DCE3] shadow-md py-1 z-50">
                  {[
                    { code: 'en', label: 'English (EN)' },
                    { code: 'hi', label: 'हिन्दी (HI)' },
                    { code: 'te', label: 'తెలుగు (TE)' }
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#EEF2F5] cursor-pointer ${
                        language === l.code ? 'text-[#0B3A63] font-semibold' : 'text-[#1F2933]'
                      }`}
                    >
                      <span>{l.label}</span>
                      {language === l.code && <Check className="w-3.5 h-3.5 text-[#0B3A63]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Accessibility Font Size Control */}
          <div className="hidden sm:flex items-center space-x-0.5 bg-white/10 p-0.5 rounded border border-white/20 text-[11px] font-semibold">
            <button
              onClick={handleFontDecrease}
              className="px-1.5 py-0.5 text-blue-100 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={handleFontReset}
              className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                fontScale === 100 ? 'bg-white/20 text-white font-bold' : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
              title="Reset Font Size (100%)"
            >
              A
            </button>
            <button
              onClick={handleFontIncrease}
              className="px-1.5 py-0.5 text-blue-100 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded text-blue-100 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifMenuOpen(!isNotifMenuOpen)}
              className="p-1.5 rounded text-blue-100 hover:text-white hover:bg-white/10 relative transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {(unreadCount > 0 || true) && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount > 0 ? unreadCount : '7'}
                </span>
              )}
            </button>

            {isNotifMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsNotifMenuOpen(false)} />
                <div className="absolute right-0 mt-1 w-80 sm:w-96 bg-white rounded border border-[#D5DCE3] shadow-md py-0 z-50">
                  <div className="px-4 py-2.5 border-b border-[#D5DCE3] flex items-center justify-between bg-[#EEF2F5]">
                    <span className="text-xs font-semibold text-[#1F2933]">Notifications</span>
                    <button
                      onClick={() => {
                        setCurrentScreen('notifications');
                        setIsNotifMenuOpen(false);
                      }}
                      className="text-[11px] text-[#0B3A63] font-semibold hover:underline cursor-pointer"
                    >
                      View All
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-[#D5DCE3]">
                    {(notifications || []).slice(0, 4).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setCurrentScreen(n.actionLink || 'notifications');
                          setIsNotifMenuOpen(false);
                        }}
                        className="p-3 hover:bg-[#EEF2F5] cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-semibold text-[#1F2933]">{n.title}</p>
                          <span className="text-[10px] text-[#5B6773] ml-2 whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-[#5B6773] mt-0.5 line-clamp-2">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded bg-[#2E7D32] text-white flex items-center justify-center font-bold text-xs">
                {getInitials(userProfile?.name)}
              </div>
              <span className="text-xs text-blue-100 font-medium hidden sm:block max-w-[80px] truncate">
                {userProfile?.name?.split(' ')[0] || 'Officer'}
              </span>
              <ChevronDown className="w-3 h-3 text-blue-200" />
            </button>

            {isProfileMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)} />
                <div className="absolute right-0 mt-1 w-64 bg-white rounded border border-[#D5DCE3] shadow-md z-50">
                  {/* Profile Info */}
                  <div className="px-4 py-3 border-b border-[#D5DCE3] bg-[#EEF2F5]">
                    <p className="text-xs font-semibold text-[#1F2933]">{userProfile?.name || 'Statistical Officer'}</p>
                    <p className="text-[11px] text-[#5B6773]">{userProfile?.email || 'officer@mospi.gov.in'}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#0B3A63] text-white">
                        {userProfile?.cadre || 'MoSPI Cadre'}
                      </span>
                      <span className="text-[10px] text-[#5B6773]">
                        {userProfile?.karmayogiCredits ?? 799} Karma Pts
                      </span>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCurrentScreen('profile');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#1F2933] hover:bg-[#EEF2F5] cursor-pointer"
                    >
                      {t('officialServiceProfile')}
                    </button>
                    <button
                      onClick={() => {
                        setCurrentScreen('settings');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#1F2933] hover:bg-[#EEF2F5] cursor-pointer"
                    >
                      {t('systemSettings')}
                    </button>
                  </div>

                  <div className="border-t border-[#D5DCE3] py-1">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        logoutUser();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                    >
                      {t('signOut')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
