import express from 'express';
import { learningService } from '../services/learningService.js';
import { successResponse, errorResponse } from '../utils/response.js';

const router = express.Router();

// GET /api/learning/path - Personalized learning pathway
router.get('/path', async (req, res, next) => {
  try {
    const pathway = await learningService.getPersonalizedPathway(req.user?._id);
    return successResponse(res, pathway, "Personalized learning pathway");
  } catch (err) {
    next(err);
  }
});

// GET /api/learning/my-learning - Enrolled learning status
router.get('/my-learning', async (req, res, next) => {
  try {
    const data = await learningService.getMyLearning(req.query.status);
    return successResponse(res, data, "My Learning courses");
  } catch (err) {
    next(err);
  }
});

// PUT /api/learning/progress - Update learning progress
router.put('/progress', async (req, res, next) => {
  try {
    const { courseId, progress } = req.body;
    const updated = await learningService.updateCourseProgress(courseId, progress);
    if (!updated) {
      return errorResponse(res, "Course not found", "Not Found", 404);
    }
    return successResponse(res, updated, "Progress updated");
  } catch (err) {
    next(err);
  }
});

export default router;
