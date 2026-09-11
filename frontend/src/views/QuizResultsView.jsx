import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuizResultsView = () => {
  const { lastQuizResult, setCurrentScreen, showToast } = useApp();

  const score = lastQuizResult?.scorePercentage || 80;
  const correctCount = lastQuizResult?.correctCount || 4;
  const totalCount = lastQuizResult?.totalCount || 5;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Results Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-gov-md text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            Source-Grounded AI Assessment Evaluated
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            Score: {score}% ({correctCount}/{totalCount} Correct)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Based on: <strong>{lastQuizResult?.documentTitle || "MoSPI NSS 79th Round Sampling Manual"}</strong>
          </p>
        </div>

        {/* Competency Impact Display (Closed-Loop) */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 max-w-xl mx-auto text-left space-y-2">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
            ⚡ Closed-Loop Competency Impact
          </span>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3 rounded-lg border border-blue-200">
              <span className="text-slate-500 block">Survey Sampling Competency</span>
              <span className="font-bold text-emerald-700 text-sm">72% → 81% (+9%)</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-200">
              <span className="text-slate-500 block">Overall Cadre Index</span>
              <span className="font-bold text-emerald-700 text-sm">68% → 72% (+4%)</span>
            </div>
          </div>
          <p className="text-[11px] text-blue-800 pt-1">
            ✓ Your demonstrated competency in Sampling & Multi-Stage Design has advanced to Level 3.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              showToast("Competency ledger synchronized with Mission Karmayogi database.", "success");
              setCurrentScreen('learning-path');
            }}
            className="px-5 py-2.5 bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold rounded-lg shadow-gov transition-all flex items-center space-x-1.5"
          >
            <span>Update My Learning Path</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentScreen('skill-gaps')}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300"
          >
            View Recalibrated Skill Gaps
          </button>
        </div>
      </div>
    </div>
  );
};
