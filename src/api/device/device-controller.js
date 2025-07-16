import * as DeviceService from "./device-service.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getDevices = async (req, res) => {
  const devices = await DeviceService.listDevices();
  return res.json({ deviceList: devices });
};

export const getDeviceDetail = async (req, res) => {
  const { device_id } = req.params;
  const device = await DeviceService.findDeviceDetail(device_id);

  if (!device) {
    throw new AppError(
      "디바이스를 찾을 수 없습니다.",
      404,
      "DEVICE_NOT_FOUND",
      { device_id }
    );
  }

  return res.json(device);
};

export const getAllDeviceDetails = async (req, res) => {
  const devices = await DeviceService.listAllDeviceDetails();
  return res.json({ deviceDetailList: devices });
};
