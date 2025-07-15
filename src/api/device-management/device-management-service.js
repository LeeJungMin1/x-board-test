import * as maintenanceModel from "./device-management-model.js";
import { db } from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const fetchAdminDevices = async () => {
  try {
    return await maintenanceModel.getAllAdminDevices();
  } catch (error) {
    throw new AppError(
      `fetchAdminDevices 실패: ${error.message}`,
      500,
      "FETCH_ADMIN_DEVICES_FAILED"
    );
  }
};

export const createAdminDevice = async (deviceInfo) => {
  try {
    const { device_name, start_date, end_date, alarm_type } = deviceInfo;

    const itemId = uuidv4();

    const query = `
      INSERT INTO admin_device_info
      (item_id, device_name, start_date, end_date, alarm_type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [itemId, device_name, start_date, end_date, alarm_type];

    const result = await db.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw new AppError(
      `createAdminDevice 실패: ${error.message}`,
      500,
      "CREATE_ADMIN_DEVICE_FAILED"
    );
  }
};

export const updateAdminDevice = async (itemId, updateInfo) => {
  try {
    return await maintenanceModel.modifyAdminDevice(itemId, updateInfo);
  } catch (error) {
    throw new AppError(
      `updateAdminDevice 실패: ${error.message}`,
      500,
      "UPDATE_ADMIN_DEVICE_FAILED"
    );
  }
};

export const deleteAdminDevice = async (itemId) => {
  try {
    return await maintenanceModel.removeAdminDevice(itemId);
  } catch (error) {
    throw new AppError(
      `deleteAdminDevice 실패: ${error.message}`,
      500,
      "DELETE_ADMIN_DEVICE_FAILED"
    );
  }
};
