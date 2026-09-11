import express from 'express';
import { assessmentService } from '../services/assessmentService.js';
import { successResponse, errorResponse } from '../utils/response.js';

const router = express.Router();

// GET /api/assessment - Assessment catalog
router.get('/', async (req, res, next) => {
  try {
    const list = await assessmentService.getAssessments();
    return successResponse(res, list, "Available assessments");
  } catch (err) {
    next(err);
  }
});

// GET /api/assessment/:id - Assessment metadata
router.get('/:id', async (req, res, next) => {
  try {
    const asm = await assessmentService.getAssessmentById(req.params.id);
    if (!asm) {
      return errorResponse(res, "Assessment not found", "Not Found", 404);
    }
    const { questions, ...metadata } = asm;
    return successResponse(res, { ...metadata, totalQuestions: questions.length }, "Assessment details");
  } catch (err) {
    next(err);
  }
});

// POST /api/assessment/:id/start - Start timed assessment session
router.post('/:id/start', async (req, res, next) => {
  try {
    const session = await assessmentService.startAssessment(req.params.id, req.user?._id);
    if (!session) {
      return errorResponse(res, "Assessment not found", "Not Found", 404);
    }
    return successResponse(res, session, "Assessment session initiated");
  } catch (err) {
    next(err);
  }
});

// POST /api/assessment/:id/submit - Submit answers & trigger closed-loop competency ledger
router.post('/:id/submit', async (req, res, next) => {
  try {
    const submissionResult = await assessmentService.submitAssessment(
      req.params.id,
      req.body,
      req.user?._id || "usr_001"
    );
    if (!submissionResult) {
      return errorResponse(res, "Assessment not found or invalid submission", "Error", 400);
    }
    return successResponse(
      res,
      submissionResult,
      "Assessment evaluated and closed-loop competency ledger updated successfully"
    );
  } catch (err) {
    next(err);
  }
});

export default router;
