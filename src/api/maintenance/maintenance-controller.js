import * as maintenanceService from "./maintenance-service.js";
import { validateMaintenancePayload } from "../../utils/validate-maintenance.js";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getMaintenanceHistory = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const data = await maintenanceService.getMaintenanceHistoryGrouped(limit);
  res.status(200).json({ maintenanceReports: data });
};

export const getMaintenanceHistoryByDevice = async (req, res) => {
  const { deviceId } = req.params;
  const limit = parseInt(req.query.limit || "5");

  const data = await maintenanceService.fetchMaintenanceByDeviceId(
    deviceId,
    limit
  );

  res.status(200).json({ CheckDetail: data });
};

export const postSaveMaintenance = async (req, res) => {
  const payload = req.body;

  if (!validateMaintenancePayload(payload)) {
    throw new AppError("필수 값이 누락되었습니다.", 400, "INVALID_PAYLOAD", {
      payload,
    });
  }

  const sessionId = uuidv4();

  await maintenanceService.saveMaintenanceRecords(sessionId, payload);

  return res
    .status(201)
    .json({ message: "점검 기록이 저장되었습니다.", session_id: sessionId });
};
