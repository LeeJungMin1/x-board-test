import { db } from "../../../config/db.js";
import { AppError } from "../../../utils/common-utils/error-handler.js";

export const getAllDeviceAlarmSchedules = async () => {
  const query = `
    SELECT 
        device_name, 
        TO_CHAR(end_date, 'YYYY-MM-DD') AS end_date, 
        alarm_type
    FROM admin_device_info
  `;

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw new AppError(
      "장비 알람 데이터 조회 실패",
      500,
      "ALARM_DB_QUERY_FAILED",
      { dbMessage: error.message }
    );
  }
};
