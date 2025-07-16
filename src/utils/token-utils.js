import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
import { AppError } from "./common-utils/error-handler.js";

/**
 * 사용자 ID로 Access Token과 Refresh Token을 생성합니다.
 * @param {string} userId
 * @param {}
 * @returns {{ accessToken: string, refreshToken: string }}
 */
export const generateTokens = (userId, is_admin) => {
  const accessToken = jwt.sign({ userId, is_admin }, JWT_SECRET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign({ userId, is_admin }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

/**
 * 토큰을 검증하고 payload를 반환합니다.
 * @param {string} token
 * @returns {{ userId: string|number }}
 * @throws {Error} 토큰이 유효하지 않으면 예외 발생
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AppError(
      "유효하지 않은 refresh token 입니다.",
      403,
      "INVALID_REFRESH_TOKEN",
      { jwtError: err.message }
    );
  }
};
