import * as UnitModel from "./device-unit-model.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const fetchAllDeviceUnits = async (page, limit) => {
  try {
    return await UnitModel.getAllDeviceUnits(page, limit);
  } catch (error) {
    throw new AppError(
      `fetchAllDeviceUnits 실패: ${error.message}`,
      500,
      "FETCH_ALL_DEVICE_UNITS_FAILED"
    );
  }
};

export const fetchDeviceUnit = async (unitId) => {
  try {
    return await UnitModel.getDeviceUnitById(unitId);
  } catch (error) {
    throw new AppError(
      `fetchDeviceUnit 실패: ${error.message}`,
      500,
      "FETCH_DEVICE_UNIT_FAILED"
    );
  }
};

export const registerDeviceUnit = async (data) => {
  try {
    return await UnitModel.createDeviceUnit(data);
  } catch (error) {
    throw new AppError(
      `registerDeviceUnit 실패: ${error.message}`,
      500,
      "REGISTER_DEVICE_UNIT_FAILED"
    );
  }
};

export const modifyDeviceUnit = async (unitId, data) => {
  try {
    return await UnitModel.updateDeviceUnit(unitId, data);
  } catch (error) {
    throw new AppError(
      `modifyDeviceUnit 실패: ${error.message}`,
      500,
      "MODIFY_DEVICE_UNIT_FAILED"
    );
  }
};

export const removeDeviceUnit = async (unitId) => {
  try {
    return await UnitModel.deleteDeviceUnit(unitId);
  } catch (error) {
    throw new AppError(
      `removeDeviceUnit 실패: ${error.message}`,
      500,
      "REMOVE_DEVICE_UNIT_FAILED"
    );
  }
};

export const findDeviceUnitsByDeviceId = async (deviceId) => {
  try {
    return await UnitModel.getDeviceUnitsByDeviceId(deviceId);
  } catch (error) {
    throw new AppError(
      `findDeviceUnitsByDeviceId 실패: ${error.message}`,
      500,
      "FIND_DEVICE_UNITS_BY_DEVICE_ID_FAILED"
    );
  }
};

export const findDeviceUnitByTelemetryKey = async (sensorType) => {
  try {
    return await UnitModel.getDeviceUnitBySensorType(sensorType);
  } catch (error) {
    throw new AppError(
      `findDeviceUnitByTelemetryKey 실패: ${error.message}`,
      500,
      "FIND_DEVICE_UNIT_BY_TELEMETRY_KEY_FAILED"
    );
  }
};
