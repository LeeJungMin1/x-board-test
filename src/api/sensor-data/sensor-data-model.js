import { db } from "../../config/db.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const fetchRecentSensorRows = async (device_id, sensor_types, limit) => {
  try {
    const result = {};

    for (const sensor_type of sensor_types) {
      const sql = `
        SELECT value, received_at
        FROM sensor_data
        WHERE device_id = $1 AND sensor_type = $2
        ORDER BY received_at DESC
        LIMIT $3
      `;

      const res = await db.query(sql, [device_id, sensor_type, limit]);
      result[sensor_type] = res.rows
        .map((row) => ({
          value: parseFloat(row.value),
          time: row.received_at,
        }))
        .reverse();
    }

    return result;
  } catch (error) {
    throw new AppError(
      `fetchRecentSensorRows 실패: ${error.message}`,
      500,
      "FETCH_RECENT_SENSOR_ROWS_FAILED"
    );
  }
};
