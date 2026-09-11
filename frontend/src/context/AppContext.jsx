import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  USER_PRESETS,
  INITIAL_USER,
  COMPETENCY_OVERVIEW,
  INITIAL_SKILL_GAPS,
  LEARNING_PATHWAY,
  COURSES_CATALOG,
  ASSESSMENT_QUESTIONS,
  MOCK_GENERATED_QUIZ,
  NOTIFICATIONS_LIST,
  REPORTS_CATALOG,
  TRAINER_BATCH_DATA,
  ADMIN_ORG_DATA,
  AI_ASSISTANT_PROMPTS,
  ADMIN_DEPARTMENTS_CONFIG,
  ADMIN_LEARNERS_DIRECTORY,
  ADMIN_ASSESSMENTS_AUDIT_DATA
} from '../data/mockData';
import { translations } from '../utils/translations';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Multilingual State (English, Hindi, Telugu)
  const [language, setLanguageState] = useState('en'); // 'en' | 'hi' | 'te'

  const setLanguage = (lang) => {
    setLanguageState(lang);
    const langNames = { en: 'English', hi: 'हिन्दी (Hindi)', te: 'తెలుగు (Telugu)' };
    showToast(`Language switched to ${langNames[lang] || lang}`, "info");
  };

  const t = useCallback((key, fallback) => {
    return translations[language]?.[key] || translations['en']?.[key] || fallback || key;
  }, [language]);

  // Authentication & Role State (Persisted across tab reloads)
  const savedAuthVal = typeof window !== 'undefined' ? localStorage.getItem('gyanmitra_authenticated') : null;
  const savedAuth = savedAuthVal !== 'false';
  const savedProfileStr = typeof window !== 'undefined' ? localStorage.getItem('gyanmitra_profile') : null;
  let initialProfile = INITIAL_USER;
  try {
    if (savedProfileStr) initialProfile = JSON.parse(savedProfileStr);
  } catch (e) {
    initialProfile = INITIAL_USER;
  }
  const initialRole = initialProfile?.role || 'employee';

  const [isAuthenticated, setIsAuthenticated] = useState(savedAuth);
  const [currentRole, setCurrentRole] = useState(initialRole);
  const [currentScreen, setCurrentScreenState] = useState(savedAuth ? 'dashboard' : 'login'); // screen identifier
  const [userProfile, setUserProfile] = useState(initialProfile);
  const [isAdminPortalMode, setIsAdminPortalMode] = useState(false);
  const [adminDepartment, setAdminDepartment] = useState('civil'); // 'civil' | 'municipal' | 'statistical' | 'revenue'
  const [adminLearners, setAdminLearners] = useState(ADMIN_LEARNERS_DIRECTORY);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // Competency & Pathway State (Closed-Loop)
  const [competencyOverview, setCompetencyOverview] = useState(COMPETENCY_OVERVIEW);
  const [skillGaps, setSkillGaps] = useState(INITIAL_SKILL_GAPS);
  const [learningPathway, setLearningPathway] = useState(LEARNING_PATHWAY);
  const [learningPathFilter, setLearningPathFilter] = useState(null);
  const [courses, setCourses] = useState(COURSES_CATALOG);

  // Assessment & Quiz Engine State
  const [activeQuizType, setActiveQuizType] = useState('standard');
  const [currentQuizData, setCurrentQuizData] = useState(null);
  const [lastQuizResult, setLastQuizResult] = useState(null);
  const [generatedQuizzes, setGeneratedQuizzes] = useState([MOCK_GENERATED_QUIZ]);
  const [showInitialAssessmentModal, setShowInitialAssessmentModal] = useState(false);
  const [hasCompletedInitialAssessment, setHasCompletedInitialAssessment] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState(NOTIFICATIONS_LIST);

  // AI Assistant Drawer & Chat State
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const [aiChatMessages, setAiChatMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Namaste! I am GyanMitra, your AI Learning Assistant for the Official Statistical System. I can analyze competency gaps, explain statistical methodologies, or recommend tailored NSSTA and iGOT Karmayogi modules. How can I assist your capacity building today?",
      time: "Just now",
      suggestions: [
        "What are my highest priority skill gaps for my ISS role?",
        "Why is 'Python for Microdata' recommended on my path?",
        "Explain Multi-Stage Stratified Sampling in simple terms."
      ]
    }
  ]);

  // Toast / Feedback State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Accessibility Font Scale (150% Default)
  const [fontScale, setFontScale] = useState(150);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
  }, [fontScale]);

  // Dark & Light Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('gyanmitra_theme') || 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('gyanmitra_theme', nextTheme);
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Theme`, 'info');
      return nextTheme;
    });
  };

  // URL & API Synchronization on Screen Navigation (Clean URLs: /login, /admin, /dashboard, etc.)
  const triggerApiSync = useCallback((screenId) => {
    setIsLoadingApi(true);

    if (screenId === 'competencies' || screenId === 'dashboard') {
      api.getCompetenciesOverview(COMPETENCY_OVERVIEW).then(res => {
        if (res?.overview) {
          setCompetencyOverview(res.overview);
        } else if (res?.data && !Array.isArray(res.data) && res.data.categories) {
          setCompetencyOverview(res.data);
        }
      }).catch(console.error);

      api.getGeneratedQuizzes([MOCK_GENERATED_QUIZ]).then(res => {
        if (res?.data && Array.isArray(res.data)) setGeneratedQuizzes(res.data);
        setIsLoadingApi(false);
      }).catch(() => setIsLoadingApi(false));
    } else if (screenId === 'skill-gaps') {
      api.getSkillGaps(INITIAL_SKILL_GAPS).then(res => {
        const rawPayload = Array.isArray(res?.data?.gaps)
          ? res.data.gaps
          : (Array.isArray(res?.data)
            ? res.data
            : (Array.isArray(res?.gaps)
              ? res.gaps
              : (Array.isArray(res) ? res : INITIAL_SKILL_GAPS)));
        const normalized = (rawPayload || []).map(g => ({
          ...g,
          requiredLevel: g.requiredLevel ?? g.targetLevel ?? 3,
          targetLevel: g.targetLevel ?? g.requiredLevel ?? 3,
          category: g.category || g.domain || "Statistical Operations"
        }));
        setSkillGaps(normalized);
        setIsLoadingApi(false);
      }).catch(() => setIsLoadingApi(false));
    } else if (screenId === 'learning-path') {
      api.getLearningPath(LEARNING_PATHWAY).then(res => {
        if (res?.data) setLearningPathway(res.data);
        setIsLoadingApi(false);
      }).catch(() => setIsLoadingApi(false));
    } else if (screenId === 'courses') {
      api.getCourses({}, COURSES_CATALOG).then(res => {
        if (res?.data) setCourses(res.data);
        setIsLoadingApi(false);
      }).catch(() => setIsLoadingApi(false));
    } else if (screenId === 'trainer-dashboard') {
      api.getTrainerSummary(TRAINER_BATCH_DATA).then(() => {
        setIsLoadingApi(false);
      }).catch(() => setIsLoadingApi(false));
    } else if (screenId === 'admin-dashboard') {
      api.getAdminWorkforce(ADMIN_ORG_DATA).then(() => {
        setIsLoadingApi(false);
      }).catch(() => setIsLoadingApi(false));
    } else if (screenId === 'reports') {
      api.getReports(REPORTS_CATALOG).then(() => {
        setIsLoadingApi(false);
      }).catch(() => setIsLoadingApi(false));
    } else {
      setIsLoadingApi(false);
    }
  }, []);

  const setCurrentScreen = useCallback((screenId) => {
    setCurrentScreenState(screenId);

    // Sync browser URL clean path
    const targetPath = (screenId === 'login' || !screenId)
      ? '/login'
      : (screenId === 'admin-login' || screenId === 'admin')
      ? '/admin'
      : `/${screenId}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }

    triggerApiSync(screenId);
  }, [triggerApiSync]);

  // Listen to browser popstate (back/forward) and initial URL
  useEffect(() => {
    const handleUrlChange = () => {
      let path = window.location.pathname.replace(/^\/+/, '').toLowerCase();
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (!path && hash) path = hash;

      if (path === 'admin' || path.startsWith('admin/')) {
        setIsAdminPortalMode(true);
        if (!isAuthenticated) {
          setCurrentScreenState('admin-login');
        } else if (userProfile?.role === 'admin') {
          setCurrentScreenState('admin-dashboard');
          triggerApiSync('admin-dashboard');
        }
      } else if (!path) {
        if (isAuthenticated) {
          const target = userProfile?.role === 'trainer' ? 'trainer-dashboard' : (userProfile?.role === 'admin' ? 'admin-dashboard' : 'dashboard');
          setCurrentScreenState(target);
          triggerApiSync(target);
        } else {
          setCurrentScreenState('login');
        }
      } else if (path === 'login') {
        setIsAdminPortalMode(false);
        setCurrentScreenState('login');
      } else if (path === 'page/home' || path === 'home' || path === 'dashboard') {
        setIsAdminPortalMode(false);
        setIsAuthenticated(true);
        setCurrentScreenState('dashboard');
        triggerApiSync('dashboard');
      } else {
        const isUserAuth = isAuthenticated || (typeof window !== 'undefined' && localStorage.getItem('gyanmitra_authenticated') !== 'false');
        if (isUserAuth) {
          setIsAuthenticated(true);
          setCurrentScreenState(path);
          triggerApiSync(path);
        } else {
          sessionStorage.setItem('gyanmitra_target_screen', path);
          setCurrentScreenState('login');
        }
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [isAuthenticated, userProfile, triggerApiSync]);

  // Secure Login Handler (Supports 'employee', 'trainer', 'admin', or 'admin_civil', 'admin_municipal', etc.)
  const loginUser = async (roleOrPresetKey, credentials = {}) => {
    let preset = USER_PRESETS[roleOrPresetKey] || USER_PRESETS[roleOrPresetKey.replace('admin_', '')] || USER_PRESETS.employee;
    if (roleOrPresetKey.startsWith('admin')) {
      preset = USER_PRESETS[roleOrPresetKey] || USER_PRESETS.admin;
    }
    const finalProfile = { ...preset, ...credentials };
    const effectiveRole = finalProfile.role || 'employee';

    // Call backend Auth API
    await api.login({ email: credentials.email || preset.email, role: effectiveRole }, { user: finalProfile });

    setCurrentRole(effectiveRole);
    setUserProfile(finalProfile);
    if (finalProfile.departmentId) {
      setAdminDepartment(finalProfile.departmentId);
    }
    setIsAuthenticated(true);

    const assessmentKey = `gyanmitra_initial_assessment_${finalProfile.email || 'user'}`;
    const promptedKey = `gyanmitra_initial_assessment_prompted_${finalProfile.email || 'user'}`;
    const alreadyTaken = localStorage.getItem(assessmentKey) === 'true';
    const alreadyPrompted = localStorage.getItem(promptedKey) === 'true';
    setHasCompletedInitialAssessment(alreadyTaken);

    localStorage.setItem('gyanmitra_authenticated', 'true');
    localStorage.setItem('gyanmitra_profile', JSON.stringify(finalProfile));
    localStorage.setItem('gyanmitra_role', effectiveRole);

    const pendingTarget = typeof window !== 'undefined' ? sessionStorage.getItem('gyanmitra_target_screen') : null;

    if (effectiveRole === 'trainer') {
      setIsAdminPortalMode(false);
      setCurrentScreen(pendingTarget || 'trainer-dashboard');
      if (pendingTarget) sessionStorage.removeItem('gyanmitra_target_screen');
      showToast(`Welcome ${finalProfile.name}! Logged into NSSTA Trainer Portal.`, "success");
    } else if (effectiveRole === 'admin') {
      setIsAdminPortalMode(true);
      setCurrentScreen(pendingTarget || 'admin-dashboard');
      if (pendingTarget) sessionStorage.removeItem('gyanmitra_target_screen');
      showToast(`Welcome ${finalProfile.name}! Logged into ${finalProfile.department || 'Governance Admin Portal'}.`, "success");
    } else {
      setIsAdminPortalMode(false);
      setCurrentScreen(pendingTarget || 'dashboard');
      if (pendingTarget) sessionStorage.removeItem('gyanmitra_target_screen');
      // Strictly show ONLY ONCE when user signs in for the first time
      if (!alreadyTaken && !alreadyPrompted && !pendingTarget) {
        setShowInitialAssessmentModal(true);
        localStorage.setItem(promptedKey, 'true');
      } else {
        setShowInitialAssessmentModal(false);
      }
      showToast(`Welcome ${finalProfile.name}! Logged into GyanMitra.`, "success");
    }
  };

  // Switch Admin Department Console
  const switchAdminDepartment = (deptId) => {
    const presetMap = {
      civil: USER_PRESETS.admin_civil,
      municipal: USER_PRESETS.admin_municipal,
      statistical: USER_PRESETS.admin_statistical,
      revenue: USER_PRESETS.admin_revenue
    };
    const targetAdmin = presetMap[deptId] || USER_PRESETS.admin;
    setAdminDepartment(deptId);
    setUserProfile(targetAdmin);
    showToast(`Admin Console switched to ${targetAdmin.department}`, "info");
  };

  // Assign Program to Learner from Admin Learner Dashboard
  const assignProgramToLearner = (learnerId, programTitle) => {
    setAdminLearners(prev => prev.map(lrn => {
      if (lrn.id === learnerId) {
        return {
          ...lrn,
          activeCoursesCount: (lrn.activeCoursesCount || 0) + 1,
          aparStatus: "Assignment Mandated"
        };
      }
      return lrn;
    }));
    showToast(`Assigned '${programTitle}' to learner. Notification dispatched.`, "success");
  };

  // Launch Assessment in Full Screen Mode
  const startAssessmentFullScreen = () => {
    setShowInitialAssessmentModal(false);
    setHasCompletedInitialAssessment(true);
    if (userProfile?.email) {
      localStorage.setItem(`gyanmitra_initial_assessment_${userProfile.email}`, 'true');
      localStorage.setItem(`gyanmitra_initial_assessment_prompted_${userProfile.email}`, 'true');
    }
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch (e) {}
    setCurrentScreen('assessment');
  };

  // Dismiss Initial Assessment Prompt on Sign-in
  const dismissInitialAssessmentModal = () => {
    setShowInitialAssessmentModal(false);
    setHasCompletedInitialAssessment(true);
    if (userProfile?.email) {
      localStorage.setItem(`gyanmitra_initial_assessment_${userProfile.email}`, 'true');
      localStorage.setItem(`gyanmitra_initial_assessment_prompted_${userProfile.email}`, 'true');
    }
    showToast("Initial baseline assessment postponed. You can start it anytime from the sidebar.", "info");
  };

  // Logout Handler
  const logoutUser = () => {
    const wasAdmin = userProfile?.role === 'admin' || isAdminPortalMode;
    setIsAuthenticated(false);
    setShowInitialAssessmentModal(false);
    localStorage.removeItem('gyanmitra_authenticated');
    localStorage.removeItem('gyanmitra_profile');
    localStorage.removeItem('gyanmitra_role');
    setIsAdminPortalMode(false);
    setCurrentScreenState('login');
    window.history.pushState(null, '', '/login');
    if (wasAdmin) {
      showToast("Signed out of Admin Console.", "info");
    } else {
      showToast("Signed out successfully from Parichay SSO.", "info");
    }
  };

  // Closed Loop Competency Update after completing Quiz/Assessment
  const updateCompetencyAfterQuiz = async (quizResult) => {
    const { scorePercentage = 80, competencyImpacted = "Python for Data Analysis" } = quizResult || {};
    try {
      if (userProfile?.email) {
        localStorage.setItem(`gyanmitra_initial_assessment_${userProfile.email}`, 'true');
        setHasCompletedInitialAssessment(true);
      }
      
      // Trigger POST to /api/competencies/update-from-assessment
      try {
        await api.updateCompetencyFromAssessment({ scorePercentage, competencyImpacted });
      } catch (err) {
        console.warn('[Competency] API update skipped:', err);
      }

      // 1. Update overall competency score defensively
      setCompetencyOverview(prev => {
        const base = (prev && !Array.isArray(prev) && Array.isArray(prev.categories))
          ? prev
          : COMPETENCY_OVERVIEW;
        const scoreDelta = scorePercentage >= 70 ? 4 : 1;
        const currentOverall = typeof base.overallScore === 'number' ? base.overallScore : 78;
        const newScore = Math.min(100, currentOverall + scoreDelta);
        const categories = Array.isArray(base.categories) ? base.categories : (COMPETENCY_OVERVIEW.categories || []);
        const updatedCategories = categories.map(cat => {
          if (cat?.name && (cat.name.includes("Technical") || cat.name.includes("Statistical"))) {
            return { ...cat, score: Math.min(100, (cat.score || 70) + (scorePercentage >= 70 ? 6 : 2)) };
          }
          return cat;
        });
        const currentDelta = parseInt(base.monthlyDelta) || 8;
        return {
          ...base,
          overallScore: newScore,
          monthlyDelta: `+${currentDelta + scoreDelta}%`,
          categories: updatedCategories
        };
      });

      // 2. Reduce Skill Gap
      setSkillGaps(prev => {
        const baseGaps = Array.isArray(prev) ? prev : INITIAL_SKILL_GAPS;
        return baseGaps.map(gap => {
          if (gap?.competency?.toLowerCase().includes((competencyImpacted || "").toLowerCase()) || gap?.id === 'gap-1') {
            const reqLevel = gap.requiredLevel || 3;
            const curLevel = gap.currentLevel || 1;
            const newCurrent = Math.min(reqLevel, curLevel + 1);
            const newGap = Math.max(0, reqLevel - newCurrent);
            return {
              ...gap,
              currentLevel: newCurrent,
              gap: newGap,
              priority: newGap === 0 ? 'Completed' : (newGap === 1 ? 'Medium' : 'High'),
              why: `Updated on ${new Date().toLocaleDateString()}: Competency demonstrated at Level ${newCurrent} following verified assessment score of ${scorePercentage}%.`
            };
          }
          return gap;
        });
      });

      // 3. Advance Learning Pathway
      setLearningPathway(prev => {
        const basePathway = Array.isArray(prev) ? prev : LEARNING_PATHWAY;
        return basePathway.map((step, idx) => {
          if (step.status === 'current') {
            return { ...step, status: 'completed', progress: 100, score: `${scorePercentage}% Certified` };
          }
          if (idx === 2 && basePathway[1]?.status === 'current') {
            return { ...step, status: 'current', progress: 15, score: 'In Progress' };
          }
          return step;
        });
      });
      // 4. Trigger Notification
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: `Competency Updated: ${scorePercentage}% in Assessment`,
        description: `Your competency in ${competencyImpacted} has advanced. Skill gaps and learning pathways have been re-calibrated.`,
        time: "Just now",
        priority: "high",
        read: false,
        type: "assessment",
        actionLink: "learning-path"
      };
      setNotifications(prev => [newNotif, ...(Array.isArray(prev) ? prev : [])]);

      showToast(`Competency Profile Updated! Score: ${scorePercentage}%`, "success");
    } catch (error) {
      console.warn('Could not update competency after quiz:', error);
    }
  };

  // Launch AI-generated quiz or course completion quiz
  const [targetModuleForReview, setTargetModuleForReview] = useState(null);

  const startGeneratedQuiz = (quizData) => {
    setCurrentQuizData(quizData);
    setActiveQuizType('ai-generated');
    setCurrentScreen('quiz-taking');
    showToast(`Starting Quiz: ${quizData.title}`, "info");
  };

  const startCourseQuiz = (course, customQuiz = null) => {
    let quizToUse = customQuiz;
    if (!quizToUse) {
      quizToUse = generatedQuizzes.find(
        (q) => q.courseId === course.id || q.courseId === course.courseId || q.courseTitle === course.title
      );
    }
    if (!quizToUse) {
      // Create fallback department admin quiz customized for the course syllabus
      quizToUse = {
        id: `quiz-course-${course.id}`,
        title: `Department Admin Assessment: ${course.title}`,
        documentName: `${course.title.replace(/\s+/g, '_')}_Curriculum.pdf`,
        topic: course.competency || course.domain || "Official Capacity Building",
        courseId: course.id,
        courseTitle: course.title,
        department: userProfile?.department || "Survey Design and Research Division (SDRD)",
        createdBy: "Dr. Arvind Mehta (ADG, SDRD - Department Admin)",
        targetUserName: userProfile?.name || "Rajesh Kumar",
        difficulty: course.difficulty || course.level || "Intermediate",
        totalQuestions: course.syllabus?.length || 3,
        passingScorePercentage: 70,
        questions: (course.syllabus || [
          "Core Regulatory & Theoretical Foundations",
          "Operational SOPs & Implementation Protocols",
          "Verification, Quality Assurance & Audit Trails"
        ]).map((mod, idx) => ({
          id: idx + 1,
          question: `In ${course.title}, what is the mandatory official procedure established in ${mod}?`,
          options: [
            `Strict adherence to the verified operational workflow outlined in ${mod}.`,
            "Bypassing supervisory authorization if timeline is tight.",
            "Informal unrecorded verbal communications without audit trails.",
            "Delegating statutory verification to unverified external contractors."
          ],
          correctAnswer: 0,
          explanation: `Official Ministry directives mandate rigorous compliance with standard operating procedures specified under ${mod}.`,
          sourceCitation: `${course.title} Guidelines (${mod})`,
          relatedModule: mod,
          moduleId: idx + 1
        }))
      };
    }

    setCurrentQuizData(quizToUse);
    setActiveQuizType('course-admin-quiz');
    setCurrentScreen('quiz-taking');
    showToast(`🎯 Unlocked: Department Admin Assessment for "${course.title}"`, "info");
  };

  const openCourseModule = (courseId, moduleIdx = 0) => {
    setTargetModuleForReview({ courseId, moduleIdx });
    setCurrentScreen('learning-path');
  };

  // AI Chat send message (Exclusively powered by Groq Cloud API with institutional guardrails)
  const sendAiMessage = async (userText) => {
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: "Just now"
    };

    setAiChatMessages(prev => [...prev, userMsg]);

    let replyText = "";
    let suggestions = ["Show recommended courses", "View my skill gap breakdown"];

    try {
      // Call Express backend -> Groq LLM API
      const apiRes = await api.sendAIChat(userText);
      if (apiRes && apiRes.reply) {
        replyText = apiRes.reply;
        if (replyText.includes("exclusively to the iGOT Karmayogi")) {
          // Off-topic refusal formal response
          suggestions = [
            "Explain Multi-Stage Stratified Sampling in NSS",
            "What are my highest priority skill gaps?",
            "How does MoSPI compile National Accounts?"
          ];
        }
      }
    } catch (err) {
      console.warn('[AI Assistant] Groq API call error, applying local MoSPI fallback:', err);
    }

    if (!replyText) {
      // Fallback only if server completely unreachable
      const lower = userText.toLowerCase();
      const isRelevant = lower.includes("gap") || lower.includes("skill") || lower.includes("python") ||
        lower.includes("sampling") || lower.includes("nss") || lower.includes("karmayogi") ||
        lower.includes("apar") || lower.includes("cbp") || lower.includes("mospi") || lower.includes("course");

      if (!isRelevant) {
        replyText = "I am GyanMitra AI, dedicated exclusively to the iGOT Karmayogi & MoSPI Capacity Building Framework. I can only assist with official competencies, courses, assessment preparation, and learning pathways within this application. Please submit inquiries regarding official statistics, your competency profile, or portal courses.";
        suggestions = [
          "Explain Multi-Stage Stratified Sampling in NSS",
          "What are my highest priority skill gaps?",
          "How does MoSPI compile National Accounts?"
        ];
      } else if (lower.includes("gap") || lower.includes("skill")) {
        replyText = `You currently have 4 identified skill gaps. Your two highest priority gaps are:\n1. **Python for Data Analysis** (Current Level 2 vs Required Level 4)\n2. **AI/ML in Official Statistics** (Current Level 1 vs Required Level 3)\n\nAddressing Python will resolve data validation bottlenecks in SDRD survey tabulation.`;
        suggestions = ["Generate personalized learning path", "Take Python assessment now"];
      } else if (lower.includes("why") || lower.includes("recommended") || lower.includes("path")) {
        replyText = `The course **'Python for Microdata Processing & NSS Vectorization'** from NSSTA Greater Noida was recommended because your ISS Deputy Director role mandates Level 4 proficiency in processing large-scale survey unit data (such as NSS Schedule 10 and Periodic Labour Force Survey).`;
        suggestions = ["View full course syllabus", "Go to learning path"];
      } else if (lower.includes("sampling") || lower.includes("stratified")) {
        replyText = `**Multi-Stage Stratified Sampling** in the National Sample Survey (NSS) operates in two or more hierarchical stages:\n\n• **First Stage Units (FSUs)**: Census villages in rural sectors or Urban Frame Survey (UFS) blocks in urban sectors, selected with Probability Proportional to Size (PPSWR).\n• **Second Stage Units (SSUs)**: Households selected through circular systematic sampling after on-ground listing.\n\nThis optimizes field resource costs while preserving unbiased national estimates.`;
        suggestions = ["Generate quiz on Sampling Methodology", "View NSSTA Sampling Manual"];
      } else {
        replyText = "GyanMitra Official Knowledge Assistant: In accordance with MoSPI guidelines and NSSTA curricula, learning pathways and assessments are aligned with the official civil service competency framework.";
      }
    }

    const aiReply = {
      id: `msg-ai-${Date.now()}`,
      sender: 'ai',
      text: replyText,
      time: "Just now",
      suggestions
    };
    setAiChatMessages(prev => [...prev, aiReply]);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isAuthenticated,
        setIsAuthenticated,
        currentRole,
        setCurrentRole,
        loginUser,
        logoutUser,
        isAdminPortalMode,
        setIsAdminPortalMode,
        adminDepartment,
        setAdminDepartment,
        adminLearners,
        setAdminLearners,
        switchAdminDepartment,
        assignProgramToLearner,
        adminDepartmentsConfig: ADMIN_DEPARTMENTS_CONFIG,
        adminAuditData: ADMIN_ASSESSMENTS_AUDIT_DATA,
        currentScreen,
        setCurrentScreen,
        isLoadingApi,
        userProfile,
        setUserProfile,
        fontScale,
        setFontScale,
        competencyOverview,
        setCompetencyOverview,
        skillGaps,
        setSkillGaps,
        learningPathway,
        setLearningPathway,
        courses,
        setCourses,
        activeQuizType,
        setActiveQuizType,
        currentQuizData,
        setCurrentQuizData,
        lastQuizResult,
        setLastQuizResult,
        generatedQuizzes,
        setGeneratedQuizzes,
        startGeneratedQuiz,
        startCourseQuiz,
        openCourseModule,
        targetModuleForReview,
        setTargetModuleForReview,
        learningPathFilter,
        setLearningPathFilter,
        notifications,
        setNotifications,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        aiChatMessages,
        sendAiMessage,
        toastMessage,
        showToast,
        showInitialAssessmentModal,
        setShowInitialAssessmentModal,
        hasCompletedInitialAssessment,
        startAssessmentFullScreen,
        dismissInitialAssessmentModal,
        reportsCatalog: REPORTS_CATALOG,
        trainerBatchData: TRAINER_BATCH_DATA,
        adminOrgData: ADMIN_ORG_DATA,
        aiPrompts: AI_ASSISTANT_PROMPTS,
        standardQuestions: ASSESSMENT_QUESTIONS,
        theme,
        setTheme,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
