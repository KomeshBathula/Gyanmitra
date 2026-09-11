import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, role } = req.body;
  const user = (role === 'trainer' || role === 'admin')
    ? db.users[1]
    : db.users[0];

  res.json({
    success: true,
    message: "Authenticated successfully via Parichay SSO / iGOT Bharat Gateway",
    token: "jwt-igot-karmayogi-token-2026",
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
  res.json({
    success: true,
    message: "Profile updated successfully in Karmayogi Service Ledger",
    user: db.users[0]
  });
});

// GET /api/auth/notifications
router.get('/notifications', (req, res) => {
  res.json({ success: true, count: db.notifications.length, data: db.notifications });
});

export default router;
