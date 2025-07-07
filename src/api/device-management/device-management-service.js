import * as maintenanceModel from "./device-management-model.js";
import { db } from "../../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const fetchAdminDevices = async () => {
  return await maintenanceModel.getAllAdminDevices();
};

export const createAdminDevice = async (deviceInfo) => {
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
};

export const updateAdminDevice = async (itemId, updateInfo) => {
  return await maintenanceModel.modifyAdminDevice(itemId, updateInfo);
};

export const deleteAdminDevice = async (itemId) => {
  return await maintenanceModel.removeAdminDevice(itemId);
};
