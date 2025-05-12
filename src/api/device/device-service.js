import * as DeviceModel from "./device-model.js";

export const listDevices = async () => {
  return await DeviceModel.getAllDevices();
};

export const findDeviceDetail = async (deviceId) => {
  return await DeviceModel.getDeviceDetail(deviceId);
};

export const listAllDeviceDetails = async () => {
  return await DeviceModel.getAllDeviceDetails();
};
