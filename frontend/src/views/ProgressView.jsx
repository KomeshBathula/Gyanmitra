import React from 'react';
import { TrendingUp, Award, Clock, BookOpen, CheckCircle2, Calendar, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProgressView = () => {
  const { competencyOverview, userProfile } = useApp();

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

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov">
        <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          Mission Karmayogi Digital Ledger
        </span>
        <h2 className="text-xl font-bold text-slate-900 mt-1">My Learning Progress & Cadre Growth</h2>
        <p className="text-xs text-slate-500">
          Continuous tracking of your competency score trajectory, learning hours, and certified achievements.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
          <span className="text-xs font-semibold text-slate-500 uppercase">Learning Hours</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">116 Hours</h3>
          <p className="text-[11px] text-emerald-700 font-semibold mt-2">✓ Exceeds Quarterly ACBP Target</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
          <span className="text-xs font-semibold text-slate-500 uppercase">Modules Completed</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">12 Modules</h3>
          <p className="text-[11px] text-blue-700 font-semibold mt-2">8 iGOT • 4 NSSTA Greater Noida</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
          <span className="text-xs font-semibold text-slate-500 uppercase">Karmayogi Credits</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{userProfile.karmayogiCredits} Pts</h3>
          <p className="text-[11px] text-slate-500 mt-2">Synced with Service Record</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov">
          <span className="text-xs font-semibold text-slate-500 uppercase">Competency Growth</span>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">+14% Growth</h3>
          <p className="text-[11px] text-slate-500 mt-2">From 54% Baseline to {competencyOverview.overallScore}%</p>
        </div>
      </div>

      {/* Monthly Progress Chart Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          Monthly Competency Improvement Trajectory (Q1 2026)
        </h3>

        <div className="space-y-4">
          {monthlyHistory.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{m.month}</span>
                <span className="font-mono font-bold text-blue-900">{m.score}% Competency Index</span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gov-blue h-3 rounded-full transition-all duration-700"
                  style={{ width: `${m.score}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{m.hours} Hours Logged</span>
                <span>{m.modules} Modules Certified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Milestones & Badges */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          Verified Service Record Milestones
        </h3>

        <div className="divide-y divide-slate-100">
          {milestones.map((m, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                  <span className="text-[10px] text-slate-400">Achieved on: {m.date}</span>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {m.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
