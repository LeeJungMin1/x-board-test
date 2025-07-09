export const handleError = (
  res,
  error,
  statusCode = 500,
  errorCode = "INTERNAL_SERVER_ERROR"
) => {
  console.error("❌", error);
  return res.status(statusCode).json({
    errorCode,
    message: error?.message || "Internal Server Error",
  });
};
