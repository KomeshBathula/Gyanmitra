import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuizTakingView = () => {
  const {
    currentQuizData,
    setCurrentScreen,
    setLastQuizResult,
    updateCompetencyAfterQuiz,
    showToast
  } = useApp();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showInstantExplanation, setShowInstantExplanation] = useState(false);

  const defaultQuiz = {
    title: "AI Generated Assessment: NSS 79th Round Sampling & Estimation Protocol",
    documentSource: "MoSPI_NSS79_Sampling_Methodology_Guidelines.pdf",
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
        sourceCitation: "Page 18, Para 2.4.1 (Sampling Methodology Manual)"
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
        explanation: "Section 5.3 (Estimation Procedure, page 42) explicitly mandates: Multiplier_adj = Multiplier_base * (Allocated_SSUs / Surveyed_SSUs).",
        sourceCitation: "Page 42, Formula 5.3 (Estimation & Multipliers)"
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
        sourceCitation: "Annexure C, Page 67 (CAPI Quality Assurance)"
      }
    ]
  };

  const quiz = currentQuizData && currentQuizData.questions && currentQuizData.questions.length > 0
    ? {
        title: currentQuizData.title || "AI Generated Assessment",
        documentSource: currentQuizData.documentName || currentQuizData.topic || "MoSPI Guidelines",
        questions: currentQuizData.questions
      }
    : defaultQuiz;

  const totalQ = quiz.questions.length;
  const currentQ = quiz.questions[currentIdx];

  const handleSelectOption = (oIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: oIdx
    }));
    setShowInstantExplanation(true);
  };

  const handleCompleteQuiz = () => {
    let correct = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / totalQ) * 100);
    const resultObj = {
      scorePercentage: scorePct,
      correctCount: correct,
      totalCount: totalQ,
      competencyImpacted: "Survey Sampling & Multi-Stage Design",
      evaluatedAt: new Date().toLocaleTimeString(),
      documentTitle: quiz.documentSource,
      questions: quiz.questions,
      selectedAnswers
    };

    setLastQuizResult(resultObj);
    updateCompetencyAfterQuiz(resultObj);
    setCurrentScreen('quiz-results');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 text-slate-100">
      {/* Header Banner */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-900/60 text-purple-300 border border-purple-600/50 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>AI Grounded Assessment</span>
            </span>
            <span className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
              Source: {quiz.documentSource}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white mt-1.5">{quiz.title}</h2>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-auto">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-[#0B1528] hover:bg-[#162544] border border-[#1E2E4A] transition-colors cursor-pointer flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <span className="text-xs font-bold text-blue-400 bg-blue-950/80 px-3 py-1.5 rounded-xl border border-blue-600/50">
            Q {currentIdx + 1} of {totalQ}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[#111F38] rounded-3xl border border-[#1E2E4A] p-6 sm:p-8 shadow-xl space-y-5">
        <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
          <span className="text-blue-400 mr-2">Q{currentIdx + 1}.</span>
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
                className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start space-x-3 cursor-pointer ${
                  isSelected
                    ? isCorrect
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 font-semibold ring-2 ring-emerald-500/30'
                      : 'bg-rose-950/80 border-rose-500 text-rose-100 font-semibold ring-2 ring-rose-500/30'
                    : 'bg-[#0B1528] hover:bg-[#162544] border-[#1E2E4A] text-slate-200'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    isSelected
                      ? isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
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

        {/* Source Citation & Explanation Box */}
        {showInstantExplanation && selectedAnswers[currentQ.id] !== undefined && (
          <div className="mt-4 p-4 rounded-2xl bg-[#0B1528] border border-blue-900/60 text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center space-x-2 font-bold text-blue-300">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>MoSPI Source Grounding & Official Rationale:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            {currentQ.sourceCitation && (
              <div className="text-blue-400 text-[11px] font-mono pt-1">
                📍 Citation: <strong>{currentQ.sourceCitation}</strong>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-5 border-t border-[#1E2E4A] flex items-center justify-between">
          <button
            disabled={currentIdx === 0}
            onClick={() => {
              setCurrentIdx(currentIdx - 1);
              setShowInstantExplanation(true);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-[#162544] hover:bg-[#1E3A6D] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer border border-[#1E2E4A]"
          >
            Previous Question
          </button>

          {currentIdx < totalQ - 1 ? (
            <button
              onClick={() => {
                setCurrentIdx(currentIdx + 1);
                setShowInstantExplanation(selectedAnswers[quiz.questions[currentIdx + 1]?.id] !== undefined);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center space-x-1.5 shadow-lg transition-all cursor-pointer"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCompleteQuiz}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-xl transition-all cursor-pointer"
            >
              Complete Quiz & Update Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

