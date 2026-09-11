import express from 'express';
import { competencyService } from '../services/competencyService.js';
import { skillGapService } from '../services/skillGapService.js';
import { learningService } from '../services/learningService.js';
import { recommendationService } from '../services/recommendationService.js';
import { successResponse } from '../utils/response.js';

const router = express.Router();

// GET /api/competencies & /api/competencies/overview
const handleOverview = async (req, res, next) => {
  try {
    const overview = await competencyService.getOverview(req.user?._id);
    const list = await competencyService.getCompetenciesList();
    return res.json({
      success: true,
      data: list,
      overview,
      domains: list
    });
  } catch (err) {
    next(err);
  }
};
router.get('/', handleOverview);
router.get('/overview', handleOverview);

// GET /api/competencies/list - All competencies list
router.get('/list', async (req, res, next) => {
  try {
    const list = await competencyService.getCompetenciesList();
    return successResponse(res, list, "Official competency dictionary");
  } catch (err) {
    next(err);
  }
});

// GET /api/competencies/skill-gaps & /api/competencies/gaps
const handleSkillGaps = async (req, res, next) => {
  try {
    const gaps = await skillGapService.getUserSkillGaps(req.user?._id);
    return res.json({
      success: true,
      data: {
        totalGaps: gaps.length,
        gaps
      }
    });
  } catch (err) {
    next(err);
  }
};
router.get('/skill-gaps', handleSkillGaps);
router.get('/gaps', handleSkillGaps);

// GET /api/competencies/gap/:gapId & /api/competencies/skill-gaps/:gapId
router.get(['/gap/:gapId', '/skill-gaps/:gapId'], async (req, res, next) => {
  try {
    const details = await skillGapService.getGapDetailById(req.user?._id, req.params.gapId);
    return res.json({
      success: true,
      data: details
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/competencies/learning-path & /api/competencies/path
const handleLearningPath = async (req, res, next) => {
  try {
    const path = await learningService.getPersonalizedPathway(req.user?._id);
    return res.json({ success: true, data: path });
  } catch (err) {
    next(err);
  }
};
router.get('/learning-path', handleLearningPath);
router.get('/path', handleLearningPath);

// GET /api/competencies/recommendations
router.get('/recommendations', async (req, res, next) => {
  try {
    const recs = await recommendationService.getPersonalizedRecommendations(req.user?._id);
    return res.json({
      success: true,
      data: {
        recommendedCourses: recs,
        courses: recs
      }
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/competencies/update-from-assessment - Closed-loop update from quiz result
router.post('/update-from-assessment', async (req, res, next) => {
  try {
    const result = await competencyService.updateFromAssessmentResult(req.user?._id, req.body);
    return res.json({
      success: true,
      message: "Competency ledger and Karma Points updated successfully",
      ...result
    });
  } catch (err) {
    next(err);
  }
});

export default router;


