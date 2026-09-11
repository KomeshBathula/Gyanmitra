import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// GET /api/courses
router.get('/', (req, res) => {
  const { provider, difficulty, recommended } = req.query;
  let filtered = [...db.courses];

  if (provider) {
    filtered = filtered.filter(c => c.providerType.toLowerCase() === provider.toLowerCase());
  }
  if (recommended === 'true') {
    filtered = filtered.filter(c => c.isRecommended);
  }

  res.json({ success: true, total: filtered.length, data: filtered });
});

export default router;
