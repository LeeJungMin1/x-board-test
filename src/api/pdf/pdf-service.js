import { db } from "../../config/db.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const findPdfPathBySessionId = async (sessionId) => {
  try {
    const result = await db.query(
      "SELECT pdf_path FROM device_maintenance WHERE session_id = $1",
      [sessionId]
    );

    if (result.rows.length === 0) return null;

    return result.rows[0].pdf_path;
  } catch (error) {
    throw new AppError(
      `findPdfPathBySessionId 실패: ${error.message}`,
      500,
      "FIND_PDF_PATH_FAILED"
    );
  }
};
