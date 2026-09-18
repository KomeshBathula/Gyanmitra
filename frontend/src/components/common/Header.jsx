import React, { useState } from 'react';
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Search,
  Globe,
  Sliders,
  Menu,
  Check,
  Zap,
  Sun,
  Moon
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
    toggleTheme
  } = useApp();

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
    <header className="sticky top-0 z-40 bg-[#0B1528] text-white border-b border-[#1E2E4A] select-none">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left: Orange Karmayogi Emblem & Hamburger */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentScreen(userProfile?.role === 'trainer' ? 'trainer-dashboard' : 'dashboard')}
          >
            {/* Orange iGOT Emblem */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center text-[#FF9933]">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 8.5H21.5L16 12.5L18 19L12 15L6 19L8 12.5L2.5 8.5H9.5L12 2Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[#FF9933] font-black text-sm sm:text-base tracking-tight leading-none font-sans font-bold">
                    GyanMitra (ज्ञानमित्र)
                  </span>
                  {userProfile?.role === 'trainer' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-900/70 text-emerald-300 border border-emerald-500/50">
                      NSSTA FACULTY
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 font-sans tracking-wide">
                  {userProfile?.role === 'trainer'
                    ? 'NSSTA Greater Noida • Faculty Portal'
                    : 'Skill Intelligence Platform • MoSPI'}
                </span>
              </div>
            </div>
          </div>

          {/* Hamburger Menu Box Button */}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg bg-[#162544] hover:bg-[#1E335A] text-slate-300 hover:text-white border border-[#1E3A6D] transition-all cursor-pointer"
            title={isSidebarOpen ? "Collapse Menu" : "Open Menu"}
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Search Bar with Blue Search Button inside */}
        <div className="flex-1 max-w-xl mx-2 sm:mx-6 hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Anything..."
              className="w-full pl-10 pr-24 py-1.5 text-xs bg-[#080E1C] border border-[#1E3A6D] rounded-full text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2087d8] transition-all"
            />
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  showToast(`Searching for: ${searchQuery}`, "info");
                  setCurrentScreen('courses');
                }
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-bold bg-[#1B365D] hover:bg-[#264092] text-white rounded-full transition-colors cursor-pointer shadow-xs"
            >
              Search
            </button>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Language Selector (EN ▾) */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#162544] hover:bg-[#1E335A] text-slate-200 border border-[#1E3A6D] transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-36 bg-[#111F38] rounded-xl shadow-xl border border-[#1E3A6D] py-1 z-50">
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
                      className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-[#162544] cursor-pointer ${
                        language === l.code ? 'text-blue-400 bg-[#162544]' : 'text-slate-300'
                      }`}
                    >
                      <span>{l.label}</span>
                      {language === l.code && <Check className="w-3.5 h-3.5 text-blue-400" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme Sun/Moon Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-300 hover:text-amber-300 hover:bg-[#162544] transition-all cursor-pointer flex items-center justify-center"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Notification Bell with 7+ Red Badge */}
          <div className="relative">
            <button
              onClick={() => setIsNotifMenuOpen(!isNotifMenuOpen)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#162544] relative transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-[#E11D48] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full flex items-center justify-center border-2 border-[#0B1528] shadow-xs">
                {unreadCount > 7 ? '7+' : unreadCount > 0 ? unreadCount : '7+'}
              </span>
            </button>

            {isNotifMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsNotifMenuOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#111F38] text-slate-200 rounded-2xl shadow-2xl border border-[#1E3A6D] py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-[#1E3A6D] flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Notifications</span>
                    <button
                      onClick={() => {
                        setCurrentScreen('notifications');
                        setIsNotifMenuOpen(false);
                      }}
                      className="text-[11px] text-blue-400 font-bold hover:underline cursor-pointer"
                    >
                      View All
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#1E3A6D]">
                    {(notifications || []).slice(0, 4).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setCurrentScreen(n.actionLink || 'notifications');
                          setIsNotifMenuOpen(false);
                        }}
                        className="p-3 hover:bg-[#162544] cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-semibold text-white">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Avatar (🟢 RM) with Green Dot */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 p-0.5 rounded-full hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center font-bold text-xs shadow-xs border-2 border-[#1E3A6D]">
                  {getInitials(userProfile?.name)}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B1528]"></span>
              </div>
            </button>

            {isProfileMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-64 bg-[#111F38] text-slate-200 rounded-2xl shadow-2xl border border-[#1E3A6D] py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-3 border-b border-[#1E3A6D] bg-[#0A1324] rounded-t-2xl">
                    <p className="text-xs font-bold text-white">{userProfile?.name || 'Statistical Officer'}</p>
                    <p className="text-[11px] text-slate-400">{userProfile?.email || 'officer@mospi.gov.in'}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-900/60 text-blue-200 border border-blue-700">
                        {userProfile?.cadre || 'MoSPI Cadre'}
                      </span>
                      {userProfile?.role === 'trainer' ? (
                        <span className="text-[10px] text-emerald-400 font-bold">
                          Course Director
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-400 font-bold flex items-center">
                          <Zap className="w-3 h-3 mr-0.5 fill-amber-400 text-amber-400" />
                          {userProfile?.karmayogiCredits ?? 799} Pts
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCurrentScreen('profile');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-[#162544] flex items-center space-x-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>{t('officialServiceProfile')}</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentScreen('settings');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-[#162544] flex items-center space-x-2 cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>{t('systemSettings')}</span>
                    </button>
                  </div>

                  <div className="border-t border-[#1E3A6D] pt-1">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        logoutUser();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/40 flex items-center space-x-2 font-medium cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>{t('signOut')}</span>
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
