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
  AI_ASSISTANT_PROMPTS
} from '../data/mockData';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication & Role State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState('employee'); // 'employee' | 'trainer' | 'admin'
  const [currentScreen, setCurrentScreenState] = useState('login'); // screen identifier
  const [userProfile, setUserProfile] = useState(INITIAL_USER);
  const [isAdminPortalMode, setIsAdminPortalMode] = useState(false);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // Competency & Pathway State (Closed-Loop)
  const [competencyOverview, setCompetencyOverview] = useState(COMPETENCY_OVERVIEW);
  const [skillGaps, setSkillGaps] = useState(INITIAL_SKILL_GAPS);
  const [learningPathway, setLearningPathway] = useState(LEARNING_PATHWAY);
  const [courses, setCourses] = useState(COURSES_CATALOG);

  // Assessment & Quiz Engine State
  const [activeQuizType, setActiveQuizType] = useState('standard');
  const [currentQuizData, setCurrentQuizData] = useState(null);
  const [lastQuizResult, setLastQuizResult] = useState(null);
  const [generatedQuizzes, setGeneratedQuizzes] = useState([MOCK_GENERATED_QUIZ]);

  // Notifications State
  const [notifications, setNotifications] = useState(NOTIFICATIONS_LIST);

  // AI Assistant Drawer & Chat State
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
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

  // URL & API Synchronization on Screen Navigation (Clean URLs: /dashboard, /competencies, etc.)
  const setCurrentScreen = useCallback((screenId) => {
    setCurrentScreenState(screenId);

    // Sync browser URL clean path (e.g. /dashboard, /competencies, /skill-gaps)
    const targetPath = (screenId === 'login' || !screenId) ? '/' : `/${screenId}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }

    // Trigger Section-Specific REST API calls
    setIsLoadingApi(true);

    if (screenId === 'competencies' || screenId === 'dashboard') {
      api.getCompetenciesOverview(COMPETENCY_OVERVIEW).then(res => {
        if (res?.data) setCompetencyOverview(res.data);
        setIsLoadingApi(false);
      });
    } else if (screenId === 'skill-gaps') {
      api.getSkillGaps(INITIAL_SKILL_GAPS).then(res => {
        if (res?.data) setSkillGaps(res.data);
        setIsLoadingApi(false);
      });
    } else if (screenId === 'learning-path') {
      api.getLearningPath(LEARNING_PATHWAY).then(res => {
        if (res?.data) setLearningPathway(res.data);
        setIsLoadingApi(false);
      });
    } else if (screenId === 'courses') {
      api.getCourses({}, COURSES_CATALOG).then(res => {
        if (res?.data) setCourses(res.data);
        setIsLoadingApi(false);
      });
    } else if (screenId === 'trainer-dashboard') {
      api.getTrainerSummary(TRAINER_BATCH_DATA).then(() => {
        setIsLoadingApi(false);
      });
    } else if (screenId === 'admin-dashboard') {
      api.getAdminWorkforce(ADMIN_ORG_DATA).then(() => {
        setIsLoadingApi(false);
      });
    } else if (screenId === 'reports') {
      api.getReports(REPORTS_CATALOG).then(() => {
        setIsLoadingApi(false);
      });
    } else {
      setIsLoadingApi(false);
    }
  }, []);

  // Listen to browser popstate (back/forward) and initial URL
  useEffect(() => {
    const handleUrlChange = () => {
      let path = window.location.pathname.replace(/^\/+/, '').toLowerCase();
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (!path && hash) path = hash;

      if (path === 'admin') {
        setIsAdminPortalMode(true);
      } else if (path && path !== 'login' && isAuthenticated) {
        setCurrentScreenState(path);
      } else if (!path && isAuthenticated) {
        setCurrentScreenState('dashboard');
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [isAuthenticated]);

  // Secure Login Handler
  const loginUser = async (role, credentials = {}) => {
    const preset = USER_PRESETS[role] || USER_PRESETS.employee;
    const finalProfile = { ...preset, ...credentials };
    
    // Call backend Auth API
    await api.login({ email: credentials.email || preset.email, role }, { user: finalProfile });

    setCurrentRole(role);
    setUserProfile(finalProfile);
    setIsAuthenticated(true);

    if (role === 'trainer') {
      setCurrentScreen('trainer-dashboard');
      showToast(`Welcome Dr. Meenakshi Sundaram! Logged into NSSTA Trainer Portal.`, "success");
    } else if (role === 'admin') {
      setCurrentScreen('admin-dashboard');
      showToast(`Welcome Dr. Arvind Mehta! Logged into MoSPI Workforce Intelligence Gateway.`, "success");
    } else {
      setCurrentScreen('dashboard');
      showToast(`Welcome Rajesh Kumar Ji! Logged into Government Employee Portal.`, "success");
    }
  };

  // Logout Handler
  const logoutUser = () => {
    setIsAuthenticated(false);
    setCurrentScreenState('login');
    window.location.hash = '';
    window.history.pushState(null, '', '/');
    showToast("Signed out successfully from Parichay SSO.", "info");
  };

  // Closed Loop Competency Update after completing Quiz/Assessment
  const updateCompetencyAfterQuiz = async (quizResult) => {
    const { scorePercentage, competencyImpacted = "Python for Data Analysis" } = quizResult;
    
    // Trigger POST to /api/competencies/update-from-assessment
    await api.updateCompetencyFromAssessment({ scorePercentage, competencyImpacted });

    // 1. Update overall competency score
    setCompetencyOverview(prev => {
      const scoreDelta = scorePercentage >= 70 ? 4 : 1;
      const newScore = Math.min(100, prev.overallScore + scoreDelta);
      const updatedCategories = prev.categories.map(cat => {
        if (cat.name.includes("Technical") || cat.name.includes("Statistical")) {
          return { ...cat, score: Math.min(100, cat.score + (scorePercentage >= 70 ? 6 : 2)) };
        }
        return cat;
      });
      return {
        ...prev,
        overallScore: newScore,
        monthlyDelta: `+${parseInt(prev.monthlyDelta) + scoreDelta}%`,
        categories: updatedCategories
      };
    });

    // 2. Reduce Skill Gap
    setSkillGaps(prev => prev.map(gap => {
      if (gap.competency.toLowerCase().includes(competencyImpacted.toLowerCase()) || gap.id === 'gap-1') {
        const newCurrent = Math.min(gap.requiredLevel, gap.currentLevel + 1);
        const newGap = Math.max(0, gap.requiredLevel - newCurrent);
        return {
          ...gap,
          currentLevel: newCurrent,
          gap: newGap,
          priority: newGap === 0 ? 'Completed' : (newGap === 1 ? 'Medium' : 'High'),
          why: `Updated on ${new Date().toLocaleDateString()}: Competency demonstrated at Level ${newCurrent} following verified assessment score of ${scorePercentage}%.`
        };
      }
      return gap;
    }));

    // 3. Advance Learning Pathway
    setLearningPathway(prev => prev.map((step, idx) => {
      if (step.status === 'current') {
        return { ...step, status: 'completed', progress: 100, score: `${scorePercentage}% Certified` };
      }
      if (idx === 2 && prev[1].status === 'current') {
        return { ...step, status: 'current', progress: 15, score: 'In Progress' };
      }
      return step;
    }));

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
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Competency Profile Updated! Score: ${scorePercentage}%`, "success");
  };

  // AI Chat send message
  const sendAiMessage = async (userText) => {
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: "Just now"
    };

    setAiChatMessages(prev => [...prev, userMsg]);

    // Call /api/ai/assistant-chat
    const apiRes = await api.sendAIChat(userText);

    let replyText = apiRes?.reply || "Based on MoSPI guidelines and your current competency matrix, I recommend focusing on vectorization in Python before advancing to machine learning models.";
    let suggestions = ["Show recommended courses", "View my skill gap breakdown"];

    const lower = userText.toLowerCase();
    if (lower.includes("gap") || lower.includes("skill")) {
      replyText = `You currently have 4 identified skill gaps. Your two highest priority gaps are:\n1. **Python for Data Analysis** (Current Level 2 vs Required Level 4)\n2. **AI/ML in Official Statistics** (Current Level 1 vs Required Level 3)\n\nAddressing Python will resolve data validation bottlenecks in SDRD survey tabulation.`;
      suggestions = ["Generate personalized learning path", "Take Python assessment now"];
    } else if (lower.includes("why") || lower.includes("recommended") || lower.includes("path")) {
      replyText = `The course **'Python for Microdata Processing & NSS Vectorization'** from NSSTA Greater Noida was recommended because your ISS Deputy Director role mandates Level 4 proficiency in processing large-scale survey unit data (such as NSS Schedule 10 and Periodic Labour Force Survey).`;
      suggestions = ["View full course syllabus", "Go to learning path"];
    } else if (lower.includes("sampling") || lower.includes("stratified")) {
      replyText = `**Multi-Stage Stratified Sampling** in the National Sample Survey (NSS) operates in two or more hierarchical stages:\n\n• **First Stage Units (FSUs)**: Census villages in rural sectors or Urban Frame Survey (UFS) blocks in urban sectors, selected with Probability Proportional to Size (PPSWR).\n• **Second Stage Units (SSUs)**: Households selected through circular systematic sampling after on-ground listing.\n\nThis optimizes field resource costs while preserving unbiased national estimates.`;
      suggestions = ["Generate quiz on Sampling Methodology", "View NSSTA Sampling Manual"];
    } else if (lower.includes("dpdp") || lower.includes("privacy") || lower.includes("governance")) {
      replyText = `Under the **DPDP Act 2023**, MoSPI data dissemination requires Statistical Disclosure Control (SDC). Unit-level records must apply *k-anonymity* and perturb direct identifiers to ensure citizen privacy while preserving macro-economic aggregations.`;
      suggestions = ["View Data Privacy Course", "Check compliance checklist"];
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
        isAuthenticated,
        setIsAuthenticated,
        currentRole,
        setCurrentRole,
        loginUser,
        logoutUser,
        isAdminPortalMode,
        setIsAdminPortalMode,
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
        notifications,
        setNotifications,
        isAiDrawerOpen,
        setIsAiDrawerOpen,
        aiChatMessages,
        sendAiMessage,
        toastMessage,
        showToast,
        updateCompetencyAfterQuiz,
        reportsCatalog: REPORTS_CATALOG,
        trainerBatchData: TRAINER_BATCH_DATA,
        adminOrgData: ADMIN_ORG_DATA,
        aiPrompts: AI_ASSISTANT_PROMPTS,
        standardQuestions: ASSESSMENT_QUESTIONS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
