import React, { useState } from 'react';
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
  Type
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

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      {/* Top MoSPI / GoI Strip */}
      <div className="bg-gov-dark text-slate-200 text-[11px] px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t('govIndia')}</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-300">
            {t('mospiMinistry')}
          </span>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="hidden md:inline-flex items-center text-slate-300 text-xs">
            <Shield className="w-3 h-3 mr-1 text-amber-400" />
            {t('parichaySso')}
          </span>

          {/* Multilingual Selector: English | हिन्दी | తెలుగు */}
          <div className="flex items-center space-x-1 bg-slate-800/90 p-0.5 rounded-lg border border-slate-700 text-[11px]">
            <Globe className="w-3.5 h-3.5 text-blue-400 ml-1.5 mr-0.5" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                language === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
              title="English"
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                language === 'hi' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
              title="हिन्दी (Hindi)"
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
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
      <div className="h-0.5 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

      {/* Main Header Bar */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Logo & Title */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => {
            if (currentRole === 'trainer') setCurrentScreen('trainer-dashboard');
            else if (currentRole === 'admin') setCurrentScreen('admin-dashboard');
            else setCurrentScreen('dashboard');
          }}
        >
          <div className="w-10 h-10 rounded-lg bg-gov-navy flex items-center justify-center text-white font-bold shadow-gov border border-slate-700 flex-shrink-0">
            <div className="text-center leading-none">
              <span className="text-amber-400 text-xs block font-serif">ज्ञान</span>
              <span className="text-white text-[10px] font-sans tracking-tight">MITRA</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-extrabold text-gov-navy tracking-tight">GyanMitra</h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                MoSPI AI Intel
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block">
              {t('tagline')}
            </p>
          </div>
        </div>

        {/* Global Search Bar (Desktop) */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs relative mx-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800"
          />
        </div>

        {/* Right Tools & User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Authenticated Role Status Badge (No public switcher) */}
          <div className={`hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${roleBadge.color}`}>
            <span className={`w-2 h-2 rounded-full ${roleBadge.dot}`}></span>
            <span>{roleBadge.label}</span>
          </div>

          {/* AI Assistant Button */}
          {currentRole !== 'admin' && (
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-gov hover:from-blue-800 hover:to-indigo-900 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">{t('aiAssistant')}</span>
            </button>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifMenuOpen(!isNotifMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-gov-navy hover:bg-slate-100 border border-slate-200 relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{t('notificationsTitle')}</span>
                  <button
                    onClick={() => {
                      setCurrentScreen('notifications');
                      setIsNotifMenuOpen(false);
                    }}
                    className="text-[11px] text-blue-600 font-semibold hover:underline"
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
            )}
          </div>

          {/* User Profile Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-7 h-7 rounded-md object-cover border border-slate-300"
              />
              <div className="hidden xl:block text-left pr-1">
                <p className="text-xs font-bold text-slate-900 leading-tight">{userProfile.name}</p>
                <p className="text-[10px] text-slate-500 leading-tight">{userProfile.designation}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{userProfile.name}</p>
                  <p className="text-[11px] text-slate-500">{userProfile.email}</p>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800">
                      {userProfile.cadre}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">
                      {userProfile.karmayogiCredits} {t('credits')}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setCurrentScreen('profile');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
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
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
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
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
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
                    className="w-full text-left px-4 py-2 text-xs text-rose-700 hover:bg-rose-50 flex items-center space-x-2 font-medium"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>{t('signOut')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
