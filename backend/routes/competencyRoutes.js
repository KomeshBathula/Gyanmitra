import express from 'express';
import { competencyService } from '../services/competencyService.js';
import { skillGapService } from '../services/skillGapService.js';
import { learningService } from '../services/learningService.js';
import { recommendationService } from '../services/recommendationService.js';
import { successResponse } from '../utils/response.js';

const router = express.Router();

// GET /api/competencies/overview - ACBP Competency Radar & Domain Breakdown
router.get('/overview', async (req, res, next) => {
  try {
    const overview = await competencyService.getOverview(req.user?._id);
    return res.json({ success: true, data: overview });
  } catch (err) {
    next(err);
  }
});

// GET /api/competencies/list - All competencies list
router.get('/list', async (req, res, next) => {
  try {
    const list = await competencyService.getCompetenciesList();
    return successResponse(res, list, "Official competency dictionary");
  } catch (err) {
    next(err);
  }
});

// GET /api/competencies/skill-gaps - Prioritized Skill Gaps
router.get('/skill-gaps', async (req, res, next) => {
  try {
    const gaps = await skillGapService.getUserSkillGaps(req.user?._id);
    return res.json({ success: true, data: gaps });
  } catch (err) {
    next(err);
  }
});

// GET /api/competencies/learning-path - Tailored Learning Path based on Skill Gaps
router.get('/learning-path', async (req, res, next) => {
  try {
    const path = await learningService.getPersonalizedPathway(req.user?._id);
    return res.json({ success: true, data: path });
  } catch (err) {
    next(err);
  }
});

// GET /api/competencies/recommendations - Rule-based course & program recommendations
router.get('/recommendations', async (req, res, next) => {
  try {
    const recs = await recommendationService.getPersonalizedRecommendations(req.user?._id);
    return successResponse(res, recs, "Rule-based personalized recommendations");
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
