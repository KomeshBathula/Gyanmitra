import React, { useState, useEffect } from 'react';
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
  TrendingUp,
  Maximize2,
  Minimize2,
  Shield,
  X,
  RotateCcw,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AssessmentView = () => {
  const {
    standardQuestions,
    setCurrentScreen,
    updateCompetencyAfterQuiz,
    setLastQuizResult,
    lastQuizResult,
    hasCompletedInitialAssessment,
    showToast,
    userProfile
  } = useApp();

  const assessmentKey = `gyanmitra_initial_assessment_${userProfile?.email || 'user'}`;
  const isAlreadyCompleted = hasCompletedInitialAssessment || (localStorage.getItem(assessmentKey) === 'true');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(isAlreadyCompleted);
  const [evaluationResult, setEvaluationResult] = useState(
    lastQuizResult || (isAlreadyCompleted ? {
      scorePercentage: 80,
      correctCount: 4,
      totalCount: standardQuestions.length || 5,
      competencyImpacted: "Python for Data Analysis & Official Sampling",
      evaluatedAt: "Official Baseline Record",
      isPastRecord: true
    } : null)
  );
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  // 15-minute countdown timer (900 seconds)
  const [timeLeft, setTimeLeft] = useState(900);

  const handleRetakeAssessment = () => {
    setIsSubmitted(false);
    setEvaluationResult(null);
    setSelectedAnswers({});
    setMarkedForReview({});
    setCurrentIdx(0);
    setTimeLeft(900);
    showToast("Starting new assessment attempt in full-screen mode.", "info");
  };

  // Request browser fullscreen upon entering assessment
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        }
      } catch (err) {
        // Fallback: visual full-viewport is active
      }
    };
    enterFullscreen();

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  // Timer interval
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (e) {}
  };

  const totalQuestions = standardQuestions.length;
  const currentQ = standardQuestions[currentIdx] || standardQuestions[0];

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

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  // ----------------------------------------------------
  // RESULTS VIEW (Post-Submission in Full Screen)
  // ----------------------------------------------------
  if (isSubmitted && evaluationResult) {
    return (
      <div className="min-h-screen bg-[#0B1528] text-slate-100 flex flex-col p-4 sm:p-8 select-none">
        {/* Top Mini Header */}
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#1E2E4A]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-900/60 border border-blue-500/50 flex items-center justify-center text-blue-300 font-bold">
              GM
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">GyanMitra Official Competency Ledger</h1>
              <p className="text-[11px] text-slate-400">MoSPI • Mission Karmayogi Bharat Diagnostic</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFullscreen}
              className="px-3 py-1.5 rounded-xl bg-[#111F38] border border-[#1E2E4A] hover:bg-[#162544] text-xs text-slate-300 hover:text-white flex items-center space-x-1.5 cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
            </button>
            <button
              onClick={() => {
                if (document.fullscreenElement && document.exitFullscreen) {
                  document.exitFullscreen().catch(() => {});
                }
                setCurrentScreen('dashboard');
              }}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              Go to Dashboard
            </button>
          </div>
        </div>

        {/* Results Body */}
        <div className="max-w-4xl mx-auto w-full space-y-6 pt-6 animate-in fade-in">
          {/* Main Score Banner */}
          <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] p-6 sm:p-8 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-600/50">
                ✓ Assessment Completed & Evaluated
              </span>
              <h2 className="text-3xl font-black text-white mt-3">
                Overall Demonstrated Score: {evaluationResult.scorePercentage}%
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Correct Answers: <strong className="text-white">{evaluationResult.correctCount}</strong> of {evaluationResult.totalCount} Questions • +100 Karmayogi Karma Points Awarded
              </p>
            </div>

            {/* Competency Impact Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left pt-2">
              <div className="p-4 rounded-2xl bg-[#0B1528] border border-emerald-600/30">
                <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Demonstrated Strengths</span>
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5 mt-2.5">
                  <li>✓ Multi-Stage NSS Sampling & PPSWR Frame</li>
                  <li>✓ National Accounts GVA & MCA-21 Compilation</li>
                  <li>✓ DPDP Act 2023 Disclosure Control</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B1528] border border-amber-600/30">
                <span className="text-xs font-bold text-amber-400 flex items-center space-x-1.5">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span>Priority Calibration Areas</span>
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5 mt-2.5">
                  <li>• Python Vectorization for Survey Unit Records</li>
                  <li>• Automated CAPI Rule Validation Engine</li>
                </ul>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  if (document.fullscreenElement && document.exitFullscreen) {
                    document.exitFullscreen().catch(() => {});
                  }
                  setCurrentScreen('skill-gaps');
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>View Updated FRAC Skill Gaps</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (document.fullscreenElement && document.exitFullscreen) {
                    document.exitFullscreen().catch(() => {});
                  }
                  setCurrentScreen('learning-path');
                }}
                className="px-5 py-2.5 bg-[#162544] hover:bg-[#1E3A6D] text-white text-xs font-bold rounded-xl border border-[#1E2E4A] transition-colors cursor-pointer"
              >
                View Personalized Learning Roadmap
                View Learning Roadmap
              </button>
              <button
                onClick={handleRetakeAssessment}
                className="px-4 py-2.5 bg-[#0B1528] hover:bg-[#162544] text-slate-300 hover:text-white text-xs font-bold rounded-xl border border-[#1E2E4A] transition-colors cursor-pointer flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] p-6 shadow-2xl space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-3 border-b border-[#1E2E4A]">
              Question-by-Question Evaluation & Official Citations
            </h3>

            <div className="space-y-4">
              {standardQuestions.map((q, idx) => {
                const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border ${
                      isCorrect ? 'bg-emerald-950/20 border-emerald-600/40' : 'bg-rose-950/20 border-rose-600/40'
                    } space-y-2`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300">Question {idx + 1} • {q.category}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isCorrect ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50' : 'bg-rose-950 text-rose-300 border border-rose-600/50'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✕ Incorrect'}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-white">{q.question}</p>

                    <div className="p-3 bg-[#0B1528] rounded-xl border border-[#1E2E4A] text-xs space-y-1.5 mt-2">
                      <p className="text-slate-300">
                        <strong className="text-white">Correct Answer:</strong> Option {String.fromCharCode(65 + q.correctAnswer)}: {q.options[q.correctAnswer]}
                      </p>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        <strong className="text-slate-300">Official Rationale:</strong> {q.explanation}
                      </p>
                      <p className="text-blue-400 text-[10px] font-mono pt-0.5">
                        <strong>Source Reference:</strong> {q.sourceRef}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // FULL SCREEN ACTIVE EXAMINATION VIEW
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0B1528] text-slate-100 flex flex-col justify-between select-none">
      {/* Top Sticky Fullscreen Examination Bar */}
      <header className="sticky top-0 z-40 bg-[#0F1E36] border-b border-[#1E2E4A] px-4 sm:px-8 py-3.5 shadow-xl flex items-center justify-between">
        {/* Left: Official Seals & Examination Title */}
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-blue-900/80 border border-blue-500/50 flex items-center justify-center text-blue-300 font-extrabold text-sm shadow-md">
            🇮🇳
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950/90 text-blue-300 border border-blue-600/50">
                MoSPI National Statistical Assessment
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Live Mode</span>
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate max-w-xs sm:max-w-md">
              Competency Assessment: Official Statistics & Data Science
            </h1>
          </div>
        </div>

        {/* Right: Live Countdown Timer & Fullscreen Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Countdown Clock */}
          <div className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border font-mono ${
            timeLeft < 180
              ? 'bg-red-950/80 border-red-500/80 text-red-300 animate-pulse'
              : 'bg-[#0B1528] border-[#1E2E4A] text-slate-200'
          }`}>
            <Clock className={`w-4 h-4 ${timeLeft < 180 ? 'text-red-400' : 'text-blue-400'}`} />
            <div>
              <span className="text-[9px] text-slate-400 block font-sans uppercase font-bold leading-none">Time Left</span>
              <span className="text-sm font-black">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[#111F38] hover:bg-[#162544] text-slate-300 hover:text-white border border-[#1E2E4A] transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Exit Button */}
          <button
            onClick={() => setShowExitConfirm(true)}
            className="px-3 py-1.5 rounded-xl bg-red-950/70 hover:bg-red-900/80 border border-red-700/50 text-red-300 hover:text-red-100 text-xs font-bold transition-colors cursor-pointer"
          >
            Exit Exam
          </button>
        </div>
      </header>

      {/* Main Examination Question Center */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Question */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Top Indicator */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2E4A] text-xs">
              <span className="font-black text-blue-400 text-sm">
                Question {currentIdx + 1} of {totalQuestions}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0B1528] text-slate-300 border border-[#1E2E4A] text-xs font-semibold">
                Domain: {currentQ.category}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === oIdx;
                const letter = String.fromCharCode(65 + oIdx);

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start space-x-3.5 text-xs sm:text-sm cursor-pointer ${
                      isSelected
                        ? 'bg-blue-900/40 border-blue-500 ring-2 ring-blue-500/30 text-white font-medium shadow-lg'
                        : 'bg-[#0B1528] hover:bg-[#162544] border-[#1E2E4A] text-slate-300'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-600 text-white shadow-md' : 'bg-[#111F38] text-slate-400 border border-[#1E2E4A]'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="flex-1 leading-relaxed pt-0.5">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-[#1E2E4A] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={toggleMarkReview}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  markedForReview[currentQ.id]
                    ? 'bg-amber-950/80 text-amber-300 border-amber-500/80'
                    : 'bg-[#0B1528] text-slate-300 border-[#1E2E4A] hover:bg-[#162544]'
                }`}
              >
                {markedForReview[currentQ.id] ? '★ Marked for Review' : '☆ Mark for Review'}
              </button>

              <div className="flex items-center space-x-2.5">
                <button
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(currentIdx - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 bg-[#0B1528] hover:bg-[#162544] border border-[#1E2E4A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Previous
                </button>
                {currentIdx < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(currentIdx + 1)}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center space-x-1.5 shadow-md cursor-pointer"
                  >
                    <span>Save & Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitAssessment}
                    className="px-6 py-2 rounded-xl text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 cursor-pointer"
                  >
                    Submit Assessment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Question Palette & Live Progress */}
        <div className="space-y-5">
          <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] p-6 shadow-2xl space-y-5">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-3 border-b border-[#1E2E4A]">
              Question Navigator
            </h3>

            <div className="grid grid-cols-5 gap-2.5">
              {standardQuestions.map((q, qIndex) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isMarked = markedForReview[q.id];
                const isCurrent = currentIdx === qIndex;

                let btnStyle = "bg-[#0B1528] text-slate-300 border-[#1E2E4A]";
                if (isCurrent) {
                  btnStyle = "ring-2 ring-blue-400 border-blue-400 font-bold text-white";
                }
                if (isAnswered) {
                  btnStyle += " bg-emerald-900/80 text-emerald-200 border-emerald-500/80 font-bold";
                } else if (isMarked) {
                  btnStyle += " bg-amber-900/80 text-amber-200 border-amber-500/80 font-bold";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(qIndex)}
                    className={`h-10 rounded-xl text-xs font-bold border flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                  >
                    {qIndex + 1}
                  </button>
                );
              })}
            </div>

            {/* Palette Legend */}
            <div className="pt-3 border-t border-[#1E2E4A] space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-600"></span>
                  <span>Answered</span>
                </div>
                <span className="font-bold text-white">{Object.keys(selectedAnswers).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded bg-amber-500"></span>
                  <span>Marked for Review</span>
                </div>
                <span className="font-bold text-white">{Object.values(markedForReview).filter(Boolean).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded bg-[#0B1528] border border-[#1E2E4A]"></span>
                  <span>Unanswered</span>
                </div>
                <span className="font-bold text-white">{totalQuestions - Object.keys(selectedAnswers).length}</span>
              </div>
            </div>

            <button
              onClick={handleSubmitAssessment}
              className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs rounded-xl transition-all shadow-xl shadow-emerald-600/20 cursor-pointer"
            >
              Finish & Evaluate Assessment
            </button>
          </div>
        </div>
      </main>

      {/* Exit Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#111F38] text-slate-100 p-6 rounded-3xl border border-[#1E2E4A] max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-white">Exit Assessment?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to leave the full-screen examination? Your progress will not be saved unless you submit.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-xl bg-[#0B1528] hover:bg-[#162544] text-slate-300 text-xs font-bold border border-[#1E2E4A] cursor-pointer"
              >
                Continue Assessment
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  if (document.fullscreenElement && document.exitFullscreen) {
                    document.exitFullscreen().catch(() => {});
                  }
                  setCurrentScreen('dashboard');
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Exit to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
