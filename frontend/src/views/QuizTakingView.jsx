import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuizTakingView = () => {
  const { setCurrentScreen, setLastQuizResult, updateCompetencyAfterQuiz } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showInstantExplanation, setShowInstantExplanation] = useState(false);

  const quiz = {
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
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
              AI Grounded Assessment
            </span>
            <span className="text-xs text-slate-500">Source: {quiz.documentSource}</span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-1">{quiz.title}</h2>
        </div>

        <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          Question {currentIdx + 1} of {totalQ}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov space-y-4">
        <h3 className="text-sm font-bold text-slate-900 leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-2.5 pt-2">
          {currentQ.options.map((opt, oIdx) => {
            const isSelected = selectedAnswers[currentQ.id] === oIdx;
            const isCorrect = oIdx === currentQ.correctAnswer;
            const letter = String.fromCharCode(65 + oIdx);

            return (
              <button
                key={oIdx}
                onClick={() => handleSelectOption(oIdx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-start space-x-3 ${
                  isSelected
                    ? isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-500/20'
                      : 'bg-rose-50 border-rose-500 text-rose-900 font-semibold ring-2 ring-rose-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5 ${
                    isSelected
                      ? isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-600'
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
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center space-x-2 font-bold text-blue-900">
              <BookOpen className="w-4 h-4 text-blue-700" />
              <span>Source Grounding & Rationale:</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{currentQ.explanation}</p>
            <div className="text-blue-800 text-[11px] font-mono pt-1">
              📍 Citation: <strong>{currentQ.sourceCitation}</strong>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            disabled={currentIdx === 0}
            onClick={() => {
              setCurrentIdx(currentIdx - 1);
              setShowInstantExplanation(true);
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
          >
            Previous Question
          </button>

          {currentIdx < totalQ - 1 ? (
            <button
              onClick={() => {
                setCurrentIdx(currentIdx + 1);
                setShowInstantExplanation(selectedAnswers[quiz.questions[currentIdx + 1].id] !== undefined);
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-gov-blue hover:bg-gov-navy flex items-center space-x-1"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleCompleteQuiz}
              className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-gov"
            >
              Complete Quiz & Update Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
