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

const handleChat = (req, res) => {
  const { message } = req.body;
  let reply = "GyanMitra Statistical RAG: I have referenced MoSPI guidelines and NSSTA manuals to assist your inquiry.";
  let sources = ["MoSPI ACBP Framework 2026", "NSSTA Training Manual"];

  const msg = (message || '').toLowerCase();
  if (msg.includes("gap") || msg.includes("python") || msg.includes("skill")) {
    reply = "Your primary skill gap is in Python for Data Analysis (Level 2 vs Level 4 required for official microdata processing). I recommend completing the NSSTA 'Python for Microdata' module.";
    sources = ["MoSPI ACBP Competency Matrix 2026"];
  } else if (msg.includes("sampling") || msg.includes("nss") || msg.includes("fsu")) {
    reply = "In National Sample Surveys, Multi-Stage Stratified Sampling selects Census villages (FSUs) via PPSWR in Stage 1, followed by systematic household selection (SSUs) in Stage 2.";
    sources = ["NSS 79th Round Sampling Methodology Manual"];
  } else if (msg.includes("apar") || msg.includes("cbp") || msg.includes("karmayogi")) {
    reply = "Your APAR-linked CBP courses are aligned with DoPT guidelines. Completing courses on iGOT Bharat earns verified Karma Points towards your official annual performance appraisal.";
    sources = ["DoPT Karmayogi Bharat Guidelines 2026"];
  }

  return res.json({
    success: true,
    mode: "mock",
    reply,
    groundedSource: sources.join(" • ")
  });
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


