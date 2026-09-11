import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users[0];
  res.json({
    success: true,
    message: "Authenticated successfully via Parichay SSO",
    token: "jwt-mock-mospi-token-2026",
    user
  });
});

// GET /api/auth/profile
router.get('/profile', (req, res) => {
  res.json({ success: true, user: db.users[0] });
});

// PUT /api/auth/profile
router.put('/profile', (req, res) => {
  db.users[0] = { ...db.users[0], ...req.body };
  res.json({ success: true, message: "Profile updated successfully", user: db.users[0] });
});

export default router;
