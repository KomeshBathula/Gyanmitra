import React, { useEffect } from 'react';
import {
  Home,
  GraduationCap,
  Briefcase,
  Award,
  MessageSquare,
  Calendar,
  Users,
  Layers,
  Sparkles,
  Download,
  Settings,
  LogOut,
  HelpCircle,
  FileQuestion,
  TrendingUp,
  FileText,
  ShieldCheck,
  X,
  ChevronRight,
  BookOpen,
  Sliders,
  Bell,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const {
    currentScreen,
    setCurrentScreen,
    currentRole,
    userProfile,
    isSidebarOpen,
    setIsSidebarOpen,
    skillGaps,
    notifications,
    logoutUser,
    t
  } = useApp();

  const highPriorityGapsCount = skillGaps?.filter(g => g.priority === 'High')?.length || 0;
  const unreadNotifCount = notifications?.filter(n => !n.read)?.length || 0;

  // Handle ESC key to close sidebar smoothly
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen, setIsSidebarOpen]);

  // Icon rail items matching official iGOT Karmayogi Bharat layout (Light theme)
  const iconRailItems = [
    {
      id: currentRole === 'trainer' ? 'trainer-dashboard' : currentRole === 'admin' ? 'admin-dashboard' : 'dashboard',
      label: 'Home',
      icon: Home,
      screenMatches: ['dashboard', 'trainer-dashboard', 'admin-dashboard']
    },
    {
      id: 'courses',
      label: 'Learn',
      icon: GraduationCap,
      screenMatches: ['courses', 'learning-path']
    },
    {
      id: 'competencies',
      label: 'Competency',
      icon: Award,
      screenMatches: ['competencies', 'skill-gaps']
    },
    {
      id: 'assessment',
      label: 'Assessment',
      icon: Calendar,
      screenMatches: ['assessment', 'quiz-taking', 'quiz-results']
    },
    {
      id: 'ai-quiz',
      label: 'AI Studio',
      icon: Sparkles,
      badge: 'AI',
      screenMatches: ['ai-quiz']
    },
    {
      id: 'ai-assistant',
      label: 'Discuss',
      icon: MessageSquare,
      screenMatches: ['ai-assistant']
    },
    {
      id: 'progress',
      label: 'Network',
      icon: Users,
      screenMatches: ['progress', 'reports']
    }
  ];

  // Detailed menu hubs when expanded (Authentic light theme matching iGOT Karmayogi)
  const expandedNavHubs = [
    {
      title: "Learn Hub",
      items: [
        { id: "dashboard", label: t('navDashboard') || "Employee Dashboard", icon: Home },
        { id: "courses", label: "Karma Programs (All Programs)", icon: GraduationCap, badge: "8 Tracks", badgeColor: "blue" },
        { id: "learning-path", label: t('navLearningPath') || "Adaptive Learning Pathway", icon: Layers, badge: "AI Dynamic", badgeColor: "amber" },
      ]
    },
    {
      title: "Competency Hub (FRAC)",
      items: [
        { id: "competencies", label: t('navCompetencies') || "My FRAC Competencies", icon: Award },
        { id: "skill-gaps", label: t('navSkillGaps') || "Role Skill Gap Analysis", icon: Layers, badge: highPriorityGapsCount > 0 ? `${highPriorityGapsCount} High` : null, badgeColor: "red" },
        { id: "assessment", label: t('takeAssessmentBtn') || "Adaptive Skill Assessment", icon: Calendar },
        { id: "progress", label: t('navProgress') || "Learning Analytics & Progress", icon: TrendingUp },
      ]
    },
    {
      title: "AI Studio & Capacity Tools",
      items: [
        { id: "ai-quiz", label: t('navAiQuiz') || "AI MCQ Authoring Studio", icon: FileQuestion, badge: "RAG", badgeColor: "purple" },
        { id: "ai-assistant", label: "GyanMitra AI Assistant", icon: Sparkles },
      ]
    },
    {
      title: "Service Record & System",
      items: [
        { id: "notifications", label: t('notificationsTitle') || "MoSPI Mandates & Notifications", icon: Bell, badge: unreadNotifCount > 0 ? `${unreadNotifCount}` : null, badgeColor: "amber" },
        { id: "profile-wizard", label: t('cadreSkillWizard') || "Cadre Competency Setup", icon: Sliders },
        { id: "profile", label: t('officialServiceProfile') || "Official Service Profile", icon: Settings },
      ]
    }
  ];

  return (
    <>
      {/* 1. SLIM ICON RAIL - AUTHENTIC LIGHT THEME (Shown when sidebar is collapsed on desktop) */}
      <aside className="hidden md:flex w-20 bg-white text-slate-700 flex-col flex-shrink-0 min-h-[calc(100vh-69px)] border-r border-slate-200 select-none py-3 justify-between items-center z-30 shadow-xs">
        {/* Navigation Icons Stack */}
        <div className="w-full flex flex-col items-center space-y-2">
          {iconRailItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.screenMatches.includes(currentScreen);

            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`w-16 h-14 flex flex-col items-center justify-center rounded-xl transition-all duration-200 group relative cursor-pointer ${
                  isActive
                    ? 'bg-[#E8F4FD] text-[#0074CB] font-bold shadow-xs border border-blue-200'
                    : 'text-slate-600 hover:text-[#0074CB] hover:bg-slate-100'
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-[#0074CB]' : 'text-slate-500 group-hover:text-[#0074CB]'}`} />
                <span className={`text-[10px] font-semibold tracking-tight mt-1 truncate max-w-[58px] ${isActive ? 'text-[#0074CB]' : 'text-slate-600 group-hover:text-[#0074CB]'}`}>
                  {item.label}
                </span>

                {item.badge && !isActive && (
                  <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Action Stack */}
        <div className="w-full flex flex-col items-center space-y-2 pt-3 border-t border-slate-200">
          <a
            href="https://play.google.com/store/apps/details?id=igot.karmayogi.gov.in"
            target="_blank"
            rel="noreferrer"
            className="w-16 h-12 flex flex-col items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
            title="Download Karmayogi App"
          >
            <Download className="w-4 h-4" />
            <span className="text-[9px] font-semibold mt-0.5">App</span>
          </a>

          <button
            onClick={() => setCurrentScreen('settings')}
            className={`w-16 h-12 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer ${
              currentScreen === 'settings' || currentScreen === 'profile'
                ? 'bg-[#E8F4FD] text-[#0074CB] font-bold border border-blue-200'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
            title="Settings"
          >
            <Settings className="w-4 h-4" />
            <span className="text-[9px] font-semibold mt-0.5">Settings</span>
          </button>

          <button
            onClick={logoutUser}
            className="w-16 h-12 flex flex-col items-center justify-center rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-[9px] font-semibold mt-0.5">Exit</span>
          </button>
        </div>
      </aside>

      {/* 2. EXPANDED FULL SIDEBAR DRAWER - AUTHENTIC LIGHT THEME WITH SMOOTH ANIMATION */}
      <div
        className={`fixed inset-0 z-50 transition-visibility duration-300 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop overlay with smooth fade */}
        <div
          className={`fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sliding Drawer Container with smooth slide-in/out */}
        <div
          className={`relative w-80 max-w-[85vw] bg-white text-slate-800 h-full shadow-2xl flex flex-col z-10 border-r border-slate-200 transform transition-transform duration-300 ease-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Drawer Header (Light Theme) */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1B365D] flex items-center justify-center text-white shadow-xs border border-blue-900">
                <div className="text-center leading-none">
                  <span className="text-[#FF9933] text-[10px] block font-serif font-black">iGOT</span>
                  <span className="text-white text-[7px] font-sans tracking-wider uppercase">Bharat</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#1B365D] leading-tight">iGOT Navigation</h3>
                <span className="text-[10px] text-amber-600 font-semibold">Mission Karmayogi • MoSPI</span>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors cursor-pointer"
              title="Close Navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card (Light Theme) */}
          <div className="p-3.5 mx-3 mt-3 bg-gradient-to-r from-blue-50/90 to-indigo-50/70 rounded-2xl border border-blue-200/80 flex items-center justify-between shadow-2xs">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1B365D] to-[#2087d8] text-white flex items-center justify-center text-xs font-bold shadow-xs border-2 border-white flex-shrink-0">
                {userProfile.name?.substring(0, 2).toUpperCase() || 'RK'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-[#1B365D] leading-tight truncate">{userProfile.name}</p>
                <p className="text-[10px] text-slate-500 font-medium truncate">{userProfile.cadre}</p>
              </div>
            </div>
            <div className="text-[10px] text-amber-700 font-bold flex items-center bg-white px-2 py-1 rounded-full border border-amber-300 shadow-2xs flex-shrink-0 ml-1">
              <Zap className="w-3 h-3 mr-0.5 fill-amber-500 text-amber-500" />
              {userProfile.karmayogiCredits || 1250} Pts
            </div>
          </div>

          {/* Nav Categories List (Light Theme) */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {expandedNavHubs.map((hub, hIdx) => (
              <div key={hIdx} className="space-y-1">
                <h4 className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {hub.title}
                </h4>
                <div className="space-y-0.5 pt-1">
                  {hub.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentScreen === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentScreen(item.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group cursor-pointer ${
                          isActive
                            ? 'bg-[#E8F4FD] text-[#0074CB] font-bold shadow-xs border-l-4 border-[#0074CB]'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-[#0074CB]'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-[#0074CB]' : 'text-slate-500 group-hover:text-[#0074CB]'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 ${
                              item.badgeColor === 'red'
                                ? 'bg-red-100 text-red-700 border border-red-200'
                                : item.badgeColor === 'blue'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : item.badgeColor === 'purple'
                                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Actions (Light Theme) */}
          <div className="p-3 border-t border-slate-200 bg-slate-50/80 space-y-2">
            <a
              href="https://play.google.com/store/apps/details?id=igot.karmayogi.gov.in"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-800 rounded-xl border border-slate-300 flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-4 h-4 text-amber-600" />
              <span>Download iGOT Mobile App</span>
            </a>

            <button
              onClick={() => {
                setIsSidebarOpen(false);
                logoutUser();
              }}
              className="w-full py-2 px-3 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>{t('signOut')}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
