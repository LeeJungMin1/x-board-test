import { db } from "../../config/db.js";

export const getAllDevices = async () => {
  const sql = "SELECT * FROM device ORDER BY created_at DESC";
  const result = await db.query(sql);
  return result.rows;
};

export const getDeviceDetail = async (deviceId) => {
  const sql = `
    SELECT
      d.device_id,
      d.device_name,
      ds.group_name,
      ds.tag,
      ds.status,
      ds.index
    FROM
      device d
    LEFT JOIN
      device_state ds
    ON
      d.device_id = ds.device_id
    WHERE
      d.device_id = $1
  `;

  const result = await db.query(sql, [deviceId]);
  return result.rows[0] || null;
};

export const getAllDeviceDetails = async () => {
  const sql = `
    SELECT
      d.device_id,
      d.device_name,
      ds.group_name,
      ds.tag,
      ds.status,
      ds.index
    FROM
      device d
    LEFT JOIN
      device_state ds
    ON
      d.device_id = ds.device_id
    ORDER BY ds.index ASC NULLS LAST
  `;

  const result = await db.query(sql);
  return result.rows;
};
