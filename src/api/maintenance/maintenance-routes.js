import { Router } from "express";
import {
  getMaintenanceHistory,
  postSaveMaintenance,
  getMaintenanceHistoryByDevice,
} from "./maintenance-controller.js";
import { authenticateToken } from "../../middlewares/auth-middleware.js";

const router = Router();
router.get("/history", authenticateToken, getMaintenanceHistory);
router.post("/", authenticateToken, postSaveMaintenance);
router.get("/:deviceId", getMaintenanceHistoryByDevice);

export default router;
