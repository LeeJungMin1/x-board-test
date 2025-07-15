import { db } from "../../config/db.js";
import { fetchRecentSensorRows } from "./sensor-data-model.js";
import { getLatestSensorValue } from "../../caches/latest-sensor-cache.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getRecentSensorData = async (device_id, sensor_type, limit) => {
  try {
    return await fetchRecentSensorRows(device_id, sensor_type, limit);
  } catch (error) {
    throw new AppError(
      `getRecentSensorData 실패: ${error.message}`,
      500,
      "GET_RECENT_SENSOR_DATA_FAILED"
    );
  }
};

// Redis에서 센서 최신 값
export const fetchLatestSensorValuesFromRedis = async (device_id) => {
  try {
    const deviceQuery = `
      SELECT device_name
      FROM device
      WHERE device_id = $1
    `;
    const deviceRes = await db.query(deviceQuery, [device_id]);
    if (deviceRes.rowCount === 0) return null;

    const deviceName = deviceRes.rows[0].device_name;

    const unitQuery = `
      SELECT telemetry_key, unit
      FROM device_unit
      WHERE device_id = $1
    `;
    const unitRes = await db.query(unitQuery, [device_id]);

    const values = await Promise.all(
      unitRes.rows.map(async ({ telemetry_key, unit }) => {
        const cached = await getLatestSensorValue(device_id, telemetry_key);

        return {
          key: telemetry_key,
          value: cached?.value ?? "N/A",
          unit,
        };
      })
    );

    return {
      name: deviceName,
      values,
    };
  } catch (error) {
    throw new AppError(
      `fetchLatestSensorValuesFromRedis 실패: ${error.message}`,
      500,
      "FETCH_LATEST_SENSOR_VALUES_FROM_REDIS_FAILED"
    );
  }
};
