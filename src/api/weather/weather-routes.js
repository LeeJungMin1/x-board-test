import { Router } from "express";
import { getWeatherInfo } from "./weather-controller.js";
import { authenticateToken } from "../../middlewares/auth-middleware.js";

const router = Router();
router.get("/", authenticateToken, getWeatherInfo);

export default router;
