import { Router } from "express";
import {
  findDevicesByQRData,
  updateDevicesByQRData,
  createQRCodeEntry,
  deleteQRCodeByData,
} from "./qr-code-controller.js";

const router = Router();

router.get("/devices", findDevicesByQRData);
router.post("/devices", updateDevicesByQRData);
router.post("/generate", createQRCodeEntry);
router.delete("/:data", deleteQRCodeByData);

export default router;
