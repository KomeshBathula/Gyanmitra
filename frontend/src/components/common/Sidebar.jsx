import React, { useState } from 'react';
import {
  Home,
  Compass,
  ShoppingBag,
  BookOpen,
  FileCheck,
  MessageSquare,
  Calendar,
  MoreHorizontal,
  Award,
  Clock,
  Zap,
  Shield,
  HelpCircle,
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const {
    currentScreen,
    setCurrentScreen,
    userProfile,
    isSidebarOpen,
    setIsSidebarOpen,
    logoutUser,
    t
  } = useApp();

  const [isAchievementsOpen, setIsAchievementsOpen] = useState(true);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(true);

  // Core Navigation Items matching the architecture diagram
  const primaryNavItems = [
    { id: 'dashboard', label: 'User Dashboard', icon: Home },
    { id: 'assessment', label: 'Competency Assessment', icon: Award },
    { id: 'learning-path', label: 'Learning Path & Recommendations', icon: BookOpen },
    { id: 'ai-quiz', label: 'Upload Material & Generate Quiz', icon: Zap },
    { id: 'progress', label: 'Progress Tracking', icon: Clock },
    { id: 'admin-dashboard', label: 'Analytics Dashboard', icon: Shield }
  ];

  // Secondary Learning & Resource Discovery
  const secondaryNavItems = [
    { id: 'courses', label: 'Explore Content', icon: Compass },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'competencies', label: 'Learner Passbook', icon: FileCheck },
    { id: 'ai-assistant', label: 'Ask AI Assistant', icon: MessageSquare }
  ];

  return (
    <aside className="w-64 bg-[#0B1528] text-slate-200 flex flex-col flex-shrink-0 min-h-[calc(100vh-57px)] border-r border-[#1E2E4A] select-none py-3 justify-between">
      {/* Top Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 space-y-4">
        {/* Core Architecture Modules */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Core Application Features
          </p>
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentScreen(item.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-[#162544]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content & Resources Section */}
        <div className="space-y-1 pt-2 border-t border-[#1E2E4A]/60">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Content & Repositories
          </p>
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentScreen(item.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-[#162544]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* My Achievements Accordion Card */}
        <div className="bg-[#080E1C] rounded-2xl border border-[#1E2E4A] p-3.5 space-y-3">
          <button
            onClick={() => setIsAchievementsOpen(!isAchievementsOpen)}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
          >
            <span>My Achievements</span>
            {isAchievementsOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {isAchievementsOpen && (
            <div className="space-y-3 pt-1 border-t border-[#1E2E4A]/80">
              {/* Rank */}
              <div className="flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-900/60 border border-blue-600/50 text-blue-300 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-[11px] leading-tight">
                  <p className="text-slate-400">Your Current Rank is</p>
                  <p className="text-white font-bold">{userProfile.currentRank || '146th Rank'}</p>
                </div>
              </div>

              {/* Learning Hours */}
              <div className="flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-900/60 border border-indigo-600/50 text-indigo-300 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-[11px] leading-tight">
                  <p className="text-slate-400">Learning Hours</p>
                  <p className="text-white font-bold">{userProfile.learningHours || '146h 34m'}</p>
                </div>
              </div>

              {/* Karma Points */}
              <div className="flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-600/50 text-amber-300 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-[11px] leading-tight">
                  <p className="text-slate-400">Karma Points</p>
                  <p className="text-amber-300 font-bold">{userProfile.karmayogiCredits || 799} Karma Points</p>
                </div>
              </div>

              {/* Badges Earned */}
              <div className="flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-[11px] leading-tight">
                  <p className="text-slate-400">You've Earned</p>
                  <p className="text-white font-bold">{userProfile.badgesEarned || 0} Badges</p>
                </div>
              </div>

              <div className="pt-1 text-center">
                <button
                  onClick={() => setCurrentScreen('progress')}
                  className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
                >
                  View all achievements
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions Card */}
        <div className="bg-[#080E1C] rounded-2xl border border-[#1E2E4A] p-3.5 space-y-2">
          <button
            onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
          >
            <span>Quick Actions</span>
            {isQuickActionsOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {isQuickActionsOpen && (
            <div className="pt-1 border-t border-[#1E2E4A]/80">
              <button
                onClick={() => setCurrentScreen('ai-assistant')}
                className="w-full text-left p-2 rounded-xl bg-[#111F38] hover:bg-[#162544] flex items-start space-x-2.5 cursor-pointer transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">Help Centre</p>
                  <p className="text-[10px] text-slate-400">Need help? You're in the right place.</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Fixed App Download Bar */}
      <div className="p-3 border-t border-[#1E2E4A]">
        <a
          href="https://play.google.com/store/apps/details?id=igot.karmayogi.gov.in"
          target="_blank"
          rel="noreferrer"
          className="w-full py-2.5 px-3 rounded-xl bg-[#15284F] hover:bg-[#1D3A74] text-white flex items-center justify-center space-x-2 text-xs font-bold transition-all shadow-md cursor-pointer border border-[#1E3A6D]"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Download App</span>
        </a>
      </div>
    </aside>
  );
};
