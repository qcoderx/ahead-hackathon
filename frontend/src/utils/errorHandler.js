/**
 * Error handling utilities for API errors
 */

export class AppError extends Error {
  constructor(message, type = "general", details = null) {
    super(message);
    this.name = "AppError";
    this.type = type;
    this.details = details;
  }
}

/**
 * Get user-friendly error message
 * @param {Error} error - The error object
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  if (!error) return "An unknown error occurred";

  // API errors
  if (error.status) {
    switch (error.status) {
      case 400:
        return (
          error.data?.message || "Invalid request. Please check your input."
        );
      case 401:
        return "You need to log in to access this resource.";
      case 403:
        return "You don't have permission to access this resource.";
      case 404:
        return "The requested resource was not found.";
      case 409:
        return error.data?.message || "This resource already exists.";
      case 422:
        return (
          error.data?.message || "Validation error. Please check your input."
        );
      case 500:
        return "Server error. Please try again later.";
      case 503:
        return "Service temporarily unavailable. Please try again later.";
      default:
        return error.message || "An error occurred. Please try again.";
    }
  }

  // Network errors
  if (error.message?.includes("Network") || error.message?.includes("fetch")) {
    return "Network error. Please check your internet connection.";
  }

  // Generic error
  return error.message || "An unexpected error occurred.";
};

/**
 * Log error for debugging (can be extended to send to error tracking service)
 * @param {Error} error - The error object
 * @param {string} context - Context where the error occurred
 */
export const logError = (error, context = "") => {
  if (process.env.NODE_ENV === "development") {
    console.error(`[Error${context ? ` in ${context}` : ""}]:`, error);
  }

  // TODO: Send to error tracking service (e.g., Sentry) in production
  // if (process.env.NODE_ENV === "production") {
  //   Sentry.captureException(error, { tags: { context } });
  // }
};

/**
 * Handle API error and return user-friendly message
 * @param {Error} error - The error object
 * @param {string} context - Context where the error occurred
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error, context = "") => {
  logError(error, context);
  return getErrorMessage(error);
};

export default {
  AppError,
  getErrorMessage,
  logError,
  handleApiError,
};
