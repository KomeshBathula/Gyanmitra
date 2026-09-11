import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Award,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Clock,
  BookOpen,
  Zap,
  Layers,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EmployeeDashboardView = () => {
  const {
    userProfile,
    competencyOverview,
    skillGaps,
    learningPathway,
    courses,
    setCurrentScreen,
    setIsAiDrawerOpen,
    setActiveQuizType,
    setCurrentQuizData,
    t,
    language
  } = useApp();

  const highPriorityGaps = skillGaps.filter(g => g.priority === 'High');

  return (
    <div className="space-y-6 pb-10">
      {/* Karmayogi Mission Welcome Hero Banner */}
      <div className="karmayogi-header-gradient rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        {/* Subtle decorative crest representation */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center pr-8 pointer-events-none">
          <div className="w-56 h-56 rounded-full border-8 border-white flex items-center justify-center font-serif text-6xl font-black">
            iGOT
          </div>
        </div>

        <div className="max-w-2xl relative z-10 space-y-2.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-amber-300 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Mission Karmayogi • National Programme for Civil Services Capacity Building</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('welcomeOfficer')}, {userProfile.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {t('welcomeSub')} <strong> MoSPI Annual Capacity Building Plan (ACBP 2026)</strong> & NSSTA.
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentScreen('learning-path')}
              className="px-4 py-2 rounded-xl bg-white text-[#1B365D] hover:bg-slate-100 text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer"
            >
              <span>{t('continueLearningTitle') || 'Resume Active Module'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentScreen('assessment')}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>{t('takeAssessmentBtn')}</span>
            </button>
            <button
              onClick={() => setIsAiDrawerOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-200 text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFA730]" />
              <span>{t('aiAssistant')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Karmayogi KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('kpiCompetencyScore')}</p>
          <div className="flex items-baseline space-x-2 mt-1">
            <h3 className="text-2xl font-black text-slate-900">{competencyOverview.overallScore}%</h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {t('kpiScoreDelta')}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#264092] h-2 rounded-full transition-all duration-500" style={{ width: `${competencyOverview.overallScore}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">{t('benchmarkTarget')}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('kpiSkillGaps')}</p>
          <div className="flex items-baseline space-x-2 mt-1">
            <h3 className="text-2xl font-black text-slate-900">{skillGaps.filter(g => g.gap > 0).length}</h3>
            <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
              {t('kpiHighPriority')}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-4">
            {t('urgentGapsDesc')}
          </p>
          <button
            onClick={() => setCurrentScreen('skill-gaps')}
            className="text-xs text-[#264092] font-bold hover:underline mt-1 block cursor-pointer"
          >
            {t('viewAllGaps')} →
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('kpiPathwayProgress')}</p>
            <span className="text-amber-600 font-bold text-xs flex items-center">
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-0.5" />
              1,250 Pts
            </span>
          </div>
          <div className="flex items-baseline space-x-2 mt-1">
            <h3 className="text-2xl font-black text-slate-900">64%</h3>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              {t('kpiMilestones')}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '64%' }}></div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">{t('kpiKarmayogiCredits')}: 420</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('trainingHours')}</p>
          <div className="flex items-baseline space-x-2 mt-1">
            <h3 className="text-2xl font-black text-slate-900">42 {t('hours')}</h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              +6 {t('hours')}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-4">{t('verifiedVia')}</p>
          <button
            onClick={() => setCurrentScreen('progress')}
            className="text-xs text-[#264092] font-bold hover:underline mt-1 block cursor-pointer"
          >
            {t('navProgress')} →
          </button>
        </div>
      </div>

      {/* Main Section: FRAC Competency Overview Bars */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-extrabold text-[#1B365D] flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#264092]" />
              <span>{t('competenciesTitle')} (FRAC Matrix)</span>
            </h3>
            <p className="text-xs text-slate-500">
              {t('competenciesSub')}
            </p>
          </div>
          <button
            onClick={() => setCurrentScreen('competencies')}
            className="text-xs font-bold text-[#264092] hover:text-[#1B365D] flex items-center cursor-pointer"
          >
            <span>{t('viewDetails')}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competencyOverview.categories.map((cat) => (
            <div key={cat.id} className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{cat.name}</span>
                <div className="space-x-1.5">
                  <span className="font-black text-slate-900">{cat.score}%</span>
                  <span className="text-slate-400 font-normal">/ {t('targetScore')} {cat.target}%</span>
                </div>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-700 ${
                    cat.score >= 80 ? 'bg-emerald-600' : cat.score >= 70 ? 'bg-[#264092]' : 'bg-amber-500'
                  }`}
                  style={{ width: `${cat.score}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                <span>{cat.count} {t('navCompetencies')}</span>
                <span className={cat.score >= cat.target ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                  {cat.score >= cat.target ? '✓ Target Achieved' : `${cat.target - cat.score}% Gap`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Skill Gaps Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#1B365D]">{t('urgentGapsTitle')}</h3>
            <p className="text-xs text-slate-500">
              {t('urgentGapsDesc')}
            </p>
          </div>
          <button
            onClick={() => setCurrentScreen('skill-gaps')}
            className="text-xs font-bold text-[#264092] hover:underline cursor-pointer"
          >
            {t('viewAllGaps')} ({skillGaps.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skillGaps.filter(g => g.gap > 0).slice(0, 3).map((gap) => (
            <div key={gap.id} className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                    {gap.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    gap.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {gap.priority === 'High' ? t('highSeverity') : t('mediumSeverity')}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{gap.competency}</h4>
                  <div className="mt-2 grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">{t('currentLevel')}</span>
                      <span className="text-xs font-bold text-slate-700">{t('level')} {gap.currentLevel}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">{t('requiredLevel')}</span>
                      <span className="text-xs font-bold text-blue-800">{t('level')} {gap.requiredLevel}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">{t('colDeficit')}</span>
                      <span className="text-xs font-bold text-red-600">{gap.gap} {t('level')}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {gap.why}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setCurrentScreen('skill-gaps')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                >
                  {t('viewDetails')}
                </button>
                <button
                  onClick={() => setCurrentScreen('learning-path')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#1B365D] hover:bg-[#152c4d] transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span>{t('startLearning')}</span>
                  <ArrowRight className="w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended iGOT Karmayogi Courses */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-extrabold text-[#1B365D]">{t('coursesTitle')} (iGOT Karmayogi)</h3>
            <p className="text-xs text-slate-500">
              {t('coursesSub')}
            </p>
          </div>
          <button
            onClick={() => setCurrentScreen('courses')}
            className="text-xs font-bold text-[#264092] hover:underline cursor-pointer"
          >
            {t('viewAll')} →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.filter(c => c.isRecommended).slice(0, 2).map((crs) => (
            <div key={crs.id} className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    crs.providerType === 'NSSTA' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-blue-50 text-blue-800 border border-blue-200'
                  }`}>
                    {crs.provider}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {crs.matchScore}% Match
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">{crs.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{crs.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>⏱ {crs.duration} • {crs.difficulty}</span>
                <button
                  onClick={() => setCurrentScreen('learning-path')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1B365D] hover:bg-[#152c4d] text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  {t('startLearning')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Learning Strip */}
      <div className="bg-blue-50/80 rounded-xl border border-blue-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#264092] text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
            ▶
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">{t('continueLearningTitle')}</span>
            <h4 className="text-sm font-bold text-slate-900">Python for Microdata Processing & NSS Vectorization</h4>
            <p className="text-xs text-slate-600">{t('step')} 4/6 • 65% {t('completed')}</p>
          </div>
        </div>

        <button
          onClick={() => setCurrentScreen('learning-path')}
          className="px-4 py-2 bg-[#1B365D] hover:bg-[#152c4d] text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap cursor-pointer"
        >
          {t('continueLearningTitle')} →
        </button>
      </div>
    </div>
  );
};

