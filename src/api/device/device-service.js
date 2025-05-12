import {
  getAllDevices,
  getDeviceDetail,
  getAllDeviceDetails,
} from "./device-model.js";

export const listDevices = async () => {
  return await getAllDevices();
};

export const findDeviceDetail = async (deviceId) => {
  return await getDeviceDetail(deviceId);
};

export const listAllDeviceDetails = async () => {
  return await getAllDeviceDetails();
};
