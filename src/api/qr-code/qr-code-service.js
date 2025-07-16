import * as QRModel from "./qr-code-model.js";
import QRCode from "qrcode";
import { db } from "../../config/db.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getAllQRViewList = async (page, limit) => {
  try {
    return await QRModel.getAllQRCodesPaginated(page, limit);
  } catch (error) {
    throw new AppError(
      `getAllQRViewList 실패: ${error.message}`,
      500,
      "GET_ALL_QR_VIEW_LIST_FAILED"
    );
  }
};

export const createQRCodeEntry = async (data) => {
  try {
    const qrImage = await QRCode.toDataURL(data);
    await QRModel.insertQRCode(data, qrImage);
    return { data, qrImage };
  } catch (error) {
    throw new AppError(
      `createQRCodeEntry 실패: ${error.message}`,
      500,
      "CREATE_QR_CODE_ENTRY_FAILED"
    );
  }
};

export const findDevicesByQRData = async (data) => {
  try {
    const qrList = await QRModel.getAllQRCodes();
    const found = qrList.find((qr) => qr.data === data);
    if (!found) return { error: "해당 QR 데이터가 없습니다." };
    const deviceRows = await QRModel.selectDevicesByQRData(data);
    return deviceRows.map((row) => row.device_id);
  } catch (error) {
    throw new AppError(
      `findDevicesByQRData 실패: ${error.message}`,
      500,
      "FIND_DEVICES_BY_QR_DATA_FAILED"
    );
  }
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
    throw new AppError(
      `updateDevicesByQRData 실패: ${error.message}`,
      500,
      "UPDATE_DEVICES_BY_QR_DATA_FAILED"
    );
  } finally {
    client.release();
  }
};

export const deleteQRCodeByData = async (data) => {
  try {
    return await QRModel.removeQRCode(data);
  } catch (error) {
    throw new AppError(
      `deleteQRCodeByData 실패: ${error.message}`,
      500,
      "DELETE_QR_CODE_BY_DATA_FAILED"
    );
  }
};
