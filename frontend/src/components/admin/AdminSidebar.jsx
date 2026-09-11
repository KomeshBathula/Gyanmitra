import React from 'react';
import {
  Shield,
  Users,
  BarChart3,
  Zap,
  CheckCircle,
  FileText,
  Landmark,
  Building2,
  Coins,
  Settings,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSidebar = () => {
  const {
    currentScreen,
    setCurrentScreen,
    adminDepartment,
    switchAdminDepartment,
    adminDepartmentsConfig
  } = useApp();

  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Executive Command Center', icon: Shield },
    { id: 'admin-learners', label: 'Learner Directory & Passbooks', icon: Users, badge: 'Learner Hub' },
    { id: 'admin-analytics', label: 'Department & Cadre Analytics', icon: BarChart3 },
    { id: 'admin-quiz-studio', label: 'Groq AI Quiz & Material Studio', icon: Zap, badge: 'AI Live' },
    { id: 'admin-assessments', label: 'Assessments & Policy Audits', icon: CheckCircle },
    { id: 'admin-reports', label: 'ACBP & Cadre Reports', icon: FileText }
  ];

  const activeDept = adminDepartmentsConfig?.find(d => d.id === adminDepartment) || adminDepartmentsConfig?.[0];

  return (
    <aside className="w-64 bg-[#080E1C] text-slate-200 flex flex-col flex-shrink-0 min-h-[calc(100vh-80px)] border-r border-[#1E2E4A] select-none py-4 justify-between">
      <div className="space-y-5 px-3">
        {/* Navigation Items */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
            Governance & Cadre Controls
          </p>
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id || (item.id === 'admin-dashboard' && currentScreen === 'dashboard');

            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold shadow-lg shadow-purple-900/30 border border-purple-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-[#13233F]'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-amber-300' : 'text-purple-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-purple-950 text-purple-300 border border-purple-800">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Department Filter Pills */}
        <div className="pt-3 border-t border-[#1E2E4A]/80">
          <p className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
            Switch Admin Cadre
          </p>
          <div className="space-y-1.5">
            {adminDepartmentsConfig?.map((d) => {
              const isSelected = d.id === adminDepartment;
              return (
                <button
                  key={d.id}
                  onClick={() => switchAdminDepartment(d.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-purple-900/40 text-purple-200 border border-purple-500/50 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#111F38] border border-transparent'
                  }`}
                >
                  <span className="truncate">{d.name.split('&')[0]}</span>
                  <span className="text-[10px] font-mono text-slate-500">{d.totalLearners}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Cadre Status Card */}
      <div className="px-3 pt-3">
        <div className="p-3.5 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Cadre</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <p className="text-xs font-bold text-white truncate">{activeDept?.name}</p>
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-[#1E2E4A]">
            <span>Compliance: <strong className="text-emerald-400">{activeDept?.complianceRate}</strong></span>
            <span>Avg: <strong className="text-blue-400">{activeDept?.avgCompetency}%</strong></span>
          </div>
        </div>
      </div>
    </aside>
  );
};
