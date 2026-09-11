import express from 'express';
import { db } from '../data/db.js';
import { successResponse } from '../utils/response.js';

const router = express.Router();

// GET /api/admin/metrics, /api/admin/dashboard & /api/admin/workforce-intelligence
const getAdminDashboard = (req, res) => {
  const data = {
    ...db.adminWorkforceData,
    totalEmployees: db.adminWorkforceData.totalEmployeesTracked
  };
  return res.json({
    success: true,
    data,
    ...data
  });
};
router.get('/', getAdminDashboard);
router.get('/metrics', getAdminDashboard);
router.get('/dashboard', getAdminDashboard);
router.get('/workforce-intelligence', getAdminDashboard);

// GET /api/admin/users - User directory
router.get('/users', (req, res) => {
  const sanitizedUsers = db.users.map(({ ...u }) => u);
  return successResponse(res, sanitizedUsers, "All registered government users");
});

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

