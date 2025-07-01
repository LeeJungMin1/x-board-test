import { Router } from "express";
import { postLogin, postRefreshToken } from "./auth-controller.js";

const router = Router();
router.post("/", postLogin);

// Refresh Token으로 Access Token 재발급
router.post("/refresh-token", postRefreshToken);

export default router;
