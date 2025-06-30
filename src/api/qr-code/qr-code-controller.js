import * as QRService from "./qr-code-service.js";

export const getAllQRView = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await QRService.getAllQRViewList(page, limit);
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const findDevicesByQRData = async (req, res) => {
  try {
    const { data } = req.query;
    if (!data)
      return res.status(400).json({ error: "QR 데이터가 필요합니다." });
    const result = await QRService.findDevicesByQRData(data);
    if (result.error) return res.status(404).json({ error: result.error });
    res.json({ devices: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateDevicesByQRData = async (req, res) => {
  try {
    const { data, devices } = req.body;
    if (!data || !devices)
      return res.status(400).json({ error: "data와 devices가 필요합니다." });
    const result = await QRService.updateDevicesByQRData(data, devices);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const createQRCodeEntry = async (req, res) => {
  try {
    const { data } = req.body;
    const result = await QRService.createQRCodeEntry(data);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteQRCodeByData = async (req, res) => {
  try {
    const { data } = req.params;

    const result = await QRService.deleteQRCodeByData(data);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
