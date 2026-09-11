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
      title
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

    // Create persistent quiz record so it reflects on user dashboards
    const generatedQuiz = {
      id: `quiz-gen-${Date.now()}`,
      title: title || `AI Assessment: ${documentName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}`,
      documentName,
      topic,
      difficulty,
      questionCount: result.questions.length,
      createdAt: "Just now",
      createdBy: req.user?.name || "Dr. Mehta (Admin)",
      isLive: true,
      mode: result.mode,
      questions: result.questions
    };

    // Save to database
    db.generatedQuizzes.unshift(generatedQuiz);

    return res.json({
      success: true,
      mode: result.mode,
      model: result.model,
      document: documentName,
      difficulty,
      totalQuestions: result.questions.length,
      questions: result.questions,
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

// GET /api/ai/quizzes - List all generated quizzes available for user dashboards
router.get('/quizzes', (req, res) => {
  return successResponse(res, db.generatedQuizzes, "List of generated quizzes");
});

// GET /api/ai/quizzes/:id - Get specific generated quiz with questions
router.get('/quizzes/:id', (req, res) => {
  const quiz = db.generatedQuizzes.find(q => q.id === req.params.id);
  if (!quiz) {
    return errorResponse(res, "Generated quiz not found", "Not Found", 404);
  }
  return successResponse(res, quiz, "Generated quiz details");
});

// Route definitions supporting both paths
router.post('/generate-quiz', handleGenerateQuiz);
router.post('/quiz/generate', handleGenerateQuiz);
router.post('/assistant-chat', handleChat);
router.post('/chat', handleChat);

export default router;


