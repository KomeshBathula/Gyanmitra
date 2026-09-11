import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Sparkles,
  Sliders,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const AIQuizGeneratorView = () => {
  const { setCurrentScreen, setActiveQuizType, showToast, t } = useApp();

  const [selectedFile, setSelectedFile] = useState({
    name: "MoSPI_NSS79_Sampling_Methodology_Guidelines.pdf",
    size: "4.8 MB",
    pages: 84,
    uploadedAt: "Today, 11:42 AM"
  });

  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionType, setQuestionType] = useState("MCQ");
  const [includeExplanations, setIncludeExplanations] = useState(true);
  const [includeSourceCitations, setIncludeSourceCitations] = useState(true);
  const [autoValidate, setAutoValidate] = useState(true);

  // Generation Animation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const generationStages = [
    t('generatingStep1'),
    t('generatingStep2'),
    t('generatingStep3'),
    t('generatingStep4')
  ];

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setGenerationStep(0);

    // Trigger REST API call to Express backend
    api.generateAIQuiz({
      documentName: selectedFile.name,
      questionCount,
      difficulty,
      questionType
    });

    const stepInterval = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev < 3) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsGenerating(false);
            showToast("AI Assessment generated successfully from document!", "success");
            setActiveQuizType('ai-generated');
            setCurrentScreen('quiz-taking');
          }, 800);
          return prev;
        }
      });
    }, 900);
  };

  const sampleDocuments = [
    { name: "MoSPI_NSS79_Sampling_Methodology_Guidelines.pdf", size: "4.8 MB", topic: "Survey Sampling" },
    { name: "National_Accounts_Statistics_Sources_Methods_2024.pdf", size: "12.1 MB", topic: "National Accounts" },
    { name: "Python_Official_Statistics_Microdata_Handbook.pdf", size: "3.2 MB", topic: "Python / Data Science" },
    { name: "DPDP_Act_2023_Statistical_Disclosure_Control.docx", size: "1.4 MB", topic: "Data Privacy" }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-gov">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
                AI / RAG Assessment Engine
              </span>
              <span className="text-xs text-slate-400">Grounded Generation</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">{t('aiQuizTitle')}</h2>
            <p className="text-xs text-slate-500">
              {t('aiQuizSub')}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-medium text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>{t('ragSourcesGrounding')}</span>
          </div>
        </div>
      </div>

      {isGenerating ? (
        /* Live Generation Simulation Pipeline */
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-gov text-center space-y-6 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center mx-auto">
            <RefreshCw className="w-8 h-8 text-purple-600 animate-spin" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900">
              Generating Source-Grounded Assessment...
            </h3>
            <p className="text-xs text-purple-800 font-semibold min-h-[20px]">
              {generationStages[generationStep]}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="max-w-md mx-auto space-y-3 text-left pt-4">
            {generationStages.map((stage, sIdx) => (
              <div
                key={sIdx}
                className={`p-3 rounded-lg text-xs flex items-center space-x-3 border transition-all ${
                  generationStep > sIdx
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium'
                    : generationStep === sIdx
                    ? 'bg-purple-50 text-purple-900 border-purple-300 font-bold animate-pulse'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                {generationStep > sIdx ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                    {sIdx + 1}
                  </span>
                )}
                <span>{stage}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Document Upload & Configuration Grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Area (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Drag and drop upload box */}
            <div className="bg-white rounded-xl border-2 border-dashed border-blue-300 p-8 shadow-gov hover:border-blue-500 transition-colors text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto">
                <UploadCloud className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Upload Learning Material or Manual</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Drag and drop files here, or browse from your government workstation
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 bg-slate-100 rounded">PDF</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded">DOCX</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded">PPTX</span>
                <span className="px-2 py-0.5 bg-slate-100 rounded">TXT</span>
                <span className="text-slate-400">• Max file size: 50MB</span>
              </div>

              <div className="pt-2">
                <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold transition-colors shadow-gov">
                  <span>Select Document</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSelectedFile({
                          name: e.target.files[0].name,
                          size: `${(e.target.files[0].size / 1024 / 1024).toFixed(1)} MB`,
                          pages: 42,
                          uploadedAt: "Just now"
                        });
                        showToast(`Uploaded: ${e.target.files[0].name}`, "success");
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Currently Selected Document */}
            {selectedFile && (
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-gov flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Document Parsed & Indexed
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5">{selectedFile.name}</h4>
                    <p className="text-[11px] text-slate-500">
                      Size: {selectedFile.size} • Pages: {selectedFile.pages} • Uploaded: {selectedFile.uploadedAt}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => showToast("Parsing summary: 84 pages indexed into 312 semantic chunks.", "info")}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200"
                >
                  Inspect Chunks
                </button>
              </div>
            )}

            {/* Quick Sample Government Training Materials */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Or Select from Official MoSPI Library:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sampleDocuments.map((doc, dIdx) => (
                  <button
                    key={dIdx}
                    onClick={() => {
                      setSelectedFile({
                        name: doc.name,
                        size: doc.size,
                        pages: 60,
                        uploadedAt: "MoSPI Official Repository"
                      });
                      showToast(`Loaded: ${doc.name}`, "info");
                    }}
                    className={`text-left p-2.5 rounded-lg border text-xs transition-colors flex items-center justify-between ${
                      selectedFile.name === doc.name
                        ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <p className="truncate font-medium">{doc.name}</p>
                      <span className="text-[10px] text-slate-400">{doc.topic} • {doc.size}</span>
                    </div>
                    {selectedFile.name === doc.name && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Configuration Panel (1 Col) */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                <Sliders className="w-4 h-4 text-gov-blue" />
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Assessment Configuration
                </h4>
              </div>

              {/* Question Count */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Number of Questions</label>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 10, 20].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuestionCount(num)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        questionCount === num
                          ? 'bg-blue-600 text-white border-blue-700'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {num} Questions
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Cadre Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-600"
                >
                  <option>Foundational (Level 1-2 • SSS Cadre)</option>
                  <option>Medium (Level 3 • ISS Probationer/AD)</option>
                  <option>Hard (Level 4 • ISS Deputy Director)</option>
                  <option>Adaptive AI Calibration</option>
                </select>
              </div>

              {/* Question Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Question Format</label>
                <div className="grid grid-cols-2 gap-2">
                  {['MCQ', 'True / False', 'Assertion-Reason', 'Case Study'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setQuestionType(t)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        questionType === t
                          ? 'bg-blue-50 text-blue-900 border-blue-400 font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Options */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeExplanations}
                    onChange={(e) => setIncludeExplanations(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span className="text-slate-700">Include Official Rationale</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSourceCitations}
                    onChange={(e) => setIncludeSourceCitations(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span className="text-slate-700">Attach Document Page Citations</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoValidate}
                    onChange={(e) => setAutoValidate(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span className="text-slate-700">Auto-Validate Answer Key with RAG</span>
                </label>
              </div>

              {/* Primary CTA */}
              <div className="pt-3">
                <button
                  onClick={handleStartGeneration}
                  className="w-full py-2.5 bg-gradient-to-r from-gov-blue to-purple-800 hover:from-gov-navy hover:to-purple-900 text-white text-xs font-bold rounded-xl shadow-gov hover:shadow-gov-md transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Assessment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
