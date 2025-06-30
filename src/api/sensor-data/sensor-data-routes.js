import { Router } from "express";
import {
  getSensorChartData,
  getSensorChartDataByDeviceId,
} from "./sensor-data-controller.js";

const router = Router();
router.get("/chart", getSensorChartData);
router.get("/chart2", getSensorChartDataByDeviceId);
export default router;
