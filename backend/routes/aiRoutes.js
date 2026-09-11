import express from 'express';
import { groqService } from '../services/groqService.js';
import { db } from '../data/db.js';
import { successResponse, errorResponse } from '../utils/response.js';

const router = express.Router();

const handleGenerateQuiz = async (req, res, next) => {
  try {
    const {
      documentName = "NSS_Sampling_Guidelines.pdf",
      documentText = "",
      topic = "Official Statistics & Survey Sampling",
      questionCount = 5,
      difficulty = "Medium",
      questionType = "MCQ",
      title,
      courseId = "cnt-1",
      courseTitle = "Understanding Corporate Insolvency Resolution Process",
      targetDepartment = "Survey Design and Research Division (SDRD)",
      targetUserId = "usr_001",
      targetUserName = "Rajesh Kumar"
    } = req.body;

    // Generate questions using Groq API (or high-fidelity MoSPI template fallback)
    const result = await groqService.generateQuizQuestions({
      documentName,
      documentText,
      topic,
      questionCount: Number(questionCount) || 5,
      difficulty,
      questionType
    });

    // Tag questions with module associations if not present
    const enhancedQuestions = result.questions.map((q, idx) => ({
      ...q,
      relatedModule: q.relatedModule || `Module ${idx + 1}: ${topic} - Key Concept & Practice ${idx + 1}`,
      moduleId: idx + 1
    }));

    // Create persistent quiz record so it reflects on user dashboards & course completion
    const generatedQuiz = {
      id: `quiz-gen-${Date.now()}`,
      title: title || `Department Admin Assessment: ${courseTitle || documentName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}`,
      documentName,
      topic,
      difficulty,
      courseId,
      courseTitle,
      targetDepartment,
      targetUserId,
      targetUserName,
      passingScorePercentage: 70,
      questionCount: enhancedQuestions.length,
      createdAt: "Just now",
      createdBy: req.user?.name || "Dr. Arvind Mehta (Admin)",
      isLive: true,
      mode: result.mode,
      questions: enhancedQuestions
    };

    // Save to database
    db.generatedQuizzes.unshift(generatedQuiz);

    return res.json({
      success: true,
      mode: result.mode,
      model: result.model,
      document: documentName,
      difficulty,
      totalQuestions: enhancedQuestions.length,
      questions: enhancedQuestions,
      quiz: generatedQuiz
    });
  } catch (err) {
    next(err);
  }
};

const handleChat = async (req, res, next) => {
  try {
    const { message, chatHistory } = req.body;
    const userCadre = req.user?.cadre || req.user?.department || "Statistical Officer";

    const result = await groqService.chatAssistant({
      message,
      chatHistory,
      userCadre
    });

    return res.json({
      success: true,
      mode: result.mode,
      model: result.model,
      reply: result.reply,
      groundedSource: result.groundedSource
    });
  } catch (err) {
    next(err);
  }
};

const handleQuizSubmit = async (req, res, next) => {
  try {
    const { quizId, answers = {}, courseId, userProfile } = req.body;
    const quiz = db.generatedQuizzes.find(q => q.id === quizId || q._id === quizId) ||
                 db.generatedQuizzes.find(q => q.courseId === courseId) ||
                 db.generatedQuizzes[0];

    if (!quiz) {
      return errorResponse(res, "Assessment quiz not found", "Not Found", 404);
    }

    let correctCount = 0;
    const missedQuestions = [];
    const recommendedModules = [];

    quiz.questions.forEach((q, idx) => {
      let selected = answers[q.id];
      if (selected === undefined) selected = answers[idx];
      if (selected === undefined) selected = answers[idx + 1];

      const isCorrect = Number(selected) === Number(q.correctAnswer);
      if (isCorrect) {
        correctCount++;
      } else {
        missedQuestions.push({
          id: q.id,
          question: q.question,
          selectedAnswer: selected,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || "Review official standard operating procedure guidelines.",
          sourceCitation: q.sourceCitation || "Ministry Manual",
          relatedModule: q.relatedModule || `Module ${idx + 1}`
        });

        if (q.relatedModule) {
          recommendedModules.push({
            moduleName: q.relatedModule,
            moduleId: q.moduleId || idx + 1,
            courseId: quiz.courseId || courseId || "cnt-1",
            courseTitle: quiz.courseTitle || "Course Curriculum",
            reason: `Targeted revision recommended for concept assessed in Q${idx + 1}`
          });
        }
      }
    });

    const totalCount = quiz.questions.length;
    const scorePercentage = Math.round((correctCount / totalCount) * 100);
    const isPassed = scorePercentage >= (quiz.passingScorePercentage || 70);

    // Dynamic Follow-up Course Recommendations
    const recommendedCourses = (db.coursesCatalog || [])
      .filter(c => c.id !== quiz.courseId)
      .slice(0, 2)
      .map(c => ({
        id: c.id,
        title: c.title,
        provider: c.provider || "iGOT Karmayogi",
        difficulty: c.difficulty || c.level || "Intermediate",
        duration: c.duration || "14 Hours",
        matchScore: isPassed ? 96 : 91,
        competency: c.competency || "Official Statistics Capacity Building",
        recommendationReason: isPassed
          ? `Advanced progression track following 100% completion and ${scorePercentage}% score on ${quiz.courseTitle || quiz.title}.`
          : `Remedial core curriculum to fortify identified competency gap in ${quiz.topic || 'statistical methodologies'}.`
      }));

    const resultPayload = {
      resultId: `RES-QUIZ-${Date.now()}`,
      quizId: quiz.id,
      quizTitle: quiz.title,
      courseId: quiz.courseId || courseId,
      courseTitle: quiz.courseTitle || quiz.title,
      department: quiz.targetDepartment || "Survey Design and Research Division (SDRD)",
      evaluatedFor: quiz.targetUserName || userProfile?.name || "Rajesh Kumar",
      scorePercentage,
      correctCount,
      totalCount,
      isPassed,
      missedQuestions,
      recommendedModules,
      recommendedCourses,
      evaluatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    return successResponse(res, resultPayload, "Quiz evaluated successfully");
  } catch (err) {
    next(err);
  }
};

// GET /api/ai/quizzes - List all generated quizzes available for user dashboards
router.get('/quizzes', (req, res) => {
  return successResponse(res, db.generatedQuizzes, "List of generated quizzes");
});

// GET /api/ai/quizzes/:id - Get specific generated quiz with questions
router.get('/quizzes/:id', (req, res) => {
  const quiz = db.generatedQuizzes.find(q => q.id === req.params.id || q._id === req.params.id);
  if (!quiz) {
    return errorResponse(res, "Generated quiz not found", "Not Found", 404);
  }
  return successResponse(res, quiz, "Generated quiz details");
});

// Route definitions supporting both paths
router.post('/generate-quiz', handleGenerateQuiz);
router.post('/quiz/generate', handleGenerateQuiz);
router.post('/quiz-submit', handleQuizSubmit);
router.post('/quizzes/submit', handleQuizSubmit);
router.post('/assistant-chat', handleChat);
router.post('/chat', handleChat);

export default router;


