import logger from "../logger.js";

export class AppError extends Error {
  constructor(
    message,
    statusCode = 500,
    errorCode = "INTERNAL_ERROR",
    meta = {}
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.meta = meta;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (res, error) => {
  const statusCode = error.statusCode || 500;
  const errorCode = error.errorCode || "INTERNAL_ERROR";
  const message = error.message || "Internal Server Error";

  const logLevel = getLogLevel(statusCode);

  logger[logLevel](`${errorCode}: ${message}`, {
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

const getLogLevel = (statusCode) => {
  if (statusCode >= 500) return "error"; // 서버 내부 오류
  if (statusCode >= 400) return "warn"; // 클라이언트 요청 오류
  if (statusCode >= 300) return "info"; // 리다이렉션 등 참고용
  return "debug"; // 기타
};
