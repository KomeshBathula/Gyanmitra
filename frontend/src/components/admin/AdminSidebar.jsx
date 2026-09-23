import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSidebar = () => {
  const {
    currentScreen,
    setCurrentScreen,
    adminDepartment,
    switchAdminDepartment,
    adminDepartmentsConfig,
    setIsSidebarOpen
  } = useApp();

  const [isCadreOpen, setIsCadreOpen] = useState(true);

  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Command Center' },
    { id: 'admin-learners', label: 'Learner Directory' },
    { id: 'admin-analytics', label: 'Cadre Analytics' },
    { id: 'admin-quiz-studio', label: 'Assessment Studio' },
    { id: 'admin-assessments', label: 'Assessments & Audits' },
    { id: 'admin-reports', label: 'ACBP & Cadre Reports' }
  ];

  const activeDept = adminDepartmentsConfig?.find(d => d.id === adminDepartment) || adminDepartmentsConfig?.[0];

  return (
    <aside className="w-64 bg-white text-[#1F2933] flex flex-col flex-shrink-0 min-h-[calc(100vh-57px)] border-r border-[#D5DCE3] select-none">
      <div className="flex-1 overflow-y-auto py-4 space-y-4">

        {/* Core Admin Navigation */}
        <div>
          <p className="px-3 pb-1.5 text-[10px] font-bold text-[#5B6773] uppercase tracking-wider">
            Admin Governance
          </p>
          <div className="space-y-0.5">
            {adminNavItems.map((item) => {
              const isActive = currentScreen === item.id || (item.id === 'admin-dashboard' && currentScreen === 'dashboard');
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentScreen(item.id);
                    if (window.innerWidth < 768 && setIsSidebarOpen) setIsSidebarOpen(false);
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
            })}
          </div>
        </div>

        {/* Department Cadre Selector */}
        <div className="border-t border-[#D5DCE3] pt-4 mx-3">
          <button
            onClick={() => setIsCadreOpen(!isCadreOpen)}
            className="w-full flex items-center justify-between text-xs font-semibold text-[#1F2933] hover:text-[#0B3A63] cursor-pointer mb-2"
          >
            <span>Administration Cadre</span>
            {isCadreOpen
              ? <ChevronUp className="w-3.5 h-3.5 text-[#5B6773]" />
              : <ChevronDown className="w-3.5 h-3.5 text-[#5B6773]" />}
          </button>

          {isCadreOpen && (
            <div className="border border-[#D5DCE3] rounded bg-[#F5F7F9] divide-y divide-[#D5DCE3]">
              {adminDepartmentsConfig?.map((d) => {
                const isSelected = d.id === adminDepartment;
                return (
                  <button
                    key={d.id}
                    onClick={() => switchAdminDepartment(d.id)}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#EEF2F5] text-[#0B3A63] font-semibold'
                        : 'text-[#5B6773] hover:text-[#1F2933] hover:bg-[#F5F7F9]'
                    }`}
                  >
                    <span className="truncate">{d.name.split('&')[0]}</span>
                    <span className="text-[10px] text-[#5B6773]">{d.totalLearners}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Active Cadre Summary */}
        <div className="mx-3 border border-[#D5DCE3] rounded bg-[#F5F7F9] p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#5B6773] uppercase tracking-wider">Active Cadre</span>
            <span className="w-2 h-2 rounded-full bg-[#2E7D32]"></span>
          </div>
          <p className="text-xs font-semibold text-[#1F2933] truncate">{activeDept?.name}</p>
          <div className="flex items-center justify-between text-[11px] text-[#5B6773] pt-1.5 border-t border-[#D5DCE3]">
            <span>Compliance: <strong className="text-[#2E7D32]">{activeDept?.complianceRate}</strong></span>
            <span>Avg: <strong className="text-[#0B3A63]">{activeDept?.avgCompetency}%</strong></span>
          </div>
        </div>
      </div>
    </aside>
  );
};
