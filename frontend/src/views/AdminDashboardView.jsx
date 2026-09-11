import React from 'react';
import {
  Shield,
  Building2,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Users,
  CheckCircle2,
  PieChart,
  Zap,
  ArrowRight,
  Clock,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminDashboardView = () => {
  const {
    adminOrgData,
    adminDepartment,
    adminDepartmentsConfig,
    generatedQuizzes,
    setCurrentScreen
  } = useApp();

  const activeDept = adminDepartmentsConfig?.find(d => d.id === adminDepartment) || adminDepartmentsConfig?.[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 text-slate-100">
      {/* Executive Welcome & Cadre Banner */}
      <div className="bg-gradient-to-r from-[#122347] via-[#101D38] to-[#0D182E] rounded-3xl border border-[#223963] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-purple-900/80 text-purple-300 border border-purple-500/50 flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Executive Command Center</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-950 text-blue-300 border border-blue-600/40">
                {activeDept?.name}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              National Cadre Competency Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time monitoring across <strong className="text-white">{activeDept?.totalLearners}</strong> officers in {activeDept?.name}. Calibrated against Mission Karmayogi Bharat ACBP 2026 milestones.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setCurrentScreen('admin-quiz-studio')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-black shadow-lg transition-all flex items-center space-x-2 cursor-pointer border border-purple-400/50"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Groq AI Quiz Studio</span>
            </button>
            <button
              onClick={() => setCurrentScreen('admin-learners')}
              className="px-4 py-2.5 rounded-xl bg-[#162544] hover:bg-[#1E3A6D] text-slate-200 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-[#1E2E4A] flex items-center space-x-1.5"
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>Learner Passbooks</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cadre KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Department Strength</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-2xl font-black text-white mt-2">{activeDept?.totalLearners}</h3>
          <p className="text-[11px] text-slate-400 mt-1">{activeDept?.badge}</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Competency</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-emerald-400 mt-2">{activeDept?.avgCompetency}%</h3>
          <p className="text-[11px] text-emerald-400 font-semibold mt-1">↑ +6.2% YOY Competency Growth</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Critical Skill Gaps</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-2xl font-black text-rose-400 mt-2">{activeDept?.criticalGaps} Priority Areas</h3>
          <p className="text-[11px] text-slate-400 mt-1 truncate">{activeDept?.topFocus}</p>
        </div>

        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ACBP Certification</span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="text-2xl font-black text-purple-300 mt-2">{activeDept?.complianceRate}</h3>
          <p className="text-[11px] text-slate-400 mt-1">Mission Karmayogi Compliant</p>
        </div>
      </div>

      {/* 2-Column Administrative Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live AI Assessments & Skill Deficits (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Assessments Managed by Admin */}
          <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Live AI-Generated Quizzes ({generatedQuizzes.length})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Published directly to user learner dashboards</p>
              </div>
              <button
                onClick={() => setCurrentScreen('admin-quiz-studio')}
                className="text-xs text-purple-400 hover:underline font-semibold cursor-pointer"
              >
                + Create New Quiz
              </button>
            </div>

            <div className="space-y-3">
              {generatedQuizzes.slice(0, 3).map((quiz) => (
                <div
                  key={quiz.id}
                  className="p-4 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] hover:border-purple-500/50 transition-all flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 truncate">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-900/60 text-blue-300 border border-blue-500/40">
                        {quiz.difficulty || 'Medium'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {quiz.questions?.length || 5} Questions
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white truncate">{quiz.title}</h4>
                    <p className="text-[11px] text-slate-400 truncate">Source: {quiz.documentName || 'Official Document'}</p>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex-shrink-0">
                    Live Active
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Skill Deficits Across Cadres */}
          <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Workforce Skill Deficits in {activeDept?.name}
            </h3>

            <div className="space-y-3">
              {adminOrgData.workforceSkillGaps.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{item.skill}</span>
                    <span className="font-bold text-rose-400">{item.gapPercentage}% Deficit ({item.affectedCount} Officers)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${
                        item.gapPercentage > 35 ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${item.gapPercentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Governance Actions & Department Comparison (1 Col) */}
        <div className="space-y-6">
          {/* Quick Command Actions */}
          <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-[#1E2E4A]">
              Administrative Actions
            </h4>

            <button
              onClick={() => setCurrentScreen('admin-quiz-studio')}
              className="w-full p-3 rounded-2xl bg-[#0B1528] hover:bg-[#162544] border border-[#1E2E4A] hover:border-purple-500/50 text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-white group-hover:text-purple-300">Upload Material & Generate Quiz</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Groq Llama 3.3 Powered</p>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </button>

            <button
              onClick={() => setCurrentScreen('admin-learners')}
              className="w-full p-3 rounded-2xl bg-[#0B1528] hover:bg-[#162544] border border-[#1E2E4A] hover:border-blue-500/50 text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-white group-hover:text-blue-300">Learner Passbooks Directory</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Inspect & Mandate Modules</p>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>

            <button
              onClick={() => setCurrentScreen('admin-analytics')}
              className="w-full p-3 rounded-2xl bg-[#0B1528] hover:bg-[#162544] border border-[#1E2E4A] hover:border-emerald-500/50 text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-white group-hover:text-emerald-300">Cadre Benchmarking Analytics</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Civil vs Municipal vs MoSPI</p>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              onClick={() => setCurrentScreen('admin-assessments')}
              className="w-full p-3 rounded-2xl bg-[#0B1528] hover:bg-[#162544] border border-[#1E2E4A] hover:border-amber-500/50 text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div>
                <p className="text-xs font-bold text-white group-hover:text-amber-300">Assessments & Policy Audits</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Pass Rates & Integrity Logs</p>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Department Cadres Switcher Box */}
          <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-[#1E2E4A]">
              Cadre Overview
            </h4>
            <div className="space-y-2">
              {adminDepartmentsConfig?.map((d) => (
                <div key={d.id} className="p-2.5 rounded-xl bg-[#0B1528] border border-[#1E2E4A] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{d.name.split('&')[0]}</p>
                    <p className="text-[10px] text-slate-400">{d.totalLearners} Officers</p>
                  </div>
                  <span className="font-bold text-emerald-400">{d.avgCompetency}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
