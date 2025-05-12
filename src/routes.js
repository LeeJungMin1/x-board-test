import { Router } from "express";
import deviceRoutes from "./api/device/device-routes.js";
import deviceUnitRoutes from "./api/device-unit/device-unit-routes.js";
import deviceCheckListRoutes from "./api/device-checklist/device-checklist-routes.js";
import qrCodeRoutes from "./api/qr-code/qr-code-routes.js";

const router = Router();

router.use("/devices", deviceRoutes);
router.use("/device-units", deviceUnitRoutes);
router.use("/device-checklists", deviceCheckListRoutes);
router.use("/qr-codes", qrCodeRoutes);

export default router;
