import express from 'express';
import { reportService } from '../services/reportService.js';
import { successResponse } from '../utils/response.js';

const router = express.Router();

// GET /api/reports - Reports Catalog
router.get('/', async (req, res, next) => {
  try {
    const list = await reportService.getReportsCatalog();
    return res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    next(err);
  }
});

// GET /api/reports/competency & /api/reports/competency-summary
const handleCompetencyReport = async (req, res, next) => {
  try {
    const rep = await reportService.getCompetencyReport();
    return res.json({
      success: true,
      data: {
        summary: rep,
        ...rep
      },
      summary: rep
    });
  } catch (err) {
    next(err);
  }
};
router.get('/competency', handleCompetencyReport);
router.get('/competency-summary', handleCompetencyReport);

// GET /api/reports/training & /api/reports/compliance
const getComplianceReport = async (req, res, next) => {
  try {
    const rep = await reportService.getTrainingComplianceReport();
    return successResponse(res, rep, "Training compliance report generated");
  } catch (err) {
    next(err);
  }
};
router.get('/training', getComplianceReport);
router.get('/compliance', getComplianceReport);

export default router;

