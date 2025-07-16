import * as authService from "./auth-service.js";
import { NODE_ENV } from "../../config/config.js";
import { generateTokens, verifyToken } from "../../utils/token-utils.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const postLogin = async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    throw new AppError("uid는 필수입니다.", 400, "UID_REQUIRED");
  }

  const user = await authService.findUserByUid(uid);

  if (!user) {
    throw new AppError("존재하지 않는 uid", 404, "USER_NOT_FOUND", { uid });
  }

  const { accessToken, refreshToken } = generateTokens(user.uid, user.is_admin);

  const isWeb = req.headers["user-agent"]?.includes("Mozilla");
  const isProduction = NODE_ENV === "production";

  if (isWeb) {
    // 🌐 웹: Refresh Token을 HttpOnly 쿠키로 저장
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "Strinc" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일 동안 유효
    });
    return res.json({ accessToken });
  } else {
    // 📱 앱: Refresh Token도 JSON으로 반환
    return res.json({ accessToken, refreshToken });
  }
};

export const postRefreshToken = async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!token) {
    throw new AppError(
      "refresh token이 존재하지 않습니다.",
      401,
      "REFRESH_TOKEN_REQUIRED"
    );
  }
  const decoded = verifyToken(token);
  const { accessToken } = generateTokens(decoded.userId);
  return res.json({ accessToken });
};
