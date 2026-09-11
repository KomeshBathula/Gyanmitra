import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Building2,
  Landmark,
  Coins,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Shield,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDepartmentAnalyticsView = () => {
  const { adminDepartmentsConfig, switchAdminDepartment, adminDepartment } = useApp();

  const cadreComparisonData = [
    {
      cadre: "Civil Administration & DoPT",
      deptId: "civil",
      totalStrength: 42850,
      avgScore: 76.4,
      compliance: "84.2%",
      topDeficit: "DPDP Act 2023 & Statistical Disclosure",
      severity: "Medium",
      color: "blue"
    },
    {
      cadre: "Municipal Administration & ULB",
      deptId: "municipal",
      totalStrength: 28400,
      avgScore: 68.2,
      compliance: "72.8%",
      topDeficit: "GIS Property Survey & Spatial Mapping",
      severity: "High",
      color: "emerald"
    },
    {
      cadre: "MoSPI Statistical & Survey Cadre",
      deptId: "statistical",
      totalStrength: 14820,
      avgScore: 74.8,
      compliance: "88.6%",
      topDeficit: "Python for NSS Survey Tabulation",
      severity: "High",
      color: "purple"
    },
    {
      cadre: "Revenue, Taxes & Commercial Finance",
      deptId: "revenue",
      totalStrength: 19300,
      avgScore: 71.9,
      compliance: "79.4%",
      topDeficit: "Corporate MCA-21 Balance Sheet Extraction",
      severity: "Medium",
      color: "amber"
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 text-slate-100">
      {/* Top Banner */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-900/60 text-blue-300 border border-blue-600/40">
                Department Cadre Analytics
              </span>
              <span className="text-xs text-slate-400">Comparative Governance Matrix</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-2">Department & Cadre Competency Intelligence</h2>
            <p className="text-xs text-slate-400 mt-1">
              Cross-departmental capacity benchmarking across Civil, Municipal, MoSPI Statistical, and Revenue sectors.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Department Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminDepartmentsConfig?.map((dept) => {
          const isSelected = dept.id === adminDepartment;
          return (
            <div
              key={dept.id}
              onClick={() => switchAdminDepartment(dept.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-md flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#15284F] border-blue-500 ring-2 ring-blue-500/30'
                  : 'bg-[#111F38] border-[#1E2E4A] hover:bg-[#162544]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                    {dept.badge}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white mt-2 leading-snug">{dept.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{dept.totalLearners} Officers</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1E2E4A] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400">Mean Score</span>
                  <p className="text-lg font-black text-emerald-400">{dept.avgCompetency}%</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400">Compliance</span>
                  <p className="text-xs font-bold text-blue-300">{dept.complianceRate}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cadre Comparative Table */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1E2E4A] bg-[#0E1B33]">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Comparative Cadre Competency Ledger
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1528] text-slate-400 font-bold border-b border-[#1E2E4A]">
              <tr>
                <th className="px-6 py-3.5">Cadre / Department</th>
                <th className="px-4 py-3.5 text-center">Workforce Strength</th>
                <th className="px-4 py-3.5 text-center">Avg Competency</th>
                <th className="px-4 py-3.5 text-center">ACBP Compliance</th>
                <th className="px-6 py-3.5">Top Skill Deficit Area</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E4A]/60">
              {cadreComparisonData.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[#162544]/60 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">
                    {row.cadre}
                  </td>
                  <td className="px-4 py-4 text-center font-mono text-slate-300">
                    {row.totalStrength.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-black text-emerald-400">{row.avgScore}%</span>
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-blue-300">
                    {row.compliance}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${row.severity === 'High' ? 'bg-rose-400' : 'bg-amber-400'}`}></span>
                      <span className="text-slate-300">{row.topDeficit}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => switchAdminDepartment(row.deptId)}
                      className="px-3 py-1.5 rounded-xl bg-[#0B1528] hover:bg-[#162544] text-blue-300 hover:text-white border border-[#1E2E4A] font-bold text-xs transition-colors cursor-pointer"
                    >
                      Inspect Cadre
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
