import * as authService from "./auth-service.js";
import { NODE_ENV } from "../../config/config.js";
import { generateTokens, verifyToken } from "../../utils/token-utils.js";

export const postLogin = async (req, res) => {
  const { uid } = req.body;

  if (!uid) return res.status(400).json({ error: "uid는 필수입니다." });

  const user = await authService.findUserByUid(uid);

  if (!user) return res.status(404).json({ error: "존재하지 않는 uid" });

  const { accessToken, refreshToken } = generateTokens(user.uid, user.is_admin);

  const isWeb = req.headers["user-agent"]?.includes("Mozilla");

  if (isWeb) {
    const isProduction = NODE_ENV === "production";
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

export const postRefreshToken = (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!token) {
    return res
      .status(401)
      .json({ message: "refresh token이 존재하지 않습니다." });
  }

  try {
    const decoded = verifyToken(token);
    const { accessToken } = generateTokens(decoded.userId);
    return res.json({ accessToken });
  } catch {
    return res
      .status(403)
      .json({ message: "허용되지 않는 refresh token 입니다." });
  }
};
