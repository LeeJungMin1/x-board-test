import * as DeviceService from "./device-service.js";
import { handleError } from "../../utils/common-utils/error-handler.js";

export const getDevices = async (req, res) => {
  try {
    const devices = await DeviceService.listDevices();
    return res.json({ deviceList: devices });
  } catch (error) {
    return handleError(res, error, 500, "DEVICE_LIST_FAILED");
  }
};

export const getDeviceDetail = async (req, res) => {
  try {
    const { device_id } = req.params;
    const device = await DeviceService.findDeviceDetail(device_id);

    if (!device) {
      return res.status(404).json({
        errorCode: "DEVICE_NOT_FOUND",
        message: "Device not found",
      });
    }

    return res.json(device);
  } catch (error) {
    return handleError(res, error, 500, "DEVICE_DETAIL_FAILED");
  }
};

export const getAllDeviceDetails = async (req, res) => {
  try {
    const devices = await DeviceService.listAllDeviceDetails();
    return res.json({ deviceDetailList: devices });
  } catch (error) {
    return handleError(res, error, 500, "DEVICE_DETAIL_LIST_FAILED");
  }
};
