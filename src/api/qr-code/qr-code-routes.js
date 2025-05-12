import { Router } from "express";
import {
  findDevicesByQRData,
  updateDevicesByQRData,
  createQRCodeEntry,
  deleteQRCodeByData,
  getAllQRView,
} from "./qr-code-controller.js";

const router = Router();

router.get("/devices", findDevicesByQRData);
router.post("/devices", updateDevicesByQRData);
router.post("/generate", createQRCodeEntry);
router.delete("/:data", deleteQRCodeByData);

router.get("/view", getAllQRView); // View 조회
export default router;
