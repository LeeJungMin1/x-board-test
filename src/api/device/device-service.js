import * as DeviceModel from "./device-model.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const listDevices = async () => {
  try {
    return await DeviceModel.getAllDevices();
  } catch (error) {
    throw new AppError(
      `listDevices 실패: ${error.message}`,
      500,
      "LIST_DEVICES_FAILED"
    );
  }
};

export const findDeviceDetail = async (deviceId) => {
  try {
    return await DeviceModel.getDeviceDetail(deviceId);
  } catch (error) {
    throw new AppError(
      `findDeviceDetail 실패: ${error.message}`,
      500,
      "FIND_DEVICE_DETAIL_FAILED"
    );
  }
};

export const listAllDeviceDetails = async () => {
  try {
    return await DeviceModel.getAllDeviceDetails();
  } catch (error) {
    throw new AppError(
      `listAllDeviceDetails 실패: ${error.message}`,
      500,
      "LIST_ALL_DEVICE_DETAILS_FAILED"
    );
  }
};
