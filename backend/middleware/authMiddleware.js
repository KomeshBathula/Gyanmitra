import { config } from '../config/config.js';
import { errorResponse } from '../utils/response.js';
import { db } from '../data/db.js';

/**
 * Authentication Middleware (Phase 1 Prototype)
 * Handles token-based or mock session authentication.
 * In Phase 2/3, replace this with official NIC Parichay OAuth2 token validation.
 */
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // For prototype ease, allow requests without token to fall back to default active user,
  // or validate bearer token if provided.
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    
    // Prototype Token Validation
    if (token === 'invalid-token') {
      return errorResponse(res, "Invalid or expired session token", "Unauthorized", 401);
    }
  }

  // Attach active mock user to request context
  const user = db.users.find(u => u._id === config.defaultUser) || db.users[0];
  req.user = user;
  next();
};

/**
 * Optional strict authentication middleware for protected routes requiring valid token
 */
export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return errorResponse(res, "Authorization token is required", "Unauthorized", 401);
  }
  
  const token = authHeader.split(' ')[1];
  if (!token || token === 'invalid-token') {
    return errorResponse(res, "Invalid or expired session token", "Unauthorized", 401);
  }

  const user = db.users.find(u => u._id === config.defaultUser) || db.users[0];
  req.user = user;
  next();
};
