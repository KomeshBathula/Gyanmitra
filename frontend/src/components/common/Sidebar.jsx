import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const {
    currentScreen,
    setCurrentScreen,
    userProfile,
    isSidebarOpen,
    setIsSidebarOpen,
    t
  } = useApp();

  const [isAchievementsOpen, setIsAchievementsOpen] = useState(true);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  const isTrainer = userProfile?.role === 'trainer';

  // Navigation Items — text-first, no icon containers
  const trainerPrimaryNavItems = [
    { id: 'trainer-dashboard', label: 'Admin Governance Portal' },
    { id: 'ai-quiz', label: 'Assessment Studio' },
    { id: 'reports', label: 'Batch Compliance & Audits' },
    { id: 'courses', label: 'Curriculum & Courses' },
    { id: 'ai-assistant', label: 'Admin AI Assistant' }
  ];

  const employeePrimaryNavItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'skill-gaps', label: 'Skill Gap Matrix' },
    { id: 'assessment', label: 'Competency Assessment' },
    { id: 'learning-path', label: 'My Learning Path' },
    { id: 'progress', label: 'Progress Tracker' }
  ];

  const primaryNavItems = isTrainer ? trainerPrimaryNavItems : employeePrimaryNavItems;

  const trainerSecondaryNavItems = [
    { id: 'marketplace', label: 'MoSPI Marketplace' },
    { id: 'competencies', label: 'Competency Framework' },
    { id: 'dashboard', label: 'Preview Officer View' }
  ];

  const employeeSecondaryNavItems = [
    { id: 'courses', label: 'Course Catalog' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'competencies', label: 'Learner Passbook' },
    { id: 'ai-assistant', label: 'AI Knowledge Assistant' }
  ];

  const secondaryNavItems = isTrainer ? trainerSecondaryNavItems : employeeSecondaryNavItems;

  const NavButton = ({ item }) => {
    const isActive = currentScreen === item.id;
    return (
      <button
        key={item.id}
        onClick={() => {
          setCurrentScreen(item.id);
          if (window.innerWidth < 768) setIsSidebarOpen(false);
        }}
        className={`w-full text-left px-3 py-2 text-xs font-medium transition-all cursor-pointer border-l-2 ${
          isActive
            ? 'bg-[#EEF2F5] border-[#0B3A63] text-[#0B3A63] font-semibold'
            : 'border-transparent text-[#5B6773] hover:text-[#1F2933] hover:bg-[#F5F7F9]'
        }`}
      >
        {item.label}
      </button>
    );
  };

  return (
    <aside className="w-64 bg-white text-[#1F2933] flex flex-col flex-shrink-0 min-h-[calc(100vh-57px)] border-r border-[#D5DCE3] select-none">
      {/* Top Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">

        {/* Primary Nav Section */}
        <div>
          <p className="px-3 pb-1.5 text-[10px] font-bold text-[#5B6773] uppercase tracking-wider">
            {isTrainer ? 'Administration' : 'Main Navigation'}
          </p>
          <div className="space-y-0.5">
            {primaryNavItems.map((item) => (
              <NavButton key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Secondary Nav Section */}
        <div className="border-t border-[#D5DCE3] pt-4">
          <p className="px-3 pb-1.5 text-[10px] font-bold text-[#5B6773] uppercase tracking-wider">
            {isTrainer ? 'Resources' : 'Content & Resources'}
          </p>
          <div className="space-y-0.5">
            {secondaryNavItems.map((item) => (
              <NavButton key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Achievements / Cohort Info Accordion */}
        <div className="border-t border-[#D5DCE3] pt-4 mx-3">
          <button
            onClick={() => setIsAchievementsOpen(!isAchievementsOpen)}
            className="w-full flex items-center justify-between text-xs font-semibold text-[#1F2933] hover:text-[#0B3A63] cursor-pointer mb-2"
          >
            <span>{isTrainer ? 'Active Cohort (ISS 2026)' : 'My Achievements'}</span>
            {isAchievementsOpen
              ? <ChevronUp className="w-3.5 h-3.5 text-[#5B6773]" />
              : <ChevronDown className="w-3.5 h-3.5 text-[#5B6773]" />}
          </button>

          {isAchievementsOpen && (
            <div className="border border-[#D5DCE3] rounded bg-[#F5F7F9] divide-y divide-[#D5DCE3]">
              {isTrainer ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-[10px] text-[#5B6773]">Probationer Officers</p>
                    <p className="text-xs font-semibold text-[#1F2933]">48 Officers Enrolled</p>
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-[10px] text-[#5B6773]">Cohort Average Score</p>
                    <p className="text-xs font-semibold text-[#0B3A63]">74.8% Competency</p>
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-[10px] text-[#5B6773]">Curriculum Deficits</p>
                    <p className="text-xs font-semibold text-[#B42318]">2 Modules Identified</p>
                  </div>
                  <div className="px-3 py-2">
                    <button
                      onClick={() => setCurrentScreen('trainer-dashboard')}
                      className="w-full py-1.5 px-3 bg-[#0B3A63] hover:bg-[#12304A] text-white rounded text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      Open Admin Console
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="px-3 py-2">
                    <p className="text-[10px] text-[#5B6773]">Current Rank</p>
                    <p className="text-xs font-semibold text-[#1F2933]">{userProfile?.currentRank || '146th Rank'}</p>
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-[10px] text-[#5B6773]">Learning Hours</p>
                    <p className="text-xs font-semibold text-[#1F2933]">{userProfile?.learningHours || '146h 34m'}</p>
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-[10px] text-[#5B6773]">Karma Points</p>
                    <p className="text-xs font-semibold text-[#B7791F]">{userProfile?.karmayogiCredits || 799} pts</p>
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-[10px] text-[#5B6773]">Badges Earned</p>
                    <p className="text-xs font-semibold text-[#2E7D32]">{userProfile?.badgesEarned || 0} Badges</p>
                  </div>
                  <div className="px-3 py-2">
                    <button
                      onClick={() => setCurrentScreen('progress')}
                      className="text-[11px] text-[#0B3A63] hover:underline cursor-pointer font-medium"
                    >
                      View all achievements →
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Help Centre */}
        <div className="border-t border-[#D5DCE3] pt-4 mx-3">
          <button
            onClick={() => setCurrentScreen('ai-assistant')}
            className="w-full text-left p-3 border border-[#D5DCE3] rounded bg-[#F5F7F9] hover:bg-[#EEF2F5] transition-colors cursor-pointer"
          >
            <p className="text-xs font-semibold text-[#1F2933]">Help Centre</p>
            <p className="text-[10px] text-[#5B6773] mt-0.5">Ask the AI Knowledge Assistant for help.</p>
          </button>
        </div>
      </div>

      {/* Bottom: Download App */}
      <div className="p-3 border-t border-[#D5DCE3]">
        <a
          href="https://play.google.com/store/apps/details?id=igot.karmayogi.gov.in"
          target="_blank"
          rel="noreferrer"
          className="w-full py-2 px-3 rounded border border-[#D5DCE3] bg-[#F5F7F9] hover:bg-[#EEF2F5] text-[#1F2933] flex items-center justify-center text-xs font-medium transition-all cursor-pointer"
        >
          Download iGOT Mobile App
        </a>
      </div>
    </aside>
  );
};
