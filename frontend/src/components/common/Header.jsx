import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Sparkles,
  Shield,
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
  BookOpen,
  Calendar,
  Users,
  FolderGit2,
  Share2
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
    language,
    setLanguage,
    t,
    logoutUser,
    showToast
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isSearchCategoryOpen, setIsSearchCategoryOpen] = useState(false);
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('Content');
  const [searchQuery, setSearchQuery] = useState('');

  const searchCategories = [
    { id: 'Content', label: 'Content', icon: BookOpen },
    { id: 'Events', label: 'Events', icon: Calendar },
    { id: 'People', label: 'People', icon: Users },
    { id: 'External Contents', label: 'External Contents', icon: Share2 },
    { id: 'Communities', label: 'Communities', icon: Users },
    { id: 'Resources', label: 'Resources', icon: FolderGit2 },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getRoleBadge = () => {
    if (currentRole === 'admin') {
      return {
        label: t('adminRole') || "MoSPI System Admin",
        color: "bg-purple-100 text-purple-900 border-purple-300",
        dot: "bg-purple-600"
      };
    }
    if (currentRole === 'trainer') {
      return {
        label: t('trainerRole') || "NSSTA Faculty / Trainer",
        color: "bg-emerald-100 text-emerald-900 border-emerald-300",
        dot: "bg-emerald-600"
      };
    }
    return {
      label: t('officialRole') || "Government Official (ISS)",
      color: "bg-blue-100 text-blue-900 border-blue-300",
      dot: "bg-blue-600"
    };
  };

  const roleBadge = getRoleBadge();

  // Get initials for circular avatar
  const getInitials = (name) => {
    if (!name) return 'RK';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
      {/* Top Government of India & iGOT Karmayogi Strip */}
      <div className="bg-[#0F2942] text-slate-200 text-[11px] px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white font-semibold">{t('govIndia')}</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-300 font-medium">
            कर्मयोगी भारत • Karmayogi Bharat
          </span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="hidden md:inline text-slate-400 text-[10px]">
            {t('mospiMinistry')}
          </span>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* KarmaPoints Chip */}
          <div className="hidden lg:flex items-center space-x-1 bg-amber-950/60 border border-amber-600/40 text-amber-300 px-2 py-0.5 rounded-full text-[11px] font-bold shadow-xs">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{userProfile.karmayogiCredits || 1250}</span>
            <span className="text-amber-200/70 text-[10px] font-normal">KarmaPoints</span>
          </div>

          {/* Parichay SSO Indicator */}
          <span className="hidden sm:inline-flex items-center text-slate-300 text-[11px] bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            <Shield className="w-3 h-3 mr-1 text-amber-400" />
            {t('parichaySso')}
          </span>

          {/* Multilingual Selector: English | हिन्दी | తెలుగు */}
          <div className="flex items-center space-x-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[11px]">
            <Globe className="w-3.5 h-3.5 text-blue-400 ml-1.5 mr-0.5" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                language === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                language === 'hi' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
              title="हिन्दी (Hindi)"
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                language === 'te' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
              title="తెలుగు (Telugu)"
            >
              తెలుగు
            </button>
          </div>
        </div>
      </div>

      {/* Tricolor Accent Stripe */}
      <div className="tricolor-border"></div>

      {/* Main iGOT Karmayogi Navigation Header */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6 bg-white">
        {/* Left: Hamburger & Brand Identity */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => {
              if (currentRole === 'trainer') setCurrentScreen('trainer-dashboard');
              else if (currentRole === 'admin') setCurrentScreen('admin-dashboard');
              else setCurrentScreen('dashboard');
            }}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Menu"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>

          <div
            className="flex items-center space-x-2.5 cursor-pointer select-none"
            onClick={() => {
              if (currentRole === 'trainer') setCurrentScreen('trainer-dashboard');
              else if (currentRole === 'admin') setCurrentScreen('admin-dashboard');
              else setCurrentScreen('dashboard');
            }}
          >
            {/* iGOT Emblem Badge */}
            <div className="w-9 h-9 rounded-xl bg-[#1B365D] flex items-center justify-center text-white shadow-sm border border-blue-900 flex-shrink-0">
              <div className="text-center leading-none">
                <span className="text-[#FF9933] text-[10px] block font-serif font-black">iGOT</span>
                <span className="text-white text-[8px] font-sans tracking-widest uppercase">Bharat</span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-extrabold text-[#1B365D] tracking-tight flex items-center space-x-1.5">
                  <span>GyanMitra</span>
                  <span className="text-amber-600 font-serif text-sm font-normal">| ज्ञानमित्र</span>
                </h1>
                <span className="hidden lg:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                  MoSPI Wing
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden xl:block font-medium">
                Civil Services Competency & Statistical Training Portal
              </p>
            </div>
          </div>
        </div>

        {/* Center: iGOT Style "Search Anything..." Pill with Category Filter Popover */}
        <div className="relative flex-1 max-w-xl mx-2 sm:mx-4 hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchCategoryOpen(true)}
              placeholder={`Search Anything in ${selectedSearchCategory}...`}
              className="w-full pl-10 pr-28 py-2 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2087d8] focus:bg-white text-slate-800 transition-all shadow-inner"
            />
            {/* Category Dropdown Trigger inside input */}
            <button
              onClick={() => setIsSearchCategoryOpen(!isSearchCategoryOpen)}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-white hover:bg-slate-100 rounded-full border border-slate-200 flex items-center space-x-1 cursor-pointer transition-colors shadow-2xs"
            >
              <span className="truncate max-w-[80px]">{selectedSearchCategory}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          {/* Search Category Popover */}
          {isSearchCategoryOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsSearchCategoryOpen(false)}
              ></div>
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                  Search Categories
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {searchCategories.map((cat) => {
                    const CatIcon = cat.icon;
                    const isSelected = selectedSearchCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedSearchCategory(cat.id);
                          setIsSearchCategoryOpen(false);
                        }}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2087d8] text-white shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <CatIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                        <span className="truncate">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Actions: Role badge, Language Selector, Notifications (9+), User Avatar (RK) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Authenticated Role Status Badge */}
          <div className={`hidden lg:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${roleBadge.color}`}>
            <span className={`w-2 h-2 rounded-full ${roleBadge.dot}`}></span>
            <span>{roleBadge.label}</span>
          </div>

          {/* AI Assistant Quick Trigger */}
          {currentRole !== 'admin' && (
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold bg-[#1B365D] hover:bg-[#152c4d] text-white shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF9933] animate-pulse" />
              <span className="hidden sm:inline">AI Helper</span>
            </button>
          )}

          {/* Language Switcher Pill (EN ▾) */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50">
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
                      className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                        language === l.code ? 'text-blue-700 bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{l.label}</span>
                      {language === l.code && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Notification Bell with 9+ Red Pill */}
          <div className="relative">
            <button
              onClick={() => setIsNotifMenuOpen(!isNotifMenuOpen)}
              className="p-2 rounded-full text-slate-600 hover:text-[#1B365D] hover:bg-slate-100 border border-slate-200 relative transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-[#E11D48] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {unreadCount > 9 ? '9+' : unreadCount > 0 ? unreadCount : '9+'}
              </span>
            </button>

            {isNotifMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsNotifMenuOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{t('notificationsTitle')}</span>
                    <button
                      onClick={() => {
                        setCurrentScreen('notifications');
                        setIsNotifMenuOpen(false);
                      }}
                      className="text-[11px] text-[#2087d8] font-bold hover:underline cursor-pointer"
                    >
                      {t('viewAll')}
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.slice(0, 4).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setCurrentScreen(n.actionLink || 'notifications');
                          setIsNotifMenuOpen(false);
                        }}
                        className="p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Avatar with Green Dot & Initials (🟢 RK) */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1B365D] to-[#2087d8] text-white flex items-center justify-center font-bold text-xs shadow-xs border-2 border-white">
                  {getInitials(userProfile.name)}
                </div>
                {/* Green Active Dot */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
            </button>

            {isProfileMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 rounded-t-2xl">
                    <p className="text-xs font-bold text-slate-900">{userProfile.name}</p>
                    <p className="text-[11px] text-slate-500">{userProfile.email}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-900 border border-blue-200">
                        {userProfile.cadre}
                      </span>
                      <span className="text-[10px] text-amber-700 font-bold flex items-center">
                        <Zap className="w-3 h-3 mr-0.5 fill-amber-500 text-amber-500" />
                        {userProfile.karmayogiCredits || 1250} Pts
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCurrentScreen('profile');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>{t('officialServiceProfile')}</span>
                    </button>
                    {currentRole === 'employee' && (
                      <button
                        onClick={() => {
                          setCurrentScreen('profile-wizard');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                      >
                        <Sliders className="w-4 h-4 text-slate-500" />
                        <span>{t('cadreSkillWizard')}</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setCurrentScreen('settings');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span>{t('systemSettings')}</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        logoutUser();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-700 hover:bg-rose-50 flex items-center space-x-2 font-medium cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-600" />
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
