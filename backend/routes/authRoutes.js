import express from 'express';
import { authService } from '../services/authService.js';
import { notificationService } from '../services/notificationService.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/auth/login - Parichay SSO / iGOT Mock Auth
router.post('/login', async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const authResult = await authService.login({ email, role });
    return successResponse(res, authResult, "Authenticated successfully via Parichay SSO / iGOT Bharat Gateway");
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me - Current Authenticated User
router.get('/me', authMiddleware, async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user?._id);
    return successResponse(res, user, "Current user retrieved");
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/profile - Direct profile endpoint
router.get('/profile', authMiddleware, async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user?._id);
    return res.json({ success: true, user, data: user });
  } catch (err) {
    next(err);
  }
});

// PUT /api/auth/profile - Update profile details
router.put('/profile', authMiddleware, async (req, res, next) => {
  try {
    const updated = await authService.updateProfile(req.user?._id, req.body);
    return res.json({
      success: true,
      message: "Profile updated successfully in Karmayogi Service Ledger",
      user: updated,
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/notifications - User notification feed
router.get('/notifications', async (req, res, next) => {
  try {
    const notifs = await notificationService.getNotifications();
    return res.json({ success: true, count: notifs.length, data: notifs });
  } catch (err) {
    next(err);
  }
});

export default router;
