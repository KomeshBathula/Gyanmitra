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

  // Closed-loop competency ledger calculation
  const scoreDelta = scorePercentage >= 70 ? 4 : 1;
  db.competencies.overallScore = Math.min(100, db.competencies.overallScore + scoreDelta);
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

  // Also update user's karma points in profile
  if (db.users[0]) {
    db.users[0].karmayogiCredits = (db.users[0].karmayogiCredits || 799) + (scorePercentage >= 70 ? 50 : 20);
  }

  res.json({
    success: true,
    message: "Competency ledger and Karma Points updated successfully",
    updatedOverview: db.competencies,
    updatedGaps: db.skillGaps,
    userCredits: db.users[0]?.karmayogiCredits
  });
});

export default router;
