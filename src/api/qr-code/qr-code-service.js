import * as QRModel from "./qr-code-model.js";
import QRCode from "qrcode";
import { db } from "../../config/db.js";

export const createQRCodeEntry = async (data) => {
  const qrImage = await QRCode.toDataURL(data);
  await QRModel.insertQRCode(data, qrImage);
  return { data, qrImage };
};

export const findDevicesByQRData = async (data) => {
  const qrList = await QRModel.getAllQRCodes();
  const found = qrList.find((qr) => qr.data === data);
  if (!found) return { error: "해당 QR 데이터가 없습니다." };
  const deviceRows = await QRModel.selectDevicesByQRData(data);
  return deviceRows.map((row) => row.device_id);
};

export const updateDevicesByQRData = async (data, devices) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM qr_code_devices WHERE qr_data = $1", [
      data,
    ]);
    if (devices.length > 0) {
      const values = devices.map((_, i) => `($1, $${i + 2})`).join(",");
      await client.query(
        `INSERT INTO qr_code_devices (qr_data, device_id) VALUES ${values}`,
        [data, ...devices]
      );
    }
    await client.query("COMMIT");
    return { success: true };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const deleteQRCodeByData = async (data) => {
  return await QRModel.removeQRCode(data);
};
