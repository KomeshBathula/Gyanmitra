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
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const { currentScreen, setCurrentScreen, currentRole, logoutUser, t } = useApp();

  // Navigation Items matching official iGOT Karmayogi Bharat Icon Rail
  const navItems = [
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

  return (
    <aside className="w-20 bg-[#0F2942] text-slate-300 flex flex-col flex-shrink-0 min-h-[calc(100vh-69px)] border-r border-slate-800 select-none py-3 justify-between items-center z-30">
      {/* Navigation Icons Stack */}
      <div className="w-full flex flex-col items-center space-y-2">
        {navItems.map((item) => {
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

      {/* Bottom Action Stack: Download App, Settings, Sign Out */}
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
  );
};
