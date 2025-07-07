import { Router } from "express";
import { getPdfBySessionId } from "./pdf-controller.js";
import { authenticateToken } from "../../middlewares/auth-middleware.js";

const router = Router();
router.get("/:sessionId", getPdfBySessionId);

export default router;
