import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// GET /api/competencies/overview
router.get('/overview', (req, res) => {
  res.json({ success: true, data: db.competencies });
});

// GET /api/competencies/skill-gaps
router.get('/skill-gaps', (req, res) => {
  res.json({ success: true, data: db.skillGaps });
});

// GET /api/competencies/learning-path
router.get('/learning-path', (req, res) => {
  res.json({ success: true, data: db.learningPathway });
});

// POST /api/competencies/update-from-assessment
router.post('/update-from-assessment', (req, res) => {
  const { scorePercentage, competencyImpacted } = req.body;

  // Closed-loop competency update logic
  db.competencies.overallScore = Math.min(100, db.competencies.overallScore + (scorePercentage >= 70 ? 4 : 1));
  db.competencies.monthlyDelta = "+12%";

  // Update specific skill gap
  const gapIndex = db.skillGaps.findIndex(g => g.id === 'gap-1');
  if (gapIndex !== -1) {
    db.skillGaps[gapIndex].currentLevel = Math.min(4, db.skillGaps[gapIndex].currentLevel + 1);
    db.skillGaps[gapIndex].gap = Math.max(0, db.skillGaps[gapIndex].requiredLevel - db.skillGaps[gapIndex].currentLevel);
    if (db.skillGaps[gapIndex].gap === 0) {
      db.skillGaps[gapIndex].priority = "Completed";
    }
  }

  res.json({
    success: true,
    message: "Competency ledger updated successfully",
    updatedOverview: db.competencies,
    updatedGaps: db.skillGaps
  });
});

export default router;
