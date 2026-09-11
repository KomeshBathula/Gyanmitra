import express from 'express';
import { notificationService } from '../services/notificationService.js';
import { successResponse, errorResponse } from '../utils/response.js';

const router = express.Router();

// GET /api/notifications - List all notifications
router.get('/', async (req, res, next) => {
  try {
    const list = await notificationService.getNotifications();
    return successResponse(res, list, "Notifications retrieved");
  } catch (err) {
    next(err);
  }
});

// PUT /api/notifications/:id/read - Mark notification as read
router.put('/:id/read', async (req, res, next) => {
  try {
    const updated = await notificationService.markAsRead(req.params.id);
    if (!updated) {
      return errorResponse(res, "Notification not found", "Not Found", 404);
    }
    return successResponse(res, updated, "Notification marked as read");
  } catch (err) {
    next(err);
  }
});

export default router;
