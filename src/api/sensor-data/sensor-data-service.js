import { db } from "../../config/db.js";
import { fetchRecentSensorRows } from "./sensor-data-model.js";
import { getLatestSensorValue } from "../../caches/latest-sensor-cache.js";

export const getRecentSensorData = async (device_id, sensor_type, limit) => {
  console.log("sensor-data-service =", device_id, sensor_type, limit);
  return await fetchRecentSensorRows(device_id, sensor_type, limit);
};

// Redis에서 센서 최신 값
export const fetchLatestSensorValuesFromRedis = async (device_id) => {
  console.log("device_id =>", device_id);
  const deviceQuery = `
    SELECT device_name
    FROM device
    WHERE device_id = $1
  `;
  const deviceRes = await db.query(deviceQuery, [device_id]);
  console.log("deviceRes => ", deviceRes);
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
};
