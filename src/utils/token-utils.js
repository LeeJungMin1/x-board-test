import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * 사용자 ID로 Access Token과 Refresh Token을 생성합니다.
 * @param {string} userId
 * @param {}
 * @returns {{ accessToken: string, refreshToken: string }}
 */
export const generateTokens = (userId, is_admin) => {
  const accessToken = jwt.sign({ userId, is_admin }, JWT_SECRET, {
    expiresIn: "15m",
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
  return jwt.verify(token, JWT_SECRET);
};
