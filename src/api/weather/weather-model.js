import { db } from "../../config/db.js";

export const fetchTodayLatestWeatherInfo = async () => {
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
};
