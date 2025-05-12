import { Router } from "express";
import {
  getDevices,
  getDeviceDetail,
  getAllDeviceDetails,
} from "./device-controller.js";

const router = Router();

router.get("/list", getAllDeviceDetails);
router.get("/:device_id", getDeviceDetail);
router.get("/", getDevices);

export default router;
