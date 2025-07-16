import * as SensorService from "./sensor-data-service.js";
import {
  findDeviceUnitByTelemetryKey,
  findDeviceUnitsByDeviceId,
} from "../device-unit/device-unit-service.js";
import { findChartType } from "../device-checklist/device-checklist-service.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getSensorChartData = async (req, res) => {
  const { device_id, sensor_type, limit } = req.query;

  if (!device_id || !sensor_type) {
    throw new AppError(
      "device_id, sensor_type는 필수입니다.",
      400,
      "MISSING_PARAMETERS"
    );
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

  const chartType = await findChartType(device_id);

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
    data, // { temperature: [...], humidity: [...], ... }
  });
};

export const getSensorChartDataByDeviceId = async (req, res) => {
  const { device_id, limit } = req.query;

  if (!device_id) {
    throw new AppError("device_id 는 필수입니다.", 400, "MISSING_DEVICE_ID");
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
};

export const getSensorDataByDeviceId = async (req, res) => {
  const { device_id } = req.params;

  const data = await SensorService.fetchLatestSensorValuesFromRedis(device_id);

  if (!data) {
    throw new AppError("해당 디바이스 없음", 404, "DEVICE_NOT_FOUND", {
      device_id,
    });
  }

  res.json(data);
};
