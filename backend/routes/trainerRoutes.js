import express from 'express';

const router = express.Router();

router.get('/batch-summary', (req, res) => {
  res.json({
    success: true,
    batchName: "ISS Probationers Batch 2026",
    totalTrainees: 48,
    averageCompetency: "71.4%",
    activeLearners: 44,
    assessmentsCompleted: 156,
    topGaps: [
      { skill: "Python for Survey Automation", severity: "High", deficit: "64%" },
      { skill: "Machine Learning & Imputation", severity: "High", deficit: "58%" }
    ]
  });
});

export default router;
