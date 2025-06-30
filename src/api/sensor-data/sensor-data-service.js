import { fetchRecentSensorRows } from "./sensor-data-model.js";

export const getRecentSensorData = async (device_id, sensor_type, limit) => {
  console.log("sensor-data-service =", device_id, sensor_type, limit);
  return await fetchRecentSensorRows(device_id, sensor_type, limit);
};
