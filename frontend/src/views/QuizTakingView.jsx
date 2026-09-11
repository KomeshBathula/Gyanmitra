import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  FileText,
  Maximize2,
  Minimize2,
  Clock,
  Building2,
  Shield,
  User,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const QuizTakingView = () => {
  const {
    currentQuizData,
    setCurrentScreen,
    setLastQuizResult,
    updateCompetencyAfterQuiz,
    userProfile,
    showToast
  } = useApp();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showInstantExplanation, setShowInstantExplanation] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 mins timer
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef(null);

  const defaultQuiz = {
    id: "quiz-gen-101",
    title: "AI Assessment: NSS 79th Round Sampling & Estimation Protocol",
    documentSource: "MoSPI_NSS79_Sampling_Methodology_Guidelines.pdf",
    courseId: "ml-c-1",
    courseTitle: "Foundation Training on Python for Large Microdata",
    department: "Survey Design and Research Division (SDRD)",
    createdBy: "Dr. Arvind Mehta (ADG, SDRD - Department Admin)",
    targetUserName: userProfile?.name || "Rajesh Kumar",
    questions: [
      {
        id: 1,
        question: "According to Section 2.4 of the uploaded NSS 79th Round manual, what is the exact population threshold for forming an independent rural sub-stratum?",
        options: [
          "Villages with census population of 5,000 or more form an independent sub-stratum.",
          "Villages with census population of 10,000 or more are split into two sub-districts.",
          "Sub-stratification is solely decided at the discretion of the State DES Director.",
          "Only villages with 100% electrified households form Sub-stratum 1."
        ],
        correctAnswer: 0,
        explanation: "As specified in Section 2.4.1 (page 18): 'In rural sector, all large villages having population 5,000 or more as per Census 2011 shall form a separate sub-stratum to avoid sampling variance.'",
        sourceCitation: "Page 18, Para 2.4.1 (Sampling Methodology Manual)",
        relatedModule: "Module 1: Vectorized operations on multi-gigabyte survey files",
        moduleId: 1
      },
      {
        id: 2,
        question: "How does the manual mandate calculating the casualty multiplier adjustment when an allocated sample hamlet cannot be surveyed due to physical inaccessibility?",
        options: [
          "The entire district's survey results are invalidated.",
          "A casualty adjustment factor (Total allocated SSUs / Surveyed SSUs) is applied to the sample multiplier.",
          "The missing hamlet is arbitrarily substituted with a neighboring village without record.",
          "The weight of all other states in India is increased by 0.5%."
        ],
        correctAnswer: 1,
        explanation: "Para 3.12 (Casualty Handling): Sample weights are dynamically re-adjusted by the ratio of allocated over surveyed sampling units.",
        sourceCitation: "Page 34, Formula 3.12 (Casualty Multiplier Equation)",
        relatedModule: "Module 2: Handling complex survey weights & stratified multipliers",
        moduleId: 2
      },
      {
        id: 3,
        question: "Which data consistency rule is enforced for CAPI Schedule 21.1 electronic survey forms?",
        options: [
          "Automated ratio checks trigger a supervisor hard-warning if household consumer expenditure exceeds 50x monthly income.",
          "Field investigators can bypass household roster verification if time is short.",
          "All data must be stored in plaintext XML without encryption on Android tablets.",
          "Geo-tagging is strictly optional for rural First Stage Units."
        ],
        correctAnswer: 0,
        explanation: "Page 67, CAPI Protocol Annexure: Automated ratio validation prevents illogical consumer expenditure entries before tablet form submission.",
        sourceCitation: "Annexure C, Page 67 (CAPI Quality Assurance)",
        relatedModule: "Module 3: Automated consistency checks & outlier detection rules",
        moduleId: 3
      }
    ]
  };

  const quiz = currentQuizData && currentQuizData.questions && currentQuizData.questions.length > 0
    ? {
        id: currentQuizData.id || "quiz-custom",
        title: currentQuizData.title || "Department Admin Course Assessment",
        documentSource: currentQuizData.documentName || currentQuizData.topic || "MoSPI Course Manual",
        courseId: currentQuizData.courseId || "cnt-1",
        courseTitle: currentQuizData.courseTitle || currentQuizData.title || "Course Curriculum",
        department: currentQuizData.targetDepartment || currentQuizData.department || userProfile?.department || "Survey Design & Research Division",
        createdBy: currentQuizData.createdBy || "Department Admin",
        targetUserName: currentQuizData.targetUserName || userProfile?.name || "Rajesh Kumar",
        passingScorePercentage: currentQuizData.passingScorePercentage || 70,
        questions: currentQuizData.questions
      }
    : defaultQuiz;

  const totalQ = quiz.questions.length;
  const currentQ = quiz.questions[currentIdx];

  // Request browser full-screen on launch
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
          setIsFullscreen(true);
        }
      } catch (err) {
        // Fallback gracefully if blocked by browser autoplay policy
      }
    };
    enterFullscreen();

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Timer countdown
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      clearInterval(timer);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleSelectOption = (oIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: oIdx
    }));
    setShowInstantExplanation(true);
  };

  const handleCompleteQuiz = async () => {
    setIsSubmitting(true);
    let correct = 0;
    const reviewList = [];
    const missedQuestions = [];
    const recommendedModules = [];

    quiz.questions.forEach((q, idx) => {
      const selected = selectedAnswers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) {
        correct++;
      } else {
        missedQuestions.push({
          id: q.id,
          question: q.question,
          selectedAnswer: selected,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          sourceCitation: q.sourceCitation,
          relatedModule: q.relatedModule || `Module ${idx + 1}`
        });

        if (q.relatedModule) {
          recommendedModules.push({
            moduleName: q.relatedModule,
            moduleId: q.moduleId || idx + 1,
            courseId: quiz.courseId,
            courseTitle: quiz.courseTitle,
            reason: `Targeted revision recommended for concept assessed in Q${idx + 1}`
          });
        }
      }

      reviewList.push({
        id: q.id,
        question: q.question,
        options: q.options,
        selectedAnswer: selected,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
        sourceCitation: q.sourceCitation,
        relatedModule: q.relatedModule || `Module ${idx + 1}`
      });
    });

    const scorePct = Math.round((correct / totalQ) * 100);
    const isPassed = scorePct >= (quiz.passingScorePercentage || 70);

    // Call backend submit endpoint if connected
    try {
      await api.submitAIQuiz({
        quizId: quiz.id,
        answers: selectedAnswers,
        courseId: quiz.courseId,
        userProfile
      });
    } catch (e) {
      // Offline fallback handling
    }

    // Dynamic Follow-up Course Recommendations
    const recommendedCourses = [
      {
        id: "crs-101",
        title: "Python for Microdata Processing & NSS Vectorization",
        provider: "NSSTA Greater Noida",
        difficulty: "Level 3 (Proficient)",
        duration: "20 Hours",
        matchScore: isPassed ? 98 : 92,
        recommendationReason: isPassed
          ? "Next-level advanced competency track for high-throughput official survey processing."
          : "Remedial core curriculum to strengthen multi-stage sampling and survey script vectorization."
      },
      {
        id: "crs-102",
        title: "Applied Machine Learning for National Accounts & Imputation",
        provider: "iGOT Karmayogi",
        difficulty: "Level 3-4 (Advanced)",
        duration: "24 Hours",
        matchScore: 94,
        recommendationReason: "Recommended follow-up module for missing-value imputation and automated classification."
      }
    ];

    const resultObj = {
      scorePercentage: scorePct,
      correctCount: correct,
      totalCount: totalQ,
      isPassed,
      quizTitle: quiz.title,
      courseId: quiz.courseId,
      courseTitle: quiz.courseTitle,
      department: quiz.department,
      createdBy: quiz.createdBy,
      targetUserName: quiz.targetUserName,
      evaluatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      documentTitle: quiz.documentSource,
      questions: quiz.questions,
      reviewList,
      missedQuestions,
      recommendedModules,
      recommendedCourses,
      selectedAnswers
    };

    setLastQuizResult(resultObj);
    updateCompetencyAfterQuiz(resultObj);

    // Exit full-screen on finish if active
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    setIsSubmitting(false);
    setCurrentScreen('quiz-results');
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#060D1A] text-slate-100 flex flex-col overflow-y-auto select-none"
    >
      {/* Top Distraction-Free Government Exam Header */}
      <div className="bg-[#0B1528] border-b border-[#1E2E4A] px-4 sm:px-8 py-3.5 sticky top-0 z-30 shadow-2xl flex items-center justify-between gap-4">
        {/* Left: Department & Exam Identity */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-500/50 flex items-center justify-center text-purple-300 shadow-md flex-shrink-0">
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-900/80 text-purple-300 border border-purple-500/40">
                Department Admin Proctored Assessment
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">•</span>
              <span className="text-xs text-slate-400 font-medium truncate max-w-[200px] sm:max-w-xs hidden sm:inline">
                {quiz.department}
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-black text-white truncate max-w-xs sm:max-w-md mt-0.5">
              {quiz.courseTitle}
            </h2>
          </div>
        </div>

        {/* Center: Live Timer & Learner Badge */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#111F38] border border-[#1E2E4A] text-xs">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-300">Learner:</span>
            <strong className="text-white">{quiz.targetUserName}</strong>
          </div>

          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-amber-950/60 border border-amber-600/50 text-amber-300 text-xs font-mono font-bold shadow-inner">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Time Left: {formattedTime}</span>
          </div>
        </div>

        {/* Right: Fullscreen Toggle & Exit */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[#111F38] hover:bg-[#162544] border border-[#1E2E4A] text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to exit the full-screen assessment? Your current progress will be lost.")) {
                if (document.fullscreenElement) {
                  document.exitFullscreen().catch(() => {});
                }
                setCurrentScreen('learning-path');
              }
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 bg-[#111F38] hover:bg-[#1E2E4A] border border-[#1E2E4A] transition-colors cursor-pointer"
          >
            Exit Exam
          </button>
        </div>
      </div>

      {/* Main Full-Screen Body */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Question Palette Bar */}
        <div className="bg-[#0B1528] rounded-2xl border border-[#1E2E4A] p-4 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            {quiz.questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIdx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIdx(idx);
                    setShowInstantExplanation(selectedAnswers[quiz.questions[idx]?.id] !== undefined);
                  }}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer flex-shrink-0 ${
                    isCurrent
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400 shadow-lg scale-105'
                      : isAnswered
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                      : 'bg-[#111F38] text-slate-400 hover:text-white border border-[#1E2E4A]'
                  }`}
                >
                  {isAnswered && !isCurrent ? '✓' : idx + 1}
                </button>
              );
            })}
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-[11px] text-slate-400 block">Progress</span>
            <span className="text-xs font-black text-blue-400">
              {answeredCount} of {totalQ} Answered
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[#0B1528] rounded-3xl border border-[#1E2E4A] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Top Question Tag Row */}
          <div className="flex items-center justify-between gap-2 border-b border-[#1E2E4A] pb-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-xl text-xs font-black bg-blue-900/60 text-blue-300 border border-blue-600/50">
                Question {currentIdx + 1} of {totalQ}
              </span>
              {currentQ.relatedModule && (
                <span className="px-3 py-1 rounded-xl text-[11px] font-bold bg-amber-950/60 text-amber-300 border border-amber-600/40 truncate max-w-xs sm:max-w-md">
                  📖 {currentQ.relatedModule}
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">
              +10 Karmayogi Pts
            </span>
          </div>

          {/* Question Prompt */}
          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === oIdx;
              const isCorrect = oIdx === currentQ.correctAnswer;
              const letter = String.fromCharCode(65 + oIdx);

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm transition-all flex items-start space-x-3.5 cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-100 font-semibold ring-2 ring-emerald-500/40 shadow-lg'
                        : 'bg-rose-950/90 border-rose-500 text-rose-100 font-semibold ring-2 ring-rose-500/40 shadow-lg'
                      : 'bg-[#111F38] hover:bg-[#162544] border-[#1E2E4A] text-slate-200'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 ${
                      isSelected
                        ? isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                        : 'bg-[#162544] text-slate-300 border border-[#1E2E4A]'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Source Citation & Official Rationale Box */}
          {showInstantExplanation && selectedAnswers[currentQ.id] !== undefined && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#111F38] border border-blue-900/80 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center space-x-2 font-bold text-blue-300">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Department Grounding & Statutory Reference:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              {currentQ.sourceCitation && (
                <div className="text-blue-400 text-[11px] font-mono pt-1">
                  📍 Verified Citation: <strong>{currentQ.sourceCitation}</strong>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons Footer */}
          <div className="pt-6 border-t border-[#1E2E4A] flex items-center justify-between gap-3">
            <button
              disabled={currentIdx === 0}
              onClick={() => {
                setCurrentIdx(currentIdx - 1);
                setShowInstantExplanation(selectedAnswers[quiz.questions[currentIdx - 1]?.id] !== undefined);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-[#111F38] hover:bg-[#162544] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer border border-[#1E2E4A]"
            >
              Previous Question
            </button>

            {currentIdx < totalQ - 1 ? (
              <button
                onClick={() => {
                  setCurrentIdx(currentIdx + 1);
                  setShowInstantExplanation(selectedAnswers[quiz.questions[currentIdx + 1]?.id] !== undefined);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 flex items-center space-x-1.5 shadow-lg transition-all cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled={isSubmitting}
                onClick={handleCompleteQuiz}
                className="px-7 py-3 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-2xl transition-all cursor-pointer flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? "Validating Answers..." : "Submit Final Assessment & Validate"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

