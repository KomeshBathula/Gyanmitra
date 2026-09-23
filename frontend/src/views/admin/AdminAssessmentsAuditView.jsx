import React from 'react';
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
    <div className="space-y-5 max-w-7xl mx-auto pb-12 text-[#1F2933]">

      {/* Page Header */}
      <div className="bg-white border border-[#D5DCE3] rounded p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
              Governance Audit Console
            </span>
            <span className="text-xs text-[#5B6773]">MoSPI Examination Integrity</span>
          </div>
          <h2 className="text-lg font-bold text-[#0B3A63]">Assessments Governance & Policy Audit</h2>
          <p className="text-xs text-[#5B6773] mt-0.5">
            Verify examination compliance, monitor passing thresholds, and manage live assessment banks.
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('admin-quiz-studio')}
          className="px-4 py-2 bg-[#0B3A63] hover:bg-[#12304A] text-white text-xs font-semibold rounded transition-colors cursor-pointer flex-shrink-0"
        >
          Assessment Studio
        </button>
      </div>

      {/* KPI Summary */}
      <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-[#D5DCE3]">
          <div className="p-4">
            <p className="text-[10px] font-semibold text-[#5B6773] uppercase tracking-wider">Total Tests Conducted</p>
            <h3 className="text-2xl font-bold text-[#0B3A63] mt-1">{adminAuditData?.totalAssessmentsConducted}</h3>
            <p className="text-[11px] text-[#5B6773] mt-1">Nationwide across all cadres</p>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-semibold text-[#5B6773] uppercase tracking-wider">Overall Pass Rate</p>
            <h3 className="text-2xl font-bold text-[#2E7D32] mt-1">{adminAuditData?.overallPassRate}</h3>
            <p className="text-[11px] text-[#2E7D32] font-semibold mt-1">Target Threshold: ≥ 70%</p>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-semibold text-[#5B6773] uppercase tracking-wider">Average Examination Score</p>
            <h3 className="text-2xl font-bold text-[#0B3A63] mt-1">{adminAuditData?.avgScore}</h3>
            <p className="text-[11px] text-[#5B6773] mt-1">FRAC Matrix Calibrated</p>
          </div>
          <div className="p-4">
            <p className="text-[10px] font-semibold text-[#5B6773] uppercase tracking-wider">Live AI Assessments</p>
            <h3 className="text-2xl font-bold text-[#0B3A63] mt-1">{generatedQuizzes.length} Quizzes</h3>
            <p className="text-[11px] text-[#5B6773] mt-1">Published by Administrators</p>
          </div>
        </div>
      </div>

      {/* Audit Alerts */}
      <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
        <div className="px-4 py-3 border-b border-[#D5DCE3] bg-[#EEF2F5]">
          <h3 className="text-xs font-bold text-[#1F2933] uppercase tracking-wider">
            Recent Cadre Audit & Governance Alerts
          </h3>
        </div>
        <div className="p-4 space-y-2">
          {adminAuditData?.auditAlerts?.map((alert) => (
            <div
              key={alert.id}
              className={`px-4 py-3 border rounded flex items-center justify-between text-xs ${
                alert.type === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-[#B7791F]'
                  : alert.type === 'success'
                  ? 'bg-green-50 border-green-200 text-[#2E7D32]'
                  : 'bg-[#EEF2F5] border-[#D5DCE3] text-[#0B3A63]'
              }`}
            >
              <span className="font-medium">{alert.message}</span>
              <span className="text-[10px] text-[#5B6773] font-mono ml-2 flex-shrink-0">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment Roster Table */}
      <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
        <div className="px-4 py-3 border-b border-[#D5DCE3] bg-[#EEF2F5] flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#1F2933] uppercase tracking-wider">
            Mandated Cadre Assessment Roster
          </h3>
          <button
            onClick={() => showToast("Exporting Assessment Audit Roster to CSV...", "info")}
            className="text-xs font-semibold text-[#0B3A63] hover:underline cursor-pointer"
          >
            Export Audit Report (CSV)
          </button>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-[#EEF2F5] text-[#1F2933] font-semibold border-b border-[#D5DCE3]">
            <tr>
              <th className="px-4 py-3">Assessment Title</th>
              <th className="px-4 py-3">Target Cadre</th>
              <th className="px-4 py-3 text-center">Total Attempts</th>
              <th className="px-4 py-3 text-center">Pass Rate</th>
              <th className="px-4 py-3 text-center">Avg Score</th>
              <th className="px-4 py-3 text-right">Audit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D5DCE3]">
            {assessmentCatalog.map((asm) => (
              <tr key={asm.id} className="hover:bg-[#F5F7F9] transition-colors">
                <td className="px-4 py-3 font-semibold text-[#1F2933]">{asm.title}</td>
                <td className="px-4 py-3 text-[#5B6773]">{asm.department}</td>
                <td className="px-4 py-3 text-center font-mono text-[#5B6773]">{asm.attempts.toLocaleString()}</td>
                <td className="px-4 py-3 text-center font-semibold text-[#2E7D32]">{asm.passRate}</td>
                <td className="px-4 py-3 text-center font-semibold text-[#0B3A63]">{asm.avgScore}</td>
                <td className="px-4 py-3 text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    asm.status.includes('Remedial')
                      ? 'bg-red-50 text-[#B42318] border-red-200'
                      : 'bg-green-50 text-[#2E7D32] border-green-200'
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
