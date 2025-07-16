import { db } from "../../config/db.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getAllDeviceUnits = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const totalResult = await db.query("SELECT COUNT(*) FROM qr_codes");
    const total = parseInt(totalResult.rows[0].count);

    const sql = `
      SELECT *
      FROM device_unit
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const result = await db.query(sql, [limit, offset]);

    return {
      data: result.rows,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    throw new AppError(
      `getAllDeviceUnits 실패: ${error.message}`,
      500,
      "GET_ALL_DEVICE_UNITS_FAILED"
    );
  }
};

export const getDeviceUnitById = async (unitId) => {
  try {
    const sql = "SELECT * FROM device_unit WHERE unit_id = $1";
    const result = await db.query(sql, [unitId]);
    return result.rows[0] || null;
  } catch (error) {
    throw new AppError(
      `getDeviceUnitById 실패: ${error.message}`,
      500,
      "GET_DEVICE_UNIT_BY_ID_FAILED"
    );
  }
};

export const createDeviceUnit = async (data) => {
  try {
    const { device_id, telemetry_key, unit, property } = data;
    const sql = `
      INSERT INTO device_unit (device_id, telemetry_key, unit, property, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *
    `;
    const result = await db.query(sql, [
      device_id,
      telemetry_key,
      unit,
      property,
    ]);
    return result.rows[0];
  } catch (error) {
    throw new AppError(
      `createDeviceUnit 실패: ${error.message}`,
      500,
      "CREATE_DEVICE_UNIT_FAILED"
    );
  }
};

export const updateDeviceUnit = async (unitId, data) => {
  try {
    const { telemetry_key, unit, property } = data;
    const sql = `
      UPDATE device_unit
      SET telemetry_key = $1, unit = $2, property = $3
      WHERE unit_id = $4
      RETURNING *
    `;
    const result = await db.query(sql, [telemetry_key, unit, property, unitId]);
    return result.rows[0];
  } catch (error) {
    throw new AppError(
      `updateDeviceUnit 실패: ${error.message}`,
      500,
      "UPDATE_DEVICE_UNIT_FAILED"
    );
  }
};

export const deleteDeviceUnit = async (unitId) => {
  try {
    const sql = "DELETE FROM device_unit WHERE unit_id = $1 RETURNING *";
    const result = await db.query(sql, [unitId]);
    return result.rows[0];
  } catch (error) {
    throw new AppError(
      `deleteDeviceUnit 실패: ${error.message}`,
      500,
      "DELETE_DEVICE_UNIT_FAILED"
    );
  }
};

export const getDeviceUnitsByDeviceId = async (deviceId) => {
  try {
    const sql = `
      SELECT *
      FROM device_unit
      WHERE device_id = $1
      ORDER BY created_at DESC
    `;
    const result = await db.query(sql, [deviceId]);
    return result.rows;
  } catch (error) {
    throw new AppError(
      `getDeviceUnitsByDeviceId 실패: ${error.message}`,
      500,
      "GET_DEVICE_UNITS_BY_DEVICE_ID_FAILED"
    );
  }
};

export const getDeviceUnitBySensorType = async (sensorType) => {
  try {
    const sql = `
      SELECT unit
      FROM device_unit
      WHERE telemetry_key = $1
    `;
    const result = await db.query(sql, [sensorType]);
    return result.rows[0];
  } catch (error) {
    throw new AppError(
      `getDeviceUnitBySensorType 실패: ${error.message}`,
      500,
      "GET_DEVICE_UNIT_BY_SENSOR_TYPE_FAILED"
    );
  }
};
