import { db } from "../../config/db.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getAllQRCodesPaginated = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const totalResult = await db.query(`SELECT COUNT(*) FROM qr_codes`);
    const total = parseInt(totalResult.rows[0].count);

    const sql = `
      SELECT data, qr_image, created_at
      FROM qr_codes
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
      `getAllQRCodesPaginated 실패: ${error.message}`,
      500,
      "GET_ALL_QR_CODES_PAGINATED_FAILED"
    );
  }
};

export const insertQRCode = async (data, qr_image) => {
  try {
    const result = await db.query(
      "INSERT INTO qr_codes (data, qr_image) VALUES ($1, $2) ON CONFLICT (data) DO NOTHING RETURNING data",
      [data, qr_image]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    throw new AppError(
      `insertQRCode 실패: ${error.message}`,
      500,
      "INSERT_QR_CODE_FAILED"
    );
  }
};

export const getAllQRCodes = async () => {
  try {
    const result = await db.query(
      "SELECT data, qr_image FROM qr_codes ORDER BY data"
    );
    return result.rows;
  } catch (error) {
    throw new AppError(
      `getAllQRCodes 실패: ${error.message}`,
      500,
      "GET_ALL_QR_CODES_FAILED"
    );
  }
};

export const selectDevicesByQRData = async (qr_data) => {
  try {
    const result = await db.query(
      "SELECT device_id FROM qr_code_devices WHERE qr_data = $1 ORDER BY id",
      [qr_data]
    );
    return result.rows;
  } catch (error) {
    throw new AppError(
      `selectDevicesByQRData 실패: ${error.message}`,
      500,
      "SELECT_DEVICES_BY_QR_DATA_FAILED"
    );
  }
};

export const removeQRCode = async (data) => {
  try {
    return await db.query("DELETE FROM qr_codes WHERE data = $1", [data]);
  } catch (error) {
    throw new AppError(
      `removeQRCode 실패: ${error.message}`,
      500,
      "REMOVE_QR_CODE_FAILED"
    );
  }
};
