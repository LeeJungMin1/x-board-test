import * as UnitModel from "./device-unit-model.js";

export const fetchAllDeviceUnits = async (page, limit) => {
  return await UnitModel.getAllDeviceUnits(page, limit);
};

export const fetchDeviceUnit = async (unitId) => {
  return await UnitModel.getDeviceUnitById(unitId);
};

export const registerDeviceUnit = async (data) => {
  return await UnitModel.createDeviceUnit(data);
};

export const modifyDeviceUnit = async (unitId, data) => {
  return await UnitModel.updateDeviceUnit(unitId, data);
};

export const removeDeviceUnit = async (unitId) => {
  return await UnitModel.deleteDeviceUnit(unitId);
};

export const findDeviceUnitsByDeviceId = async (deviceId) => {
  return await UnitModel.getDeviceUnitsByDeviceId(deviceId);
};
