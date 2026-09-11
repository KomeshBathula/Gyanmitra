import { errorResponse } from '../utils/response.js';

/**
 * Role-based Authorization Middleware
 * Enforces access permissions for: EMPLOYEE, TRAINER, ADMIN
 */
export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = (req.user?.role || 'employee').toLowerCase();
    const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());

    if (!normalizedAllowed.includes(userRole)) {
      return errorResponse(
        res,
        `Access denied. Your role '${req.user?.role}' does not have sufficient permissions for this resource.`,
        "Forbidden",
        403
      );
    }

    next();
  };
};
