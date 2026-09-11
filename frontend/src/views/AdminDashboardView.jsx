import React from 'react';
import { Building2, Sparkles, TrendingUp, AlertTriangle, Users, Shield, CheckCircle2, PieChart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboardView = () => {
  const { adminOrgData, setCurrentScreen } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 text-slate-100">
      {/* Top Banner */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-900/60 text-purple-300 border border-purple-600/50">
                National Cadre Intelligence
              </span>
              <span className="text-xs text-slate-400">MoSPI & All India Statistical Cadre</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-2">Workforce Analytics & Competency Intelligence</h2>
            <p className="text-xs text-slate-400 mt-1">
              Ministry-wide capacity building monitoring across 14,820 statistical officers nationwide.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-400 font-mono bg-[#0B1528] px-3 py-1.5 rounded-lg border border-[#1E2E4A]">
              Synced: Live IST
            </span>
          </div>
        </div>
      </div>

      {/* Top Organization KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Workforce</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-2xl font-black text-white mt-2">{adminOrgData.totalEmployees}</h3>
          <p className="text-[11px] text-slate-400 mt-1">MoSPI, SSS & State DES</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">National Avg Competency</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-blue-400 mt-2">{adminOrgData.avgCompetencyScore}</h3>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">↑ +5.8% YOY Trajectory</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Critical Skill Gaps</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-2xl font-black text-red-400 mt-2">{adminOrgData.criticalGapsCount} Domains</h3>
          <p className="text-[11px] text-slate-400 mt-1">Python & Sampling Priority</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ACBP 2026 Target</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-emerald-400 mt-2">{adminOrgData.trainingCompletionRate}</h3>
          <p className="text-[11px] text-slate-400 mt-1">Mission Karmayogi Compliant</p>
        </div>
      </div>

      {/* Critical Workforce Skill Gaps */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-[#1E2E4A]">
          Critical Workforce Skill Deficits Across Cadres
        </h3>

        <div className="space-y-3">
          {adminOrgData.workforceSkillGaps.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#0B1528] border border-[#1E2E4A] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{item.skill}</span>
                <span className="font-bold text-red-400">{item.gapPercentage}% Workforce Deficit ({item.affectedCount} Officers)</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full ${
                    item.gapPercentage > 35 ? 'bg-red-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${item.gapPercentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Division Comparison Table */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1E2E4A] bg-[#0E1B33]">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Division & Directorate Performance Comparison
          </h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0B1528] text-slate-400 font-bold border-b border-[#1E2E4A]">
            <tr>
              <th className="px-6 py-3">Division / Cadre</th>
              <th className="px-4 py-3 text-center">Employees</th>
              <th className="px-4 py-3 text-center">Avg Competency</th>
              <th className="px-4 py-3 text-center">Critical Gaps</th>
              <th className="px-6 py-3 text-right">Training Completion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2E4A]/60">
            {adminOrgData.departments.map((dept, idx) => (
              <tr key={idx} className="hover:bg-[#162544]/60 transition-colors">
                <td className="px-6 py-3.5 font-bold text-white">{dept.name}</td>
                <td className="px-4 py-3.5 text-center text-slate-300">{dept.employees.toLocaleString()}</td>
                <td className="px-4 py-3.5 text-center font-bold text-blue-400">{dept.avgCompetency}%</td>
                <td className="px-4 py-3.5 text-center">
                  <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-800/50 text-red-300 font-bold">
                    {dept.criticalGaps} Gaps
                  </span>
                </td>
                <td className="px-6 py-3.5 text-right font-bold text-emerald-400">{dept.completion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
