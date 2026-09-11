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
  Award,
  Zap
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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-sm">
      {/* Top Government of India & iGOT Karmayogi Strip */}
      <div className="bg-[#0F2942] text-slate-200 text-[11px] px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-medium tracking-wide">
            {/* Ashoka Stambh / Emblem Representation */}
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
      <div className="tricolor-border"></div>

      {/* Main Karmayogi Bharat & GyanMitra Header Bar */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand & Platform Identity */}
        <div
          className="flex items-center space-x-3 cursor-pointer select-none"
          onClick={() => {
            if (currentRole === 'trainer') setCurrentScreen('trainer-dashboard');
            else if (currentRole === 'admin') setCurrentScreen('admin-dashboard');
            else setCurrentScreen('dashboard');
          }}
        >
          {/* Dual Emblem Badge */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-[#1B365D] flex items-center justify-center text-white font-black shadow-md border border-blue-900 flex-shrink-0">
              <div className="text-center leading-tight">
                <span className="text-[#FF9933] text-[11px] block font-serif font-black">iGOT</span>
                <span className="text-white text-[9px] font-sans tracking-widest uppercase">Bharat</span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-extrabold text-[#1B365D] tracking-tight flex items-center space-x-1.5">
                  <span>GyanMitra</span>
                  <span className="text-amber-600 font-serif text-sm font-normal">| ज्ञानमित्र</span>
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                  MoSPI Wing
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Integrated Capacity Building Platform for Official Statistics
              </p>
            </div>
          </div>
        </div>

        {/* Global Search Bar (Karmayogi LMS Search) */}
        <div className="hidden lg:flex items-center flex-1 max-w-sm relative mx-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            placeholder={t('searchPlaceholder') || "Search courses, FRAC competencies, MoSPI guidelines..."}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#264092] focus:bg-white text-slate-800 transition-all"
          />
        </div>

        {/* Right Actions & User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Authenticated Role Status Badge */}
          <div className={`hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${roleBadge.color}`}>
            <span className={`w-2 h-2 rounded-full ${roleBadge.dot}`}></span>
            <span>{roleBadge.label}</span>
          </div>

          {/* AI Assistant Floating Trigger */}
          {currentRole !== 'admin' && (
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#1B365D] to-[#264092] text-white shadow-sm hover:shadow-md hover:from-[#152c4d] hover:to-[#1e3474] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFA730] animate-pulse" />
              <span className="hidden sm:inline">{t('aiAssistant')}</span>
            </button>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifMenuOpen(!isNotifMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-[#1B365D] hover:bg-slate-100 border border-slate-200 relative transition-colors"
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

          {/* User Profile Avatar & Karmayogi Credentials Menu */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
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
                <div className="px-4 py-2 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                  <p className="text-xs font-bold text-slate-900">{userProfile.name}</p>
                  <p className="text-[11px] text-slate-500">{userProfile.email}</p>
                  <div className="mt-1.5 flex items-center justify-between">
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
            )}
          </div>
        </div>
      </div>

      {/* Horizontal iGOT Karmayogi Hubs Bar */}
      <div className="bg-[#1B365D] text-white px-4 sm:px-6 flex items-center space-x-1 sm:space-x-2 overflow-x-auto text-xs font-semibold shadow-inner">
        {currentRole === 'employee' ? (
          <>
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                currentScreen === 'dashboard'
                  ? 'border-[#FF9933] text-white font-bold bg-white/10'
                  : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              Learn Hub
            </button>
            <button
              onClick={() => setCurrentScreen('courses')}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                currentScreen === 'courses'
                  ? 'border-[#FF9933] text-white font-bold bg-white/10'
                  : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              {t('navCourses') || "Course Catalog"}
            </button>
            <button
              onClick={() => setCurrentScreen('competencies')}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                currentScreen === 'competencies'
                  ? 'border-[#FF9933] text-white font-bold bg-white/10'
                  : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              Competency Hub (FRAC)
            </button>
            <button
              onClick={() => setCurrentScreen('skill-gaps')}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                currentScreen === 'skill-gaps'
                  ? 'border-[#FF9933] text-white font-bold bg-white/10'
                  : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              {t('navSkillGaps') || "Role Gaps"}
            </button>
            <button
              onClick={() => setCurrentScreen('assessment')}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                currentScreen === 'assessment' || currentScreen === 'quiz-taking'
                  ? 'border-[#FF9933] text-white font-bold bg-white/10'
                  : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              Assessments
            </button>
            <button
              onClick={() => setCurrentScreen('ai-quiz')}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1 ${
                currentScreen === 'ai-quiz'
                  ? 'border-[#FF9933] text-white font-bold bg-white/10'
                  : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#FFA730]" />
              <span>AI Quiz Studio</span>
            </button>
            <button
              onClick={() => setCurrentScreen('progress')}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                currentScreen === 'progress'
                  ? 'border-[#FF9933] text-white font-bold bg-white/10'
                  : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              {t('navProgress') || "Analytics"}
            </button>
          </>
        ) : currentRole === 'trainer' ? (
          <>
            <button
              onClick={() => setCurrentScreen('trainer-dashboard')}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                currentScreen === 'trainer-dashboard'
                  ? 'border-[#FF9933] text-white font-bold bg-white/10'
                  : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              NSSTA Cohort Hub
            </button>
            <button
              onClick={() => setCurrentScreen('ai-quiz')}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1 ${
                currentScreen === 'ai-quiz'
                  ? 'border-[#FF9933] text-white font-bold bg-white/10'
                  : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#FFA730]" />
              <span>AI MCQ Authoring</span>
            </button>
            <button
              onClick={() => setCurrentScreen('reports')}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                currentScreen === 'reports'
                  ? 'border-[#FF9933] text-white font-bold bg-white/10'
                  : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              Batch Reports
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setCurrentScreen('admin-dashboard')}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                currentScreen === 'admin-dashboard'
                  ? 'border-[#FF9933] text-white font-bold bg-white/10'
                  : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              MoSPI Workforce Intel Hub
            </button>
            <button
              onClick={() => setCurrentScreen('reports')}
              className={`px-3 py-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                currentScreen === 'reports'
                  ? 'border-[#FF9933] text-white font-bold bg-white/10'
                  : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              ACBP Annual Capacity Reports
            </button>
          </>
        )}
      </div>
    </header>
  );
};

