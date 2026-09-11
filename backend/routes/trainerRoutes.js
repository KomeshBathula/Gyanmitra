import express from 'express';
import { db } from '../data/db.js';
import { successResponse } from '../utils/response.js';

const router = express.Router();

// GET /api/trainer/dashboard & /api/trainer/batch-summary
const getTrainerDashboard = (req, res) => {
  return res.json({
    success: true,
    data: db.trainerBatchData,
    ...db.trainerBatchData
  });
};
router.get('/dashboard', getTrainerDashboard);
router.get('/batch-summary', getTrainerDashboard);

// GET /api/trainer/batches
router.get('/batches', (req, res) => {
  return successResponse(res, db.trainerBatchData.activeBatches, "Trainer batches");
});

// GET /api/trainer/attendance
router.get('/attendance', (req, res) => {
  const attendance = db.trainerBatchData.activeBatches.map(b => ({
    batchId: b.id,
    batchName: b.name,
    attendanceRate: b.attendanceRate,
    learnersCount: b.learnersCount
  }));
  return successResponse(res, attendance, "Batch attendance records");
});

// GET /api/trainer/assessment-metrics
router.get('/assessment-metrics', (req, res) => {
  const metrics = db.trainerBatchData.activeBatches.map(b => ({
    batchId: b.id,
    batchName: b.name,
    avgScore: b.avgCompetencyScore,
    pendingAssessments: b.pendingAssessments
  }));
  return successResponse(res, metrics, "Cohort assessment metrics");
});

export default router;
