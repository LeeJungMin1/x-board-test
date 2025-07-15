import logger from "../logger.js";

export class AppError extends Error {
  constructor(message, statusCode = 500, errorCode = "INTERNAL_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (
  res,
  error,
  statusCode = 500,
  errorCode = "INTERNAL_ERROR"
) => {
  const message = error.message || "Internal Server Error";

  logger.error(`${errorCode}: ${message}`, {
    stack: error.stack,
    ...(error.meta && { meta: error.meta }),
  });

  if (res) {
    return res.status(statusCode).json({
      errorCode,
      message,
    });
  }
};
