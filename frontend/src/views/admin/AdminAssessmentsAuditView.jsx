import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  FileText,
  ClipboardCheck,
  BarChart3,
  Clock,
  ArrowRight,
  Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminAssessmentsAuditView = () => {
  const {
    adminAuditData,
    generatedQuizzes,
    setCurrentScreen,
    showToast
  } = useApp();

  const assessmentCatalog = [
    {
      id: "asm-101",
      title: "Official Statistics & Survey Sampling Assessment",
      department: "MoSPI Statistical Cadre",
      attempts: 4890,
      passRate: "84.2%",
      avgScore: "76.8%",
      status: "Active Mandate"
    },
    {
      id: "asm-102",
      title: "DPDP Act 2023 & Citizen Privacy Governance",
      department: "Civil Administration & DoPT",
      attempts: 6120,
      passRate: "89.5%",
      avgScore: "81.4%",
      status: "Active Mandate"
    },
    {
      id: "asm-103",
      title: "Municipal GIS Spatial Mapping & Urban Asset Audit",
      department: "Municipal Administration & ULB",
      attempts: 3200,
      passRate: "58.4%",
      avgScore: "62.1%",
      status: "Remedial Mandate"
    },
    {
      id: "asm-104",
      title: "Corporate MCA-21 Integration in National Accounts",
      department: "Revenue & MoSPI Cadre",
      attempts: 2240,
      passRate: "79.1%",
      avgScore: "74.5%",
      status: "Active Mandate"
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
                Governance Audit Console
              </span>
              <span className="text-xs text-slate-400">MoSPI Examination Integrity</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-2">Assessments Governance & Policy Audit</h2>
            <p className="text-xs text-slate-400 mt-1">
              Verify examination compliance, monitor passing thresholds, and manage live assessment banks.
            </p>
          </div>

          <button
            onClick={() => setCurrentScreen('admin-quiz-studio')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            <ClipboardCheck className="w-4 h-4 text-white" />
            <span>Assessment Studio</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Tests Conducted</span>
          <h3 className="text-2xl font-black text-white mt-2">{adminAuditData?.totalAssessmentsConducted}</h3>
          <p className="text-[11px] text-slate-400 mt-1">Nationwide across all cadres</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Pass Rate</span>
          <h3 className="text-2xl font-black text-emerald-400 mt-2">{adminAuditData?.overallPassRate}</h3>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">Target Threshold: ≥ 70%</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Examination Score</span>
          <h3 className="text-2xl font-black text-blue-400 mt-2">{adminAuditData?.avgScore}</h3>
          <p className="text-[11px] text-slate-400 mt-1">FRAC Matrix Calibrated</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live AI Assessments</span>
          <h3 className="text-2xl font-black text-purple-300 mt-2">{generatedQuizzes.length} Quizzes</h3>
          <p className="text-[11px] text-slate-400 mt-1">Published by Administrators</p>
        </div>
      </div>

      {/* Live Audit Alerts */}
      <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Recent Cadre Audit & Governance Alerts
        </h3>
        <div className="space-y-2.5">
          {adminAuditData?.auditAlerts?.map((alert) => (
            <div
              key={alert.id}
              className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                alert.type === 'warning'
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : alert.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-blue-950/40 border-blue-500/40 text-blue-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                {alert.type === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                )}
                <span>{alert.message}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono flex-shrink-0 ml-2">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment Governance Roster */}
      <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1E2E4A] bg-[#0E1B33] flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Mandated Cadre Assessment Roster
          </h3>
          <button
            onClick={() => showToast("Exporting Assessment Audit Roster to CSV...", "info")}
            className="text-xs text-purple-400 hover:underline font-semibold cursor-pointer"
          >
            Export Audit Report (CSV)
          </button>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-[#0B1528] text-slate-400 font-bold border-b border-[#1E2E4A]">
            <tr>
              <th className="px-6 py-3.5">Assessment Title</th>
              <th className="px-4 py-3.5">Target Cadre</th>
              <th className="px-4 py-3.5 text-center">Total Attempts</th>
              <th className="px-4 py-3.5 text-center">Pass Rate</th>
              <th className="px-4 py-3.5 text-center">Avg Score</th>
              <th className="px-6 py-3.5 text-right">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2E4A]/60">
            {assessmentCatalog.map((asm) => (
              <tr key={asm.id} className="hover:bg-[#162544]/60 transition-colors">
                <td className="px-6 py-4 font-bold text-white">{asm.title}</td>
                <td className="px-4 py-4 text-slate-300">{asm.department}</td>
                <td className="px-4 py-4 text-center font-mono text-slate-300">{asm.attempts.toLocaleString()}</td>
                <td className="px-4 py-4 text-center font-bold text-emerald-400">{asm.passRate}</td>
                <td className="px-4 py-4 text-center font-bold text-blue-400">{asm.avgScore}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    asm.status.includes('Remedial')
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/50'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                  }`}>
                    {asm.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
