import { db } from "../../../config/db.js";

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
    console.error("알림 데이터 조회 실패:", error);
    return [];
  }
};
