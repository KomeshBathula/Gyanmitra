import React from 'react';
import { TrendingUp, Award, Clock, BookOpen, CheckCircle2, Calendar, FileText, Shield } from 'lucide-react';
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 text-slate-100">
      {/* Top Banner */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-900/60 text-blue-300 border border-blue-600/50">
              Mission Karmayogi Digital Ledger
            </span>
            <h2 className="text-xl font-bold text-white mt-2">My Learning Progress & Cadre Growth</h2>
            <p className="text-xs text-slate-400 mt-1">
              Continuous tracking of your competency score trajectory, learning hours, and verified certifications.
            </p>
          </div>
          <button
            onClick={() => setCurrentScreen('learning-path')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
          >
            Resume Learning
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Learning Hours</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-2xl font-black text-white mt-2">116 Hours</h3>
          <p className="text-[11px] text-emerald-400 font-semibold mt-2">✓ Exceeds Quarterly ACBP Target</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Modules Completed</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <h3 className="text-2xl font-black text-white mt-2">12 Modules</h3>
          <p className="text-[11px] text-blue-400 font-semibold mt-2">8 iGOT • 4 NSSTA Greater Noida</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Karma Points</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-2xl font-black text-amber-300 mt-2">{userProfile.karmayogiCredits || 799} Pts</h3>
          <p className="text-[11px] text-slate-400 mt-2">Synced with Service Record</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Competency Growth</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-emerald-400 mt-2">+14% Growth</h3>
          <p className="text-[11px] text-slate-400 mt-2">From 54% Baseline to {competencyOverview.overallScore}%</p>
        </div>
      </div>

      {/* Monthly Progress Chart Breakdown */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-[#1E2E4A]">
          Monthly Competency Improvement Trajectory (Q1 2026)
        </h3>

        <div className="space-y-4">
          {monthlyHistory.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#0B1528] border border-[#1E2E4A] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{m.month}</span>
                <span className="font-mono font-bold text-blue-400">{m.score}% Competency Index</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-500 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${m.score}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>{m.hours} Hours Logged</span>
                <span>{m.modules} Modules Certified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Milestones & Badges */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-[#1E2E4A]">
          Verified Service Record Milestones
        </h3>

        <div className="divide-y divide-[#1E2E4A]/80">
          {milestones.map((m, idx) => (
            <div key={idx} className="py-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white">{m.title}</h4>
                  <span className="text-[10px] text-slate-400">Achieved on: {m.date}</span>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-600/50">
                {m.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
