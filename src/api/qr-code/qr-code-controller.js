import * as QRService from "./qr-code-service.js";
import { handleError } from "../../utils/common-utils/error-handler.js";

export const getAllQRView = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await QRService.getAllQRViewList(page, limit);
    res.json(result);
  } catch (error) {
    return handleError(res, error, 500, "QR_LIST_FETCH_FAILED");
  }
};

export const findDevicesByQRData = async (req, res) => {
  try {
    const { data } = req.query;

    if (!data) {
      return res.status(400).json({
        errorCode: "QR_DATA_REQUIRED",
        message: "QR 데이터가 필요합니다.",
      });
    }

    const result = await QRService.findDevicesByQRData(data);

    if (result.error) {
      return res.status(404).json({
        errorCode: "QR_DATA_NOT_FOUND",
        message: result.error,
      });
    }

    res.json({ devices: result });
  } catch (error) {
    return handleError(res, error, 500, "QR_DEVICE_FIND_FAILED");
  }
};

export const updateDevicesByQRData = async (req, res) => {
  try {
    const { data, devices } = req.body;

    if (!data || !devices) {
      return res.status(400).json({
        errorCode: "QR_UPDATE_INPUT_INVALID",
        message: "data와 devices가 필요합니다.",
      });
    }

    const result = await QRService.updateDevicesByQRData(data, devices);
    res.json(result);
  } catch (error) {
    return handleError(res, error, 500, "QR_DEVICE_UPDATE_FAILED");
  }
};

export const createQRCodeEntry = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        errorCode: "QR_CREATE_INPUT_REQUIRED",
        message: "data 값이 필요합니다.",
      });
    }

    const result = await QRService.createQRCodeEntry(data);
    res.json(result);
  } catch (error) {
    return handleError(res, error, 500, "QR_CREATE_FAILED");
  }
};

export const deleteQRCodeByData = async (req, res) => {
  try {
    const { data } = req.params;

    if (!data) {
      return res.status(400).json({
        errorCode: "QR_DELETE_INPUT_REQUIRED",
        message: "QR 데이터가 필요합니다.",
      });
    }

    await QRService.deleteQRCodeByData(data);
    res.json({ success: true });
  } catch (error) {
    return handleError(res, error, 500, "QR_DELETE_FAILED");
  }
};
