import React from 'react';
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
  Zap
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

  // Icon rail items matching official iGOT Karmayogi Bharat layout
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

  // Detailed menu hubs when expanded
  const expandedNavHubs = [
    {
      title: "Learn Hub",
      items: [
        { id: "dashboard", label: t('navDashboard') || "Dashboard & Progress", icon: Home },
        { id: "courses", label: "Karma Programs (All Programs)", icon: GraduationCap, badge: "8 Tracks", badgeColor: "blue" },
        { id: "learning-path", label: t('navLearningPath') || "Adaptive Learning Path", icon: Layers, badge: "AI Dynamic", badgeColor: "amber" },
      ]
    },
    {
      title: "Competency Hub (FRAC)",
      items: [
        { id: "competencies", label: t('navCompetencies') || "FRAC Competencies Matrix", icon: Award },
        { id: "skill-gaps", label: t('navSkillGaps') || "Role Gap Analysis", icon: Layers, badge: highPriorityGapsCount > 0 ? `${highPriorityGapsCount} High` : null, badgeColor: "red" },
        { id: "assessment", label: t('takeAssessment') || "Adaptive Assessments", icon: Calendar },
        { id: "progress", label: t('navProgress') || "Learning Analytics", icon: TrendingUp },
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
        { id: "notifications", label: t('notificationsTitle') || "Notification Center", icon: Bell, badge: unreadNotifCount > 0 ? `${unreadNotifCount}` : null, badgeColor: "amber" },
        { id: "profile-wizard", label: t('cadreSkillWizard') || "Cadre Competency Setup", icon: Sliders },
        { id: "profile", label: t('officialServiceProfile') || "Service Profile", icon: Settings },
      ]
    }
  ];

  return (
    <>
      {/* 1. SLIM ICON RAIL (Shown when sidebar is collapsed on desktop) */}
      <aside className="hidden md:flex w-20 bg-[#0F2942] text-slate-300 flex-col flex-shrink-0 min-h-[calc(100vh-69px)] border-r border-slate-800 select-none py-3 justify-between items-center z-30">
        {/* Navigation Icons Stack */}
        <div className="w-full flex flex-col items-center space-y-2">
          {iconRailItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.screenMatches.includes(currentScreen);

            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`w-16 h-14 flex flex-col items-center justify-center rounded-xl transition-all group relative cursor-pointer ${
                  isActive
                    ? 'bg-[#2087d8] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <span className={`text-[10px] font-semibold tracking-tight mt-1 truncate max-w-[58px] ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                  {item.label}
                </span>

                {item.badge && !isActive && (
                  <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-amber-400"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Action Stack */}
        <div className="w-full flex flex-col items-center space-y-2 pt-3 border-t border-slate-800/80">
          <a
            href="https://play.google.com/store/apps/details?id=igot.karmayogi.gov.in"
            target="_blank"
            rel="noreferrer"
            className="w-16 h-12 flex flex-col items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer"
            title="Download Karmayogi App"
          >
            <Download className="w-4 h-4" />
            <span className="text-[9px] font-semibold mt-0.5">App</span>
          </a>

          <button
            onClick={() => setCurrentScreen('settings')}
            className={`w-16 h-12 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer ${
              currentScreen === 'settings' || currentScreen === 'profile'
                ? 'bg-[#2087d8] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
            title="Settings"
          >
            <Settings className="w-4 h-4" />
            <span className="text-[9px] font-semibold mt-0.5">Settings</span>
          </button>

          <button
            onClick={logoutUser}
            className="w-16 h-12 flex flex-col items-center justify-center rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-all cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-[9px] font-semibold mt-0.5">Exit</span>
          </button>
        </div>
      </aside>

      {/* 2. EXPANDED FULL SIDEBAR DRAWER (Triggered by Hamburger menu) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Drawer Body */}
          <div className="relative w-80 max-w-[85vw] bg-[#0F2942] text-slate-200 h-full shadow-2xl flex flex-col z-10 border-r border-slate-800 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1B365D] flex items-center justify-center text-white font-bold border border-blue-800">
                  <span className="text-[#FF9933] text-[10px] font-serif font-black">iGOT</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">iGOT Navigation</h3>
                  <span className="text-[10px] text-amber-400 font-mono">Mission Karmayogi</span>
                </div>
              </div>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile Mini Banner */}
            <div className="p-3 mx-3 mt-3 bg-slate-800/80 rounded-xl border border-slate-700/80 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {userProfile.name?.substring(0, 2).toUpperCase() || 'RK'}
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">{userProfile.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{userProfile.cadre}</p>
                </div>
              </div>
              <div className="text-[10px] text-amber-300 font-bold flex items-center bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
                <Zap className="w-3 h-3 mr-0.5 fill-amber-400 text-amber-400" />
                {userProfile.karmayogiCredits || 1250} Pts
              </div>
            </div>

            {/* Nav Categories List */}
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
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                            isActive
                              ? 'bg-[#2087d8] text-white font-bold shadow-sm'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${
                                item.badgeColor === 'red'
                                  ? 'bg-red-900/90 text-red-200 border border-red-700'
                                  : item.badgeColor === 'blue'
                                  ? 'bg-blue-900/90 text-blue-200 border border-blue-600'
                                  : item.badgeColor === 'purple'
                                  ? 'bg-purple-900/90 text-purple-200 border border-purple-600'
                                  : 'bg-amber-900/90 text-amber-200 border border-amber-600'
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

            {/* Bottom Actions */}
            <div className="p-3 border-t border-slate-800 bg-slate-950/60 space-y-2">
              <a
                href="https://play.google.com/store/apps/details?id=igot.karmayogi.gov.in"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download iGOT Mobile App</span>
              </a>

              <button
                onClick={() => {
                  setIsSidebarOpen(false);
                  logoutUser();
                }}
                className="w-full py-2 px-3 text-xs font-bold text-rose-300 hover:bg-rose-950/50 rounded-xl border border-rose-900/50 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>{t('signOut')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
