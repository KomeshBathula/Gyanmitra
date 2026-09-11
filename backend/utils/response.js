/**
 * Standard API Response Utilities for GyanMitra
 */

export const successResponse = (res, data = {}, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

export const errorResponse = (res, message = "Internal Server Error", error = null, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error?.message || error || "An unexpected error occurred",
    timestamp: new Date().toISOString()
  });
};

export const paginationResponse = (res, data = [], total = 0, page = 1, limit = 10, message = "Success") => {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    },
    timestamp: new Date().toISOString()
  });
};
