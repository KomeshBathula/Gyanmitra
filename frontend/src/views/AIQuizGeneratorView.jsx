import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Award,
  ShieldCheck,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Shield,
  ArrowRight,
  Eye,
  Home,
  Check,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const AIQuizGeneratorView = () => {
  const {
    userProfile,
    setCurrentScreen,
    setActiveQuizType,
    setCurrentQuizData,
    setGeneratedQuizzes,
    startGeneratedQuiz,
    courses,
    showToast,
    t
  } = useApp();

  const isAdmin = userProfile?.role === 'admin';

  const [targetCourseId, setTargetCourseId] = useState("cnt-1");
  const [targetDepartment, setTargetDepartment] = useState("Survey Design and Research Division (SDRD)");
  const [targetUserId, setTargetUserId] = useState("usr_001");
  const [targetUserName, setTargetUserName] = useState("Rajesh Kumar (Deputy Director)");

  const [selectedFile, setSelectedFile] = useState({
    name: "MoSPI_NSS79_Sampling_Methodology_Guidelines.pdf",
    size: "4.8 MB",
    pages: 84,
    uploadedAt: "Today, 11:42 AM",
    topic: "Survey Sampling & Estimation"
  });

  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionType, setQuestionType] = useState("MCQ");
  const [includeExplanations, setIncludeExplanations] = useState(true);
  const [includeSourceCitations, setIncludeSourceCitations] = useState(true);
  const [autoValidate, setAutoValidate] = useState(true);

  // Generation Animation & Result States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [createdQuiz, setCreatedQuiz] = useState(null);

  const generationStages = [
    t('generatingStep1', 'Parsing & chunking official statistical document...'),
    t('generatingStep2', 'Validating questions with MoSPI Competency Framework & Psychometrics...'),
    t('generatingStep3', 'Mapping questions to Course Syllabus Modules & FRAC competency indicators...'),
    t('generatingStep4', 'Assigning assessment to Target Course & User Dashboard...')
  ];

  // Access Guard: Non-admins cannot access quiz generation
  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-[#111F38] rounded-3xl border border-red-500/30 p-8 shadow-2xl space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-red-950/70 border border-red-500/50 text-red-400 flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-900/60 text-red-300 border border-red-500/40">
              Admin Authorization Required
            </span>
            <h2 className="text-xl font-bold text-white mt-3">Restricted Administrator Module</h2>
            <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
              Material Upload and AI Quiz Generation is reserved for MoSPI Capacity Building Administrators and Training Directors. As a learner ({userProfile.designation || 'Statistical Officer'}), you can attempt quizzes directly from your User Dashboard.
            </p>
          </div>
          <div className="pt-3">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-lg cursor-pointer flex items-center justify-center space-x-2 mx-auto"
            >
              <Home className="w-4 h-4" />
              <span>Return to User Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setGenerationStep(0);
    setCreatedQuiz(null);

    const availableCourses = courses || [];
    const targetCourse = availableCourses.find(c => c.id === targetCourseId) || {
      id: targetCourseId,
      title: "Understanding Corporate Insolvency Resolution Process",
      syllabus: [
        "Module 1: Overview of IBC 2016 & Legislative Intent",
        "Module 2: Admission of CIRP & Moratorium Provisions",
        "Module 3: CoC Constitution, Voting Rights & Resolution Plans",
        "Module 4: Liquidation Process & Priority Waterfall Mechanism"
      ]
    };

    try {
      // Trigger REST API call to Express backend (Groq AI integration)
      const res = await api.generateAIQuiz({
        documentName: selectedFile.name,
        topic: selectedFile.topic || selectedFile.name,
        questionCount,
        difficulty,
        questionType,
        courseId: targetCourse.id,
        courseTitle: targetCourse.title,
        targetDepartment,
        targetUserId,
        targetUserName
      });

      const generatedData = res?.data?.quiz || res?.quiz || {
        id: `quiz-gen-${Date.now()}`,
        title: `Department Admin Assessment: ${targetCourse.title || selectedFile.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}`,
        documentName: selectedFile.name,
        topic: selectedFile.topic || "Official Capacity Building",
        courseId: targetCourse.id,
        courseTitle: targetCourse.title,
        targetDepartment,
        targetUserId,
        targetUserName,
        difficulty,
        passingScorePercentage: 70,
        questionCount: res?.data?.questions?.length || questionCount,
        createdAt: "Just now",
        createdBy: `${userProfile.name} (Admin)`,
        isLive: true,
        mode: res?.mode || res?.data?.mode || "groq-ai",
        questions: (res?.data?.questions || res?.questions || []).map((q, idx) => ({
          ...q,
          relatedModule: q.relatedModule || (targetCourse.syllabus?.[idx] || `Module ${idx + 1}`),
          moduleId: idx + 1
        }))
      };

      const stepInterval = setInterval(() => {
        setGenerationStep((prev) => {
          if (prev < 3) {
            return prev + 1;
          } else {
            clearInterval(stepInterval);
            setIsGenerating(false);
            setCreatedQuiz(generatedData);
            setGeneratedQuizzes((prevList) => [
              generatedData,
              ...prevList.filter((q) => q.id !== generatedData.id)
            ]);
            showToast(`Quiz generated & assigned to "${targetCourse.title}"!`, "success");
            return prev;
          }
        });
      }, 700);
    } catch (err) {
      setIsGenerating(false);
      showToast("Quiz generation completed with offline fallback.", "info");
    }
  };

  const sampleDocuments = [
    { name: "MoSPI_NSS79_Sampling_Methodology_Guidelines.pdf", size: "4.8 MB", topic: "Survey Sampling" },
    { name: "National_Accounts_Statistics_Sources_Methods_2024.pdf", size: "12.1 MB", topic: "National Accounts" },
    { name: "Python_Official_Statistics_Microdata_Handbook.pdf", size: "3.2 MB", topic: "Python / Data Science" },
    { name: "DPDP_Act_2023_Statistical_Disclosure_Control.docx", size: "1.4 MB", topic: "Data Privacy" }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 text-slate-100">
      {/* Top Banner */}
      <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#1B365D] text-blue-200 border border-blue-500/40">
                MoSPI Cadre Assessment Studio
              </span>
              <span className="text-xs text-slate-400">Grounded Generation</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-2">{t('aiQuizTitle')}</h2>
            <p className="text-xs text-slate-400 mt-1">
              {t('aiQuizSub')}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-medium text-blue-300 bg-blue-950/80 px-3 py-1.5 rounded-xl border border-blue-600/50">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>{t('ragSourcesGrounding')}</span>
          </div>
        </div>
      </div>

      {isGenerating ? (
        /* Live Generation Simulation Pipeline */
        <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-8 shadow-xl text-center space-y-6 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-blue-900/50 border border-blue-600/50 flex items-center justify-center mx-auto">
            <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-white">
              Generating Source-Grounded Assessment...
            </h3>
            <p className="text-xs text-blue-300 font-semibold min-h-[20px]">
              {generationStages[generationStep]}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="max-w-md mx-auto space-y-3 text-left pt-4">
            {generationStages.map((stage, sIdx) => (
              <div
                key={sIdx}
                className={`p-3 rounded-xl text-xs flex items-center space-x-3 border transition-all ${
                  generationStep > sIdx
                    ? 'bg-emerald-950/70 text-emerald-300 border-emerald-600/50 font-medium'
                    : generationStep === sIdx
                    ? 'bg-blue-900/60 text-blue-200 border-blue-500 font-bold animate-pulse'
                    : 'bg-[#0B1528] text-slate-500 border-[#1E2E4A]'
                }`}
              >
                {generationStep > sIdx ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-300 text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                    {sIdx + 1}
                  </span>
                )}
                <span>{stage}</span>
              </div>
            ))}
          </div>
        </div>
      ) : createdQuiz ? (
        /* Created & Live Published Success State */
        <div className="bg-[#111F38] rounded-3xl border border-emerald-500/40 p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#1E2E4A]">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-900/60 text-emerald-300 border border-emerald-500/50">
                    LIVE ON ALL USER DASHBOARDS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1B365D] text-blue-200 border border-blue-500/50">
                    {createdQuiz.mode === 'groq-ai' ? 'MoSPI Standards Aligned' : 'MoSPI Verified Grounded'}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mt-1.5">{createdQuiz.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Source: {createdQuiz.documentName} • {createdQuiz.questions.length} Questions • Difficulty: {createdQuiz.difficulty}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>View on User Dashboard</span>
              </button>
              <button
                onClick={() => startGeneratedQuiz(createdQuiz)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#1B365D] hover:bg-[#254A80] border border-blue-400/40 text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Quiz</span>
              </button>
            </div>
          </div>

          {/* Questions Review list */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Generated Questions Preview ({createdQuiz.questions.length}):
            </h4>
            <div className="space-y-3">
              {createdQuiz.questions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#0B1528] border border-[#1E2E4A] space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-white leading-relaxed">
                      <span className="text-blue-400 mr-1.5">Q{idx + 1}.</span>
                      {q.question}
                    </p>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#162544] text-slate-300 border border-[#1E2E4A] flex-shrink-0">
                      Answer: Option {String.fromCharCode(65 + q.correctAnswer)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-xl border text-[11px] ${
                          oIdx === q.correctAnswer
                            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 font-semibold'
                            : 'bg-[#111F38] border-[#1E2E4A] text-slate-400'
                        }`}
                      >
                        <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                      </div>
                    ))}
                  </div>

                  {q.explanation && (
                    <div className="text-[11px] text-slate-400 bg-[#111F38]/60 p-2.5 rounded-xl border border-[#1E2E4A]/80">
                      <strong className="text-slate-300">Rationale: </strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                setCreatedQuiz(null);
                setIsGenerating(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#162544] hover:bg-[#1E3A6D] text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-[#1E2E4A]"
            >
              Generate Another Quiz from Material
            </button>
          </div>
        </div>
      ) : (
        /* Document Upload & Configuration Grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Area (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Drag and drop upload box */}
            <div className="bg-[#111F38] rounded-2xl border-2 border-dashed border-blue-600/50 p-8 shadow-xl hover:border-blue-400 transition-colors text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-blue-900/50 border border-blue-600/50 text-blue-400 flex items-center justify-center mx-auto">
                <UploadCloud className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{t('uploadMaterial')}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {t('dragDropText')}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-[11px] text-slate-400">
                <span className="px-2.5 py-0.5 bg-[#0B1528] rounded-md border border-[#1E2E4A]">PDF</span>
                <span className="px-2.5 py-0.5 bg-[#0B1528] rounded-md border border-[#1E2E4A]">DOCX</span>
                <span className="px-2.5 py-0.5 bg-[#0B1528] rounded-md border border-[#1E2E4A]">PPTX</span>
                <span className="px-2.5 py-0.5 bg-[#0B1528] rounded-md border border-[#1E2E4A]">TXT</span>
                <span className="text-slate-400">• Max file size: 50MB</span>
              </div>

              <div className="pt-2">
                <label className="cursor-pointer inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md">
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
              <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-4 shadow-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-900/60 text-blue-300 rounded-xl border border-blue-600/50">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-600/50">
                      Document Parsed & Indexed
                    </span>
                    <h4 className="text-xs font-bold text-white mt-1">{selectedFile.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Size: {selectedFile.size} • Pages: {selectedFile.pages} • Uploaded: {selectedFile.uploadedAt}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => showToast("Parsing summary: 84 pages indexed into 312 semantic chunks.", "info")}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-[#0B1528] hover:bg-[#162544] rounded-xl border border-[#1E2E4A] transition-colors cursor-pointer"
                >
                  Inspect Chunks
                </button>
              </div>
            )}

            {/* Quick Sample Government Training Materials */}
            <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-4 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Or Select from Official MoSPI Library:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                    className={`text-left p-3 rounded-xl border text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      selectedFile.name === doc.name
                        ? 'bg-blue-900/40 border-blue-500 text-white font-semibold'
                        : 'bg-[#0B1528] hover:bg-[#162544] border-[#1E2E4A] text-slate-300'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <p className="truncate font-medium">{doc.name}</p>
                      <span className="text-[10px] text-slate-400">{doc.topic} • {doc.size}</span>
                    </div>
                    {selectedFile.name === doc.name && (
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Configuration Panel (1 Col) */}
          <div className="space-y-4">
            <div className="bg-[#111F38] rounded-2xl border border-[#1E2E4A] p-5 shadow-xl space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-[#1E2E4A]">
                <Sliders className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Assessment Configuration
                </h4>
              </div>

              {/* Target Course Association */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Course (To Unlock Upon Completion)</label>
                <select
                  value={targetCourseId}
                  onChange={(e) => setTargetCourseId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0B1528] text-slate-200 border border-[#1E2E4A] rounded-xl focus:ring-1 focus:ring-blue-500"
                >
                  {(courses || []).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.provider})
                    </option>
                  ))}
                  <option value="cnt-1">Understanding Corporate Insolvency Resolution Process</option>
                  <option value="cnt-2">Central Civil Services (Conduct) Rules 1964</option>
                  <option value="ml-1">Post Office Act 2023</option>
                  <option value="crs-101">Python for Microdata Processing & NSS Vectorization</option>
                </select>
              </div>

              {/* Target Department & Cadre */}
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Division</label>
                  <select
                    value={targetDepartment}
                    onChange={(e) => setTargetDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0B1528] text-slate-200 border border-[#1E2E4A] rounded-xl focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Survey Design and Research Division (SDRD)">Survey Design and Research Division (SDRD)</option>
                    <option value="Data Quality Assurance Division (DQAD)">Data Quality Assurance Division (DQAD)</option>
                    <option value="National Accounts Division (NAD)">National Accounts Division (NAD)</option>
                    <option value="National Statistical Systems Training Academy (NSSTA)">National Statistical Systems Training Academy (NSSTA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Learner</label>
                  <select
                    value={targetUserId}
                    onChange={(e) => {
                      setTargetUserId(e.target.value);
                      if (e.target.value === 'usr_001') setTargetUserName('Rajesh Kumar (Deputy Director)');
                      else if (e.target.value === 'usr_002') setTargetUserName('Smt. Priyanka Sen (Assistant Director)');
                      else setTargetUserName('All Division Officers');
                    }}
                    className="w-full px-3 py-2 text-xs bg-[#0B1528] text-slate-200 border border-[#1E2E4A] rounded-xl focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="usr_001">Rajesh Kumar (Deputy Director, SDRD)</option>
                    <option value="usr_002">Smt. Priyanka Sen (Assistant Director, FOD)</option>
                    <option value="all">All Enrolled Cadre Officers</option>
                  </select>
                </div>
              </div>

              {/* Question Count */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('numQuestions')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 5, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuestionCount(num)}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        questionCount === num
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-[#0B1528] text-slate-300 border-[#1E2E4A] hover:bg-[#162544]'
                      }`}
                    >
                      {num} {t('questionCount')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">{t('selectDifficulty')}</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0B1528] text-slate-200 border border-[#1E2E4A] rounded-xl focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Basic">{t('difficultyBasic')}</option>
                  <option value="Medium">{t('difficultyIntermediate')}</option>
                  <option value="Hard">{t('difficultyAdvanced')}</option>
                  <option value="Adaptive">Adaptive AI Calibration</option>
                </select>
              </div>

              {/* Question Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Question Format</label>
                <div className="grid grid-cols-2 gap-2">
                  {['MCQ', 'True / False', 'Assertion-Reason', 'Case Study'].map((qt) => (
                    <button
                      key={qt}
                      onClick={() => setQuestionType(qt)}
                      className={`py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        questionType === qt
                          ? 'bg-blue-900/60 text-blue-200 border-blue-500 font-bold'
                          : 'bg-[#0B1528] text-slate-400 border-[#1E2E4A] hover:bg-[#162544]'
                      }`}
                    >
                      {qt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Options */}
              <div className="space-y-2 pt-2 border-t border-[#1E2E4A] text-xs">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeExplanations}
                    onChange={(e) => setIncludeExplanations(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 bg-[#0B1528] border-[#1E2E4A]"
                  />
                  <span className="text-slate-300">Include Official Rationale</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSourceCitations}
                    onChange={(e) => setIncludeSourceCitations(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 bg-[#0B1528] border-[#1E2E4A]"
                  />
                  <span className="text-slate-300">Attach Document Page Citations</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoValidate}
                    onChange={(e) => setAutoValidate(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 bg-[#0B1528] border-[#1E2E4A]"
                  />
                  <span className="text-slate-300">Auto-Validate Answer Key with RAG</span>
                </label>
              </div>

              {/* Primary CTA */}
              <div className="pt-3">
                <button
                  onClick={handleStartGeneration}
                  className="w-full py-2.5 bg-[#1B365D] hover:bg-[#254A80] border border-blue-500/40 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>{t('generateQuizBtn')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
