import redisClient from "../config/redis.js";
const SENSOR_PREFIX = "sensor";

/**
 * Redis 키 생성: sensor:{deviceId}:{sensorType}
 */
const buildSensorKey = (deviceId, sensorType) => {
  return `${SENSOR_PREFIX}:${deviceId}:${sensorType}`;
};

/**
 * Redis에서 센서 최신값 1개 가져오기
 * @returns {Promise<{ value: number, timestamp: number } | null>}
 */
export const getLatestSensorValue = async (deviceId, sensorType) => {
  const key = buildSensorKey(deviceId, sensorType);
  const raw = await redisClient.lIndex(key, 0);
  return raw ? JSON.parse(raw) : null;
};

/**
 * Redis에서 센서 최근 N개 값 가져오기
 * @returns {Promise<Array<{ value: number, timestamp: number }>>}
 */
export const getRecentSensorValues = async (
  deviceId,
  sensorType,
  count = 20
) => {
  const key = buildSensorKey(deviceId, sensorType);
  const rawList = await redisClient.lRange(key, 0, count - 1);
  return rawList.map((item) => JSON.parse(item));
};
