import { errorResponse } from '../utils/response.js';

/**
 * Global Error Handling Middleware
 */
export const errorMiddleware = (err, req, res, next) => {
  console.error(`[GyanMitra Error Handler] ${req.method} ${req.url}:`, err);
  
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "An unexpected internal server error occurred.";

  return errorResponse(res, message, err.stack, statusCode);
};

/**
 * 404 Route Not Found Middleware
 */
export const notFoundMiddleware = (req, res) => {
  return errorResponse(res, `Route '${req.method} ${req.originalUrl}' not found.`, "Not Found", 404);
};
