import express from 'express';
import { mockIgotAdapter } from '../integrations/igot/mockIgotAdapter.js';
import { mockNsstaAdapter } from '../integrations/nssta/mockNsstaAdapter.js';
import { successResponse, errorResponse } from '../utils/response.js';

const router = express.Router();

// --- iGOT Karmayogi Bharat Mock Integration APIs ---

// GET /api/integrations/igot/courses
router.get('/igot/courses', async (req, res, next) => {
  try {
    const result = await mockIgotAdapter.searchCourses(req.query);
    return successResponse(res, result, "iGOT courses retrieved via integration adapter");
  } catch (err) {
    next(err);
  }
});

// GET /api/integrations/igot/courses/:id
router.get('/igot/courses/:id', async (req, res, next) => {
  try {
    const course = await mockIgotAdapter.getCourseDetails(req.params.id);
    if (!course) return errorResponse(res, "Course not found on iGOT portal", "Not Found", 404);
    return successResponse(res, course, "iGOT course metadata");
  } catch (err) {
    next(err);
  }
});

// POST /api/integrations/igot/enroll
router.post('/igot/enroll', async (req, res, next) => {
  try {
    const { courseId, ...metadata } = req.body;
    const enrollResult = await mockIgotAdapter.enrollCourse(req.user?._id || "usr_001", courseId, metadata);
    return successResponse(res, enrollResult, enrollResult.message);
  } catch (err) {
    next(err);
  }
});

// --- NSSTA Academy Mock Integration APIs ---

// GET /api/integrations/nssta/programs
router.get('/nssta/programs', async (req, res, next) => {
  try {
    const result = await mockNsstaAdapter.getTrainingPrograms(req.query);
    return successResponse(res, result, "NSSTA official statistical training programmes");
  } catch (err) {
    next(err);
  }
});

// POST /api/integrations/nssta/nominate
router.post('/nssta/nominate', async (req, res, next) => {
  try {
    const { programId, ...nominationData } = req.body;
    const result = await mockNsstaAdapter.registerTraining(req.user?._id || "usr_001", programId, nominationData);
    if (!result.success) return errorResponse(res, result.message, "Nomination Failed", 400);
    return successResponse(res, result, result.message);
  } catch (err) {
    next(err);
  }
});

export default router;
