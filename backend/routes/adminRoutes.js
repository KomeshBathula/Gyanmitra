import express from 'express';
import { db } from '../data/db.js';
import { successResponse } from '../utils/response.js';

const router = express.Router();

// GET /api/admin/dashboard & /api/admin/workforce-intelligence
const getAdminDashboard = (req, res) => {
  return res.json({
    success: true,
    data: db.adminWorkforceData,
    ...db.adminWorkforceData
  });
};
router.get('/dashboard', getAdminDashboard);
router.get('/workforce-intelligence', getAdminDashboard);

// GET /api/admin/workforce-competency
router.get('/workforce-competency', (req, res) => {
  return successResponse(
    res,
    {
      avgCompetencyScore: db.adminWorkforceData.avgCompetencyScore,
      highPriorityGaps: db.adminWorkforceData.highPriorityGapsCount,
      divisionMetrics: db.adminWorkforceData.divisionMetrics
    },
    "Workforce competency breakdown"
  );
});

// GET /api/admin/training-compliance
router.get('/training-compliance', (req, res) => {
  return successResponse(
    res,
    {
      totalEmployees: db.adminWorkforceData.totalEmployeesTracked,
      complianceRate: db.adminWorkforceData.complianceRate,
      completedTrainingHours: db.adminWorkforceData.completedTrainingHours
    },
    "Training compliance metrics"
  );
});

export default router;
