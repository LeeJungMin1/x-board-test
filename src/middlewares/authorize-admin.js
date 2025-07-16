import { AppError } from "../utils/common-utils/error-handler.js";

export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.is_admin !== true) {
    throw new AppError("관리자 권한이 필요합니다.", 403, "ADMIN_ONLY");
  }
  next();
};
