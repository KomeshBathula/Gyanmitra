import React, { useState } from 'react';
import {
  Shield,
  Users,
  BarChart3,
  Zap,
  CheckCircle,
  FileText,
  Building2,
  ChevronDown,
  ChevronUp,
  Award,
  Clock
} from 'lucide-react';
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
    { id: 'admin-dashboard', label: 'Command Center', icon: Shield },
    { id: 'admin-learners', label: 'Learner Directory', icon: Users },
    { id: 'admin-analytics', label: 'Cadre Analytics', icon: BarChart3 },
    { id: 'admin-quiz-studio', label: 'AI Quiz & Material Studio', icon: Zap },
    { id: 'admin-assessments', label: 'Assessments & Audits', icon: CheckCircle },
    { id: 'admin-reports', label: 'ACBP & Cadre Reports', icon: FileText }
  ];

  const activeDept = adminDepartmentsConfig?.find(d => d.id === adminDepartment) || adminDepartmentsConfig?.[0];

  return (
    <aside className="w-64 bg-[#0B1528] text-slate-200 flex flex-col flex-shrink-0 min-h-[calc(100vh-57px)] border-r border-[#1E2E4A] select-none py-3 justify-between">
      <div className="flex-1 overflow-y-auto px-3 space-y-4">
        {/* Core Admin Navigation */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Admin Governance
          </p>
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id || (item.id === 'admin-dashboard' && currentScreen === 'dashboard');

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentScreen(item.id);
                  if (window.innerWidth < 768 && setIsSidebarOpen) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-[#162544]'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Department Cadre Selector Accordion */}
        <div className="bg-[#080E1C] rounded-2xl border border-[#1E2E4A] p-3.5 space-y-3">
          <button
            onClick={() => setIsCadreOpen(!isCadreOpen)}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
          >
            <span>Administration Cadre</span>
            {isCadreOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {isCadreOpen && (
            <div className="space-y-1 pt-1 border-t border-[#1E2E4A]/80">
              {adminDepartmentsConfig?.map((d) => {
                const isSelected = d.id === adminDepartment;
                return (
                  <button
                    key={d.id}
                    onClick={() => switchAdminDepartment(d.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-blue-900/50 text-blue-200 border border-blue-600/50 font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#111F38]'
                    }`}
                  >
                    <span className="truncate">{d.name.split('&')[0]}</span>
                    <span className="text-[10px] font-mono text-slate-500">{d.totalLearners}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Active Cadre Summary Card */}
        <div className="bg-[#080E1C] rounded-2xl border border-[#1E2E4A] p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Cadre</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <p className="text-xs font-bold text-white truncate">{activeDept?.name}</p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-[#1E2E4A]">
            <span>Compliance: <strong className="text-emerald-400">{activeDept?.complianceRate}</strong></span>
            <span>Avg: <strong className="text-blue-400">{activeDept?.avgCompetency}%</strong></span>
          </div>
        </div>
      </div>
    </aside>
  );
};
