import { Router } from "express";
import {
  getDeviceUnits,
  getDeviceUnit,
  createDeviceUnit,
  updateDeviceUnit,
  deleteDeviceUnit,
} from "./device-unit-controller.js";

const router = Router();

router.get("/:unit_id", getDeviceUnit);
router.get("/", getDeviceUnits);
router.post("/", createDeviceUnit);
router.put("/:unit_id", updateDeviceUnit);
router.delete("/:unit_id", deleteDeviceUnit);

export default router;
