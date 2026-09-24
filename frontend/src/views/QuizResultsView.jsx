import React from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  BookOpen,
  Award,
  Building2,
  Shield,
  Layers,
  ChevronRight,
  Play,
  RotateCcw,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuizResultsView = () => {
  const {
    lastQuizResult,
    setCurrentScreen,
    openCourseModule,
    showToast,
    userProfile
  } = useApp();

  const score = lastQuizResult?.scorePercentage ?? 80;
  const correctCount = lastQuizResult?.correctCount ?? 4;
  const totalCount = lastQuizResult?.totalCount ?? 5;
  const isPassed = score >= 70;
  const courseTitle = lastQuizResult?.courseTitle || lastQuizResult?.quizTitle || "Course Curriculum";
  const courseId = lastQuizResult?.courseId || "cnt-1";
  const department = lastQuizResult?.department || userProfile?.department || "Survey Design and Research Division (SDRD)";
  const createdBy = lastQuizResult?.createdBy || "Dr. Arvind Mehta (ADG, SDRD)";
  const targetUserName = lastQuizResult?.targetUserName || userProfile?.name || "Rajesh Kumar";

  // Recommended Modules from validated answers
  const recommendedModules = lastQuizResult?.recommendedModules && lastQuizResult.recommendedModules.length > 0
    ? lastQuizResult.recommendedModules
    : [
        {
          moduleName: "Module 2: Handling complex survey weights & stratified multipliers",
          moduleId: 2,
          courseId: courseId,
          courseTitle: courseTitle,
          reason: "Targeted revision to solidify multiplier calculations and casualty handling protocols."
        },
        {
          moduleName: "Module 3: Automated consistency checks & outlier detection rules",
          moduleId: 3,
          courseId: courseId,
          courseTitle: courseTitle,
          reason: "Recommended practice for CAPI electronic validation workflows."
        }
      ];

  const isPostalFallback = (lastQuizResult?.department || userProfile?.department || "").toLowerCase().includes("post") ||
                           (lastQuizResult?.courseTitle || "").toLowerCase().includes("post") ||
                           (lastQuizResult?.courseTitle || "").toLowerCase().includes("posb") ||
                           (userProfile?.cadre || "").toLowerCase().includes("post");

  // Recommended Follow-up Courses
  const recommendedCourses = lastQuizResult?.recommendedCourses && lastQuizResult.recommendedCourses.length > 0
    ? lastQuizResult.recommendedCourses
    : isPostalFallback ? [
        {
          id: "crs-102",
          title: "Dak Ghar Niryat Kendra (DNK) & Commercial Parcel Logistics",
          provider: "Department of Posts",
          difficulty: "Level 3 (Proficient)",
          duration: "18 Hours",
          matchScore: isPassed ? 98 : 92,
          recommendationReason: isPassed
            ? "Next-level advanced progression track for hub postal export processing and commercial parcel logistics."
            : "Core curriculum to bridge identified competency gap in barcoded parcel tracking and DNK portal operations."
        },
        {
          id: "crs-103",
          title: "Customer Relationship Management & CPGRAMS in India Post",
          provider: "Department of Posts",
          difficulty: "Level 3 (Proficient)",
          duration: "10 Hours",
          matchScore: 94,
          recommendationReason: "Recommended follow-up module for time-bound public grievance redressal and citizen charter compliance."
        }
      ] : [
        {
          id: "crs-201",
          title: "Public Administration Governance & Citizen Service Delivery",
          provider: "LBSNAA Mussoorie",
          difficulty: "Level 3 (Proficient)",
          duration: "15 Hours",
          matchScore: isPassed ? 98 : 92,
          recommendationReason: isPassed
            ? "Advanced administrative competency track for executive governance."
            : "Core curriculum to strengthen regulatory compliance and service delivery."
        },
        {
          id: "crs-202",
          title: "Central Civil Services Financial Rules & Public Procurement (GeM)",
          provider: "National Institute of Financial Management",
          difficulty: "Level 3-4 (Advanced)",
          duration: "20 Hours",
          matchScore: 94,
          recommendationReason: "Recommended follow-up module for statutory procurement and financial compliance."
        }
      ];

  const reviewList = lastQuizResult?.reviewList || (lastQuizResult?.questions || []).map((q, idx) => {
    const selected = lastQuizResult?.selectedAnswers ? lastQuizResult.selectedAnswers[q.id] : q.correctAnswer;
    return {
      id: q.id,
      question: q.question,
      options: q.options,
      selectedAnswer: selected,
      correctAnswer: q.correctAnswer,
      isCorrect: selected === q.correctAnswer,
      explanation: q.explanation,
      sourceCitation: q.sourceCitation,
      relatedModule: q.relatedModule || `Module ${idx + 1}`
    };
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 text-slate-100 select-none">
      {/* 1. Main Score & Department Certification Banner */}
      <div className="bg-[#0B1528] rounded-3xl border border-[#1E2E4A] p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isPassed ? 'bg-emerald-500' : 'bg-amber-500'
        }`} />

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5">
            {/* Seal Icon */}
            <div className={`w-20 h-20 rounded-3xl border flex items-center justify-center flex-shrink-0 shadow-2xl ${
              isPassed
                ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-400'
                : 'bg-amber-950/80 border-amber-500/80 text-amber-400'
            }`}>
              {isPassed ? <Award className="w-10 h-10" /> : <BookOpen className="w-10 h-10" />}
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black border flex items-center space-x-1 ${
                  isPassed
                    ? 'bg-emerald-900/80 text-emerald-300 border-emerald-500/50'
                    : 'bg-amber-900/80 text-amber-300 border-amber-500/50'
                }`}>
                  {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                  <span>{isPassed ? "Assessment Passed • Competency Certified" : "Assessment Completed • Remedial Action Suggested"}</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {lastQuizResult?.evaluatedAt || "Today"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
                Score: {score}% ({correctCount} / {totalCount} Correct)
              </h2>

              <p className="text-xs text-slate-300 mt-1.5 flex items-center justify-center sm:justify-start space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <span>
                  Course: <strong>{courseTitle}</strong> • Verified by {createdBy} for <strong>{targetUserName}</strong>
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end space-y-2 flex-shrink-0">
            <span className="px-3 py-1 rounded-xl bg-[#111F38] border border-[#1E2E4A] text-xs font-bold text-slate-300">
              Department: {department}
            </span>
            <span className="text-[11px] text-emerald-400 font-bold">
              ✓ Synced with Official Ledger
            </span>
          </div>
        </div>

        {/* Closed-Loop Competency Metric Card */}
        <div className="p-4 rounded-2xl bg-[#111F38] border border-blue-900/50 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-blue-300">
            <span className="flex items-center space-x-1.5 uppercase tracking-wider text-[10px]">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Closed-Loop Competency Ledger Update</span>
            </span>
            <span className="text-emerald-400">+120 Karmayogi Credits</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="bg-[#080E1C] p-3 rounded-xl border border-[#1E2E4A]">
              <span className="text-slate-400 block text-[11px]">Assessed Subject Competency</span>
              <span className="font-black text-emerald-400 text-sm">
                Level 2 → Level {isPassed ? 3 : 2} ({isPassed ? '+1 Level Advancement' : 'Fortified Base'})
              </span>
            </div>
            <div className="bg-[#080E1C] p-3 rounded-xl border border-[#1E2E4A]">
              <span className="text-slate-400 block text-[11px]">SDRD Division Cadre Readiness</span>
              <span className="font-black text-emerald-400 text-sm">
                71.4% → 76.8% (+5.4% Index)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TARGETED SPECIFIC MODULE RECOMMENDATIONS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                Recommended Specific Modules for Immediate Review
              </h3>
              <p className="text-xs text-slate-400">
                Tailored based on your answers to reinforce key concepts
              </p>
            </div>
          </div>
          <span className="text-xs text-amber-400 font-bold hidden sm:inline">
            {recommendedModules.length} Module{recommendedModules.length === 1 ? '' : 's'} Recommended
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {recommendedModules.map((mod, idx) => (
            <div
              key={idx}
              className="bg-[#0B1528] rounded-2xl border border-amber-500/30 hover:border-amber-500/70 p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all group"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-amber-950/80 text-amber-300 border border-amber-600/50 flex items-center space-x-1">
                    <BookOpen className="w-3 h-3 text-amber-400" />
                    <span>Targeted Curriculum Module</span>
                  </span>
                  <span className="text-xs text-slate-400 truncate max-w-xs">
                    Course: {mod.courseTitle || courseTitle}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                  {mod.moduleName}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {mod.reason}
                </p>
              </div>

              <button
                onClick={() => {
                  showToast(`Opening ${mod.moduleName} in My Learning syllabus`, "info");
                  openCourseModule(mod.courseId || courseId, mod.moduleId || idx + 1);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 cursor-pointer self-end sm:self-auto flex-shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-amber-300" />
                <span>Launch Module</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. RECOMMENDED FOLLOW-UP COURSES */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                Recommended Next-Step Courses
              </h3>
              <p className="text-xs text-slate-400">
                Advanced and bridging programs matching your updated competency matrix
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendedCourses.map((c, idx) => (
            <div
              key={idx}
              className="bg-[#0B1528] rounded-2xl border border-[#1E2E4A] hover:border-blue-500 p-5 shadow-lg flex flex-col justify-between space-y-4 group transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-900/60 text-blue-300 border border-blue-500/40">
                    {c.difficulty || "Intermediate"}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {c.matchScore || 95}% Match
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                  {c.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {c.recommendationReason}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1E2E4A] flex items-center justify-between">
                <span className="text-[11px] text-slate-400">By {c.provider}</span>
                <button
                  onClick={() => {
                    showToast(`Added ${c.title} to your official learning pathway.`, "success");
                    setCurrentScreen('learning-path');
                  }}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center space-x-1 cursor-pointer transition-all"
                >
                  <span>Enroll Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. QUESTION-BY-QUESTION VALIDATION BREAKDOWN */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-[#111F38] border border-[#1E2E4A] text-slate-300 flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4 text-slate-300" />
          </div>
          <div>
            <h3 className="text-base font-black text-white">
              Detailed Assessment Question Validation
            </h3>
            <p className="text-xs text-slate-400">
              Review your answers, correct options, and grounded ministry citations
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {reviewList.map((item, idx) => {
            const letterSelected = item.selectedAnswer !== undefined ? String.fromCharCode(65 + item.selectedAnswer) : "None";
            const letterCorrect = String.fromCharCode(65 + item.correctAnswer);

            return (
              <div
                key={idx}
                className={`bg-[#0B1528] rounded-2xl border p-5 sm:p-6 space-y-3 transition-all ${
                  item.isCorrect
                    ? 'border-emerald-800/60 shadow-emerald-950/20 shadow-md'
                    : 'border-rose-800/60 shadow-rose-950/20 shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      item.isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    }`}>
                      {item.isCorrect ? '✓' : '✕'}
                    </span>
                    <span className="text-xs font-black text-slate-300">
                      Question {idx + 1}
                    </span>
                    {item.relatedModule && (
                      <span className="text-[11px] text-amber-400 font-semibold truncate max-w-xs">
                        ({item.relatedModule})
                      </span>
                    )}
                  </div>

                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    item.isCorrect
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                      : 'bg-rose-950 text-rose-300 border border-rose-600/40'
                  }`}>
                    {item.isCorrect ? 'Correct (+10 pts)' : 'Incorrect (0 pts)'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white leading-relaxed">
                  {item.question}
                </h4>

                {/* Answers Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className={`p-3 rounded-xl border ${
                    item.isCorrect
                      ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-700/50 text-rose-200'
                  }`}>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Your Selection:</span>
                    <p className="font-semibold mt-0.5">
                      {letterSelected}. {item.options?.[item.selectedAnswer] || "No Answer Selected"}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border bg-[#111F38] border-blue-900/60 text-blue-200">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Official Correct Answer:</span>
                    <p className="font-semibold mt-0.5">
                      {letterCorrect}. {item.options?.[item.correctAnswer]}
                    </p>
                  </div>
                </div>

                {/* Grounded Citation */}
                <div className="p-3.5 rounded-xl bg-[#111F38] border border-[#1E2E4A] text-xs space-y-1">
                  <div className="flex items-center space-x-1.5 text-blue-300 font-bold text-[11px]">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span>Official Rationale & Statutory Citation:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{item.explanation}</p>
                  {item.sourceCitation && (
                    <p className="text-blue-400 font-mono text-[10px] pt-0.5">
                      Citation: {item.sourceCitation}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Global Action Bar */}
      <div className="pt-6 border-t border-[#1E2E4A] flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="px-5 py-2.5 rounded-2xl bg-[#111F38] hover:bg-[#162544] text-slate-300 hover:text-white border border-[#1E2E4A] text-xs font-bold transition-all cursor-pointer"
        >
          Return to User Dashboard
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentScreen('learning-path')}
            className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-xl transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <span>Go to My Learning & Modules</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
