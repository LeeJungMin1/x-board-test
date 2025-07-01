import { Router } from "express";
import {
  getSensorChartData,
  getSensorChartDataByDeviceId,
  getSensorDataByDeviceId,
} from "./sensor-data-controller.js";

const router = Router();
router.get("/chart", getSensorChartData);
router.get("/chart2", getSensorChartDataByDeviceId);
router.get("/:device_id", getSensorDataByDeviceId);
export default router;
