import { db } from "../../config/db.js";

export const findPdfPathBySessionId = async (sessionId) => {
  const result = await db.query(
    "SELECT pdf_path FROM device_maintenance WHERE session_id = $1",
    [sessionId]
  );

  if (result.rows.length === 0) return null;

  return result.rows[0].pdf_path;
};
