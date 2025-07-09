import * as SensorService from "./sensor-data-service.js";
import {
  findDeviceUnitByTelemetryKey,
  findDeviceUnitsByDeviceId,
} from "../device-unit/device-unit-service.js";
import { findChartType } from "../device-checklist/device-checklist-service.js";
import { handleError } from "../../utils/common-utils/error-handler.js";

export const getSensorChartData = async (req, res) => {
  try {
    const { device_id, sensor_type, limit } = req.query;

    if (!device_id || !sensor_type) {
      return res.status(400).json({
        errorCode: "MISSING_PARAMETERS",
        message: "device_id, sensor_type는 필수입니다.",
      });
    }

    // sensor_type이 문자열이든 배열이든 처리 가능하도록 변환
    const sensorTypes = Array.isArray(sensor_type)
      ? sensor_type
      : sensor_type.split(",");

    const count = parseInt(limit) || 10;

    // 각각의 단위 가져오기
    const unitTypeList = await Promise.all(
      sensorTypes.map((type) => findDeviceUnitByTelemetryKey(type))
    );

    console.log("unitTypeList =>", unitTypeList);

    const chartType = await findChartType(device_id);

    const data = await SensorService.getRecentSensorData(
      device_id,
      sensorTypes,
      count
    );

    console.log("data =>", data);

    res.json({
      device_id,
      sensor_types: sensorTypes,
      units: unitTypeList.map((u) => u.unit),
      chartType: chartType.chart_type,
      data, // { temperature: [...], humidity: [...], ... }
    });
  } catch (error) {
    return handleError(res, error, 500, "SENSOR_CHART_DATA_FAILED");
  }
};

export const getSensorChartDataByDeviceId = async (req, res) => {
  try {
    const { device_id, limit } = req.query;

    if (!device_id) {
      return res.status(400).json({
        errorCode: "MISSING_DEVICE_ID",
        message: "device_id 는 필수입니다.",
      });
    }

    const deviceUnits = await findDeviceUnitsByDeviceId(device_id);
    const sensorTypes = deviceUnits.map((s) => s.telemetry_key);
    const chartType = await findChartType(device_id);

    // 각각의 단위 가져오기
    const unitTypeList = await Promise.all(
      sensorTypes.map((type) => findDeviceUnitByTelemetryKey(type))
    );

    const count = parseInt(limit) || 10;
    const data = await SensorService.getRecentSensorData(
      device_id,
      sensorTypes,
      count
    );

    res.json({
      device_id,
      sensor_types: sensorTypes,
      units: unitTypeList.map((u) => u.unit),
      chartType: chartType.chart_type,
      data, // { wind_speed: [...], temperature: [...], ... }
    });
  } catch (error) {
    return handleError(res, error, 500, "SENSOR_CHART_DATA_BY_DEVICE_FAILED");
  }
};

export const getSensorDataByDeviceId = async (req, res) => {
  const { device_id } = req.params;

  try {
    const data = await SensorService.fetchLatestSensorValuesFromRedis(
      device_id
    );

    if (!data) {
      return res.status(404).json({
        errorCode: "DEVICE_NOT_FOUND",
        message: "해당 디바이스 없음",
      });
    }

    res.json(data);
  } catch (error) {
    return handleError(res, error, 500, "SENSOR_DATA_REDIS_FAILED");
  }
};
