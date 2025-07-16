import * as QRService from "./qr-code-service.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getAllQRView = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const result = await QRService.getAllQRViewList(page, limit);
  res.json(result);
};

export const findDevicesByQRData = async (req, res) => {
  const { data } = req.query;

  if (!data) {
    throw new AppError("QR 데이터가 필요합니다.", 400, "QR_DATA_REQUIRED");
  }

  const result = await QRService.findDevicesByQRData(data);

  if (result?.error) {
    throw new AppError(result.error, 404, "QR_DATA_NOT_FOUND", { data });
  }

  res.json({ devices: result });
};

export const updateDevicesByQRData = async (req, res) => {
  const { data, devices } = req.body;

  if (!data || !devices) {
    throw new AppError(
      "data와 devices가 필요합니다.",
      400,
      "QR_UPDATE_INPUT_INVALID",
      { data, devices }
    );
  }

  const result = await QRService.updateDevicesByQRData(data, devices);
  res.json(result);
};

export const createQRCodeEntry = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    throw new AppError(
      "data 값이 필요합니다.",
      400,
      "QR_CREATE_INPUT_REQUIRED"
    );
  }

  const result = await QRService.createQRCodeEntry(data);
  res.json(result);
};

export const deleteQRCodeByData = async (req, res) => {
  const { data } = req.params;

  if (!data) {
    throw new AppError(
      "QR 데이터가 필요합니다.",
      400,
      "QR_DELETE_INPUT_REQUIRED"
    );
  }

  await QRService.deleteQRCodeByData(data);
  res.json({ success: true });
};
