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
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-900/60 text-purple-300 border border-purple-600/50">
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
              className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-lg flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#152342] border-purple-500 ring-2 ring-purple-500/30'
                  : 'bg-[#111F38] border-[#1E2E4A] hover:border-[#2A4374]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-300">
                    {dept.badge}
                  </span>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-purple-600 text-white">
                      ACTIVE
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white mt-2">{dept.name}</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{dept.description}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1E2E4A] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Officers:</span>
                  <span className="font-bold text-white">{dept.totalLearners}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Avg Competency:</span>
                  <span className="font-bold text-emerald-400">{dept.avgCompetency}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Compliance Rate:</span>
                  <span className="font-bold text-blue-400">{dept.complianceRate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Comparison Table */}
      <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1E2E4A] bg-[#0E1B33]">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Comparative Cadre Performance & Deficit Matrix
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1528] text-slate-400 font-bold border-b border-[#1E2E4A]">
              <tr>
                <th className="px-6 py-3.5">Cadre / Department</th>
                <th className="px-4 py-3.5 text-center">Workforce Strength</th>
                <th className="px-4 py-3.5 text-center">Competency Index</th>
                <th className="px-4 py-3.5 text-center">ACBP Compliance</th>
                <th className="px-6 py-3.5">Primary Skill Deficit Area</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E4A]/60">
              {cadreComparisonData.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#162544]/60 transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{item.cadre}</td>
                  <td className="px-4 py-4 text-center text-slate-300 font-mono">{item.totalStrength.toLocaleString()}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-black text-emerald-400">{item.avgScore}%</span>
                  </td>
                  <td className="px-4 py-4 text-center font-bold text-blue-400">{item.compliance}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.severity === 'High'
                          ? 'bg-rose-950 text-rose-300 border border-rose-600/50'
                          : 'bg-amber-950 text-amber-300 border border-amber-600/50'
                      }`}>
                        {item.severity}
                      </span>
                      <span className="text-slate-200">{item.topDeficit}</span>
                    </div>
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
