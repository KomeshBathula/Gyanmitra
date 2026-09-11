import React, { useState } from 'react';
import {
  ClipboardCheck,
  Clock,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Award,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AssessmentView = () => {
  const { standardQuestions, setCurrentScreen, updateCompetencyAfterQuiz, setLastQuizResult, showToast } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const totalQuestions = standardQuestions.length;
  const currentQ = standardQuestions[currentIdx];

  const handleSelectOption = (optIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optIdx
    }));
  };

  const toggleMarkReview = () => {
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleSubmitAssessment = () => {
    let correctCount = 0;
    standardQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / totalQuestions) * 100);
    const resultObj = {
      scorePercentage: scorePct,
      correctCount,
      totalCount: totalQuestions,
      competencyImpacted: "Python for Data Analysis & Official Sampling",
      evaluatedAt: new Date().toLocaleTimeString(),
      answersRecord: selectedAnswers
    };

    setEvaluationResult(resultObj);
    setIsSubmitted(true);
    setLastQuizResult(resultObj);
    updateCompetencyAfterQuiz(resultObj);
    showToast(`Assessment submitted! Score: ${scorePct}%`, "success");
  };

  if (isSubmitted && evaluationResult) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in">
        {/* Results Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-gov-md text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Assessment Completed & Evaluated
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              Overall Competency Score: {evaluationResult.scorePercentage}%
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Correct Answers: {evaluationResult.correctCount} of {evaluationResult.totalCount} Questions
            </p>
          </div>

          {/* Impact Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left pt-4">
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-900 block">Demonstrated Strengths</span>
              <ul className="text-xs text-emerald-800 space-y-1 mt-2">
                <li>✓ Survey Sampling & Stratification (PPSWR)</li>
                <li>✓ National Accounts Basic Price Calculation</li>
                <li>✓ DPDP Act 2023 Disclosure Control</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
              <span className="text-xs font-bold text-amber-900 block">Recommended Improvement Areas</span>
              <ul className="text-xs text-amber-800 space-y-1 mt-2">
                <li>• Python Memory-Efficient Vectorization</li>
                <li>• ML Imputation in Enterprise Microdata</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setCurrentScreen('skill-gaps')}
              className="px-5 py-2.5 bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold rounded-lg shadow-gov transition-all flex items-center space-x-1.5"
            >
              <span>View Updated Skill Gaps</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentScreen('learning-path')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 transition-colors"
            >
              View Updated Learning Path
            </button>
          </div>
        </div>

        {/* Detailed Review */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Question-by-Question Evaluation with Official Source Citations
          </h3>

          <div className="space-y-4">
            {standardQuestions.map((q, idx) => {
              const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border ${
                    isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                  } space-y-2`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Question {idx + 1} • {q.category}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? '✓ Correct' : '✕ Incorrect'}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-900">{q.question}</p>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                    <p className="text-slate-700">
                      <strong>Correct Answer:</strong> Option {String.fromCharCode(65 + q.correctAnswer)}: {q.options[q.correctAnswer]}
                    </p>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      <strong>Rationale:</strong> {q.explanation}
                    </p>
                    <p className="text-blue-700 text-[10px] font-mono pt-1">
                      <strong>Source Reference:</strong> {q.sourceRef}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
              National Statistical Competency Benchmark
            </span>
            <span className="text-xs text-slate-400">Quarterly Cadre Assessment</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            Competency Assessment: Official Statistics & Data Science
          </h2>
          <p className="text-xs text-slate-500">
            Evaluate your knowledge against the ISS Deputy Director competency standards.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200">
          <Clock className="w-4 h-4 text-slate-500" />
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">TIME REMAINING</span>
            <span className="font-mono font-bold text-slate-800 text-sm">14:32</span>
          </div>
        </div>
      </div>

      {/* Main Assessment Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question Area (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov space-y-4">
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="font-bold text-gov-blue">
                Question {currentIdx + 1} of {totalQuestions}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                Category: {currentQ.category}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 leading-relaxed">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === oIdx;
                const letter = String.fromCharCode(65 + oIdx);

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start space-x-3 text-xs ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-900 font-medium'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 border border-slate-300'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation & Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={toggleMarkReview}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  markedForReview[currentQ.id]
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {markedForReview[currentQ.id] ? '★ Marked for Review' : '☆ Mark for Review'}
              </button>

              <div className="flex items-center space-x-2">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(currentIdx - 1)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {currentIdx < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(currentIdx + 1)}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-gov-blue hover:bg-gov-navy transition-colors flex items-center space-x-1"
                  >
                    <span>Save & Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitAssessment}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-gov"
                  >
                    Submit Assessment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Question Navigator */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
              Question Palette
            </h4>

            <div className="grid grid-cols-5 gap-2">
              {standardQuestions.map((q, qIndex) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];
                const isCurrent = currentIdx === qIndex;

                let btnStyle = "bg-slate-100 text-slate-700 border-slate-200";
                if (isCurrent) {
                  btnStyle = "ring-2 ring-blue-600 border-blue-600 font-bold";
                }
                if (isAnswered) {
                  btnStyle += " bg-emerald-600 text-white border-emerald-700";
                } else if (isMarked) {
                  btnStyle += " bg-amber-400 text-slate-900 border-amber-500 font-bold";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(qIndex)}
                    className={`h-9 rounded-lg text-xs font-medium border flex items-center justify-center transition-all ${btnStyle}`}
                  >
                    {qIndex + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-600">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-emerald-600"></span>
                <span>Answered ({Object.keys(selectedAnswers).length})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-amber-400"></span>
                <span>Marked for Review ({Object.values(markedForReview).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300"></span>
                <span>Unattempted ({totalQuestions - Object.keys(selectedAnswers).length})</span>
              </div>
            </div>

            <button
              onClick={handleSubmitAssessment}
              className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors shadow-gov"
            >
              Finish & Evaluate Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
