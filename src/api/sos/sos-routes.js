import { Router } from "express";
import { postSosNotification } from "./sos-controller.js";
import { authenticateToken } from "../../middlewares/auth-middleware.js";

const router = Router();
router.post("/", authenticateToken, postSosNotification);

export default router;
