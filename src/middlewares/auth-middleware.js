import { verifyToken } from "../utils/token-utils.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Authorization: Bearer <token>
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token 없이 요청할 수 없는 API 입니다." });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload; // 이후 req.user.userId 등으로 접근 가능
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "유효하지 않거나 만료된 엑세스 토큰입니다." });
  }
};
