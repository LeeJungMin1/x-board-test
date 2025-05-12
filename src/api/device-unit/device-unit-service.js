import {
  getAllDeviceUnits,
  getDeviceUnitById,
  createDeviceUnit,
  updateDeviceUnit,
  deleteDeviceUnit,
  getDeviceUnitsByDeviceId,
} from "./device-unit-model.js";

export const fetchAllDeviceUnits = async () => {
  return await getAllDeviceUnits();
};

export const fetchDeviceUnit = async (unitId) => {
  return await getDeviceUnitById(unitId);
};

export const registerDeviceUnit = async (data) => {
  return await createDeviceUnit(data);
};

export const modifyDeviceUnit = async (unitId, data) => {
  return await updateDeviceUnit(unitId, data);
};

export const removeDeviceUnit = async (unitId) => {
  return await deleteDeviceUnit(unitId);
};

export const findDeviceUnitsByDeviceId = async (deviceId) => {
  return await getDeviceUnitsByDeviceId(deviceId);
};
