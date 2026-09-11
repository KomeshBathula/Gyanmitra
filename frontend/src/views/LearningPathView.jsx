import React from 'react';
import {
  GitBranch,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LearningPathView = () => {
  const { learningPathway, setCurrentScreen, showToast, t } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              {t('sourceGrounded')}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{t('learningPathTitle')}</h2>
            <p className="text-xs text-slate-500">
              {t('learningPathSub')}
            </p>
          </div>

          <button
            onClick={() => setCurrentScreen('ai-quiz')}
            className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white text-xs font-bold rounded-lg shadow-gov transition-all flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t('generateQuizBtn')}</span>
          </button>
        </div>

        {/* AI Rationale Banner */}
        <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start space-x-3">
          <Sparkles className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">{t('whyThisGapTitle')}</strong>
            <p className="mt-0.5 text-blue-800 leading-relaxed">
              This pathway prioritizes <strong>Python for Microdata</strong> and <strong>AI/Machine Learning</strong> because they represent your highest competency gaps (Level 2 → Level 4 deficit) for your current role as Deputy Director in SDRD. Foundational Python has been verified as complete.
            </p>
          </div>
        </div>
      </div>

      {/* Pathway Timeline */}
      <div className="space-y-4">
        {learningPathway.map((step, idx) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';
          const isUpcoming = step.status === 'upcoming';
          const isFuture = step.status === 'future';

          return (
            <div
              key={step.id}
              className={`rounded-xl border p-5 transition-all shadow-gov ${
                isCurrent
                  ? 'bg-white border-blue-500 ring-2 ring-blue-500/20 shadow-gov-md'
                  : isCompleted
                  ? 'bg-slate-50/80 border-emerald-200'
                  : 'bg-white border-slate-200 opacity-90'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  {/* Step Number Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-blue-600 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isCompleted ? '✓' : step.step}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCurrent
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isCompleted ? 'Completed' : isCurrent ? 'Active Module' : isUpcoming ? 'Upcoming' : 'Locked'}
                      </span>
                      <span className="text-xs text-slate-500">⏱ {step.duration}</span>
                      <span className="text-xs font-semibold text-slate-700">• {step.provider}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                    <p className="text-xs text-slate-600">{step.why}</p>

                    <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">
                        Target: {step.competency}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">
                        {step.skillLevel}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded font-semibold">
                        {step.completionDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress / CTA */}
                <div className="sm:text-right flex-shrink-0 space-y-2 w-full sm:w-auto">
                  {isCurrent && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between sm:justify-end space-x-2 text-xs font-bold text-blue-900">
                        <span>Progress: {step.progress}%</span>
                      </div>
                      <div className="w-full sm:w-36 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${step.progress}%` }}></div>
                      </div>
                      <button
                        onClick={() => setCurrentScreen('ai-quiz')}
                        className="w-full sm:w-auto px-4 py-2 bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold rounded-lg transition-colors shadow-gov"
                      >
                        Continue Module →
                      </button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="text-xs text-emerald-700 font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{step.score}</span>
                    </div>
                  )}

                  {isUpcoming && (
                    <button
                      onClick={() => showToast("Module enrolled. Will unlock upon completing current module.", "info")}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
                    >
                      View Syllabus
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
