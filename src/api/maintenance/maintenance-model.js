import { db } from "../../config/db.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getMaintenanceByDeviceId = async (deviceId, limit) => {
  try {
    const result = await db.query(
      `SELECT *
       FROM device_maintenance_detail
       WHERE device_id = $1
       ORDER BY time DESC
       LIMIT $2`,
      [deviceId, limit]
    );

    return result.rows;
  } catch (err) {
    throw new AppError(
      `getMaintenanceByDeviceId 실패: ${err.message}`,
      500,
      "GET_MAINTENANCE_BY_DEVICE_ID_FAILED"
    );
  }
};
