import { db } from "../../config/db.js";

export const getAllDeviceUnits = async () => {
  const sql = "SELECT * FROM device_unit ORDER BY created_at DESC";
  const result = await db.query(sql);
  return result.rows;
};

export const getDeviceUnitById = async (unitId) => {
  const sql = "SELECT * FROM device_unit WHERE unit_id = $1";
  const result = await db.query(sql, [unitId]);
  return result.rows[0] || null;
};

export const createDeviceUnit = async (data) => {
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
};

export const updateDeviceUnit = async (unitId, data) => {
  const { telemetry_key, unit, property } = data;
  const sql = `
    UPDATE device_unit
    SET telemetry_key = $1, unit = $2, property = $3
    WHERE unit_id = $4
    RETURNING *
  `;
  const result = await db.query(sql, [telemetry_key, unit, property, unitId]);
  return result.rows[0];
};

export const deleteDeviceUnit = async (unitId) => {
  const sql = "DELETE FROM device_unit WHERE unit_id = $1 RETURNING *";
  const result = await db.query(sql, [unitId]);
  return result.rows[0];
};

export const getDeviceUnitsByDeviceId = async (deviceId) => {
  const sql = `
    SELECT *
    FROM device_unit
    WHERE device_id = $1
    ORDER BY created_at DESC
  `;
  const result = await db.query(sql, [deviceId]);
  return result.rows;
};
