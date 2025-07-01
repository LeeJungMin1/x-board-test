import { Router } from "express";
import deviceRoutes from "./api/device/device-routes.js";
import deviceUnitRoutes from "./api/device-unit/device-unit-routes.js";
import deviceCheckListRoutes from "./api/device-checklist/device-checklist-routes.js";
import qrCodeRoutes from "./api/qr-code/qr-code-routes.js";
import sensorDataRoutes from "./api/sensor-data/sensor-data-routes.js";
import userRoutes from "./api/user/user-routes.js";
import authRoutes from "./api/auth/auth-routes.js";

const router = Router();

router.use("/devices", deviceRoutes);
router.use("/device-units", deviceUnitRoutes);
router.use("/device-checklists", deviceCheckListRoutes);
router.use("/qr-codes", qrCodeRoutes);
router.use("/sensor-data", sensorDataRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
