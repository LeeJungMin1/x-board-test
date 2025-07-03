import { db } from "../../config/db.js";

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
    throw new Error(`DB Error: ${err.message}`);
  }
};
