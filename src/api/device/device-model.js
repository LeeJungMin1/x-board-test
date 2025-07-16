import { db } from "../../config/db.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getAllDevices = async () => {
  try {
    const sql = "SELECT * FROM device ORDER BY created_at DESC";
    const result = await db.query(sql);
    return result.rows;
  } catch (error) {
    throw new AppError(
      `getAllDevices 실패: ${error.message}`,
      500,
      "GET_ALL_DEVICES_FAILED"
    );
  }
};

export const getDeviceDetail = async (deviceId) => {
  try {
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
  } catch (error) {
    throw new AppError(
      `getDeviceDetail 실패: ${error.message}`,
      500,
      "GET_DEVICE_DETAIL_FAILED"
    );
  }
};

export const getAllDeviceDetails = async () => {
  try {
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
  } catch (error) {
    throw new AppError(
      `getAllDeviceDetails 실패: ${error.message}`,
      500,
      "GET_ALL_DEVICE_DETAILS_FAILED"
    );
  }
};

export const getDeviceNameById = async (deviceId) => {
  try {
    const sql = `
      SELECT
        device_name
      FROM
        device
      WHERE device_id=$1
    `;

    const result = await db.query(sql, [deviceId]);
    return result.rows[0];
  } catch (error) {
    throw new AppError(
      `getDeviceNameById 실패: ${error.message}`,
      500,
      "GET_DEVICE_NAME_BY_ID_FAILED"
    );
  }
};
