import * as maintenanceService from "./maintenance-service.js";
import { validateMaintenancePayload } from "../../utils/validate-maintenance.js";
import { v4 as uuidv4 } from "uuid";
import { handleError } from "../../utils/common-utils/error-handler.js";

export const getMaintenanceHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const data = await maintenanceService.getMaintenanceHistoryGrouped(limit);
    res.status(200).json({ maintenanceReports: data });
  } catch (error) {
    return handleError(res, error, 500, "MAINTENANCE_HISTORY_FETCH_FAILED");
  }
};

export const getMaintenanceHistoryByDevice = async (req, res) => {
  const { deviceId } = req.params;
  const limit = parseInt(req.query.limit || "5");

  try {
    const data = await maintenanceService.fetchMaintenanceByDeviceId(
      deviceId,
      limit
    );

    console.log("controller result.rows =>", data);
    res.status(200).json({ CheckDetail: data });
  } catch (error) {
    return handleError(res, error, 500, "MAINTENANCE_BY_DEVICE_FETCH_FAILED");
  }
};

export const postSaveMaintenance = async (req, res) => {
  try {
    const payload = req.body;

    if (!validateMaintenancePayload(payload)) {
      return res.status(400).json({
        errorCode: "INVALID_PAYLOAD",
        message: "필수 값이 누락되었습니다.",
      });
    }

    const sessionId = uuidv4();

    await maintenanceService.saveMaintenanceRecords(sessionId, payload);

    return res
      .status(201)
      .json({ message: "점검 기록이 저장되었습니다.", session_id: sessionId });
  } catch (error) {
    return handleError(res, error, 500, "MAINTENANCE_SAVE_FAILED");
  }
};
