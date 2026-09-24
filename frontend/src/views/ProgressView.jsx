import React from 'react';
import { useApp } from '../context/AppContext';

export const ProgressView = () => {
  const { competencyOverview, userProfile, setCurrentScreen } = useApp();

  const monthlyHistory = [
    { month: "January 2026", score: 54, hours: 22, modules: 3 },
    { month: "February 2026", score: 61, hours: 38, modules: 5 },
    { month: "March 2026 (Current)", score: competencyOverview.overallScore, hours: 56, modules: 8 }
  ];

  const milestones = [
    { title: "Induction Competency Baseline Verified", date: "14 Jan 2026", type: "assessment", badge: "Score: 72%" },
    { title: "Python for Government Statisticians Completed", date: "02 Feb 2026", type: "course", badge: "iGOT Certified" },
    { title: "Survey Sampling Multi-Stage Design Mastery", date: "24 Feb 2026", type: "competency", badge: "Advanced to Level 4" },
    { title: "NSS 79th Round AI Assessment Passed", date: "10 Mar 2026", type: "assessment", badge: "Score: 80%" }
  ];

  const kpiStats = [
    { label: "Learning Hours", value: "116 hrs", note: "Exceeds Quarterly ACBP Target", noteColor: "text-[#2E7D32]" },
    { label: "Modules Completed", value: "12", note: "8 iGOT · 4 NSSTA Greater Noida", noteColor: "text-[#0B3A63]" },
    { label: "Karma Points", value: `${userProfile?.karmayogiCredits || 799} pts`, note: "Synced with Service Record", noteColor: "text-[#5B6773]" },
    { label: "Competency Growth", value: "+14%", note: `From 54% Baseline to ${competencyOverview.overallScore}%`, noteColor: "text-[#2E7D32]" }
  ];

  return (
    <div className="space-y-5 max-w-5xl mx-auto pb-12 text-[#1F2933]">

      {/* Page Header */}
      <div className="bg-white border border-[#D5DCE3] rounded p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EEF2F5] text-[#0B3A63] border border-[#D5DCE3]">
            Mission Karmayogi Digital Ledger
          </span>
          <h2 className="text-lg font-bold text-[#0B3A63] mt-1.5">My Learning Progress & Cadre Growth</h2>
          <p className="text-xs text-[#5B6773] mt-0.5">
            Continuous tracking of your competency score trajectory, learning hours, and verified certifications.
          </p>
        </div>
        <button
          onClick={() => setCurrentScreen('learning-path')}
          className="px-4 py-2 bg-[#0B3A63] hover:bg-[#12304A] text-white text-xs font-semibold rounded transition-colors cursor-pointer flex-shrink-0"
        >
          Resume Learning
        </button>
      </div>

      {/* KPI Summary Table */}
      <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
        <div className="px-4 py-3 border-b border-[#D5DCE3] bg-[#EEF2F5]">
          <h3 className="text-xs font-bold text-[#1F2933] uppercase tracking-wider">Key Performance Indicators</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-[#D5DCE3]">
          {kpiStats.map((stat, idx) => (
            <div key={idx} className="p-4">
              <p className="text-[10px] font-semibold text-[#5B6773] uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-[#0B3A63] mt-1">{stat.value}</p>
              <p className={`text-[11px] mt-1 font-medium ${stat.noteColor}`}>{stat.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Progress */}
      <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
        <div className="px-4 py-3 border-b border-[#D5DCE3] bg-[#EEF2F5]">
          <h3 className="text-xs font-bold text-[#1F2933] uppercase tracking-wider">
            Monthly Competency Improvement Trajectory (Q1 2026)
          </h3>
        </div>
        <div className="p-4 space-y-4">
          {monthlyHistory.map((m, idx) => (
            <div key={idx} className="border border-[#D5DCE3] rounded p-3 space-y-2 bg-[#F5F7F9]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1F2933]">{m.month}</span>
                <span className="font-mono font-bold text-[#0B3A63]">{m.score}% Competency Index</span>
              </div>
              <div className="w-full bg-[#D5DCE3] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#0B3A63] h-2 rounded-full transition-all duration-700"
                  style={{ width: `${m.score}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#5B6773]">
                <span>{m.hours} Hours Logged</span>
                <span>{m.modules} Modules Certified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white border border-[#D5DCE3] rounded overflow-hidden">
        <div className="px-4 py-3 border-b border-[#D5DCE3] bg-[#EEF2F5]">
          <h3 className="text-xs font-bold text-[#1F2933] uppercase tracking-wider">Verified Service Record Milestones</h3>
        </div>
        <div className="divide-y divide-[#D5DCE3]">
          {milestones.map((m, idx) => (
            <div key={idx} className="px-4 py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32] flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#1F2933]">{m.title}</h4>
                  <span className="text-[10px] text-[#5B6773]">Achieved on: {m.date}</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-green-50 text-[#2E7D32] border border-green-200 whitespace-nowrap">
                {m.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
