import { db } from "../../config/db.js";

export const getAllAdminDevices = async () => {
  const result = await db.query(`
    SELECT item_id, device_name, start_date, end_date, alarm_type
    FROM admin_device_info
    ORDER BY start_date DESC
  `);
  return result.rows;
};

export const modifyAdminDevice = async (
  itemId,
  { device_name, start_date, end_date, alarm_type }
) => {
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
};

export const removeAdminDevice = async (itemId) => {
  await db.query(`DELETE FROM admin_device_info WHERE item_id = $1`, [itemId]);
  return { message: "Device deleted successfully" };
};
