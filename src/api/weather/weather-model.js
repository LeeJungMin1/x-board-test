import { db } from "../../config/db.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const fetchTodayLatestWeatherInfo = async () => {
  try {
    const sql = `
      SELECT content, created_at, type
      FROM (
          SELECT content, created_at, type,
                  ROW_NUMBER() OVER (PARTITION BY type ORDER BY created_at DESC) AS row_num
          FROM weather_ai_content
          WHERE DATE(created_at) = CURRENT_DATE
      ) subquery
      WHERE row_num = 1;
    `;
    const result = await db.query(sql);
    return result.rows;
  } catch (error) {
    throw new AppError(
      `fetchTodayLatestWeatherInfo 실패: ${error.message}`,
      500,
      "FETCH_TODAY_LATEST_WEATHER_INFO_FAILED"
    );
  }
};
