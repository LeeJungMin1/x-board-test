import { db } from "../../config/db.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getAllAdminDevices = async () => {
  try {
    const result = await db.query(`
      SELECT item_id, device_name, start_date, end_date, alarm_type
      FROM admin_device_info
      ORDER BY start_date DESC
    `);
    return result.rows;
  } catch (error) {
    throw new AppError(
      `getAllAdminDevices 실패: ${error.message}`,
      500,
      "GET_ALL_ADMIN_DEVICES_FAILED"
    );
  }
};

export const modifyAdminDevice = async (
  itemId,
  { device_name, start_date, end_date, alarm_type }
) => {
  try {
    const result = await db.query(
      `
      UPDATE admin_device_info
      SET device_name = $1, start_date = $2, end_date = $3, alarm_type = $4
      WHERE item_id = $5
      RETURNING *
    `,
      [device_name, start_date, end_date, alarm_type, itemId]
    );
    return result.rows[0];
  } catch (error) {
    throw new AppError(
      `modifyAdminDevice 실패: ${error.message}`,
      500,
      "MODIFY_ADMIN_DEVICE_FAILED"
    );
  }
};

export const removeAdminDevice = async (itemId) => {
  try {
    await db.query(`DELETE FROM admin_device_info WHERE item_id = $1`, [
      itemId,
    ]);
    return { message: "Device deleted successfully" };
  } catch (error) {
    throw new AppError(
      `removeAdminDevice 실패: ${error.message}`,
      500,
      "REMOVE_ADMIN_DEVICE_FAILED"
    );
  }
};
