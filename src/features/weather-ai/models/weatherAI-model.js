import { db } from "../../../config/db.js";

export const loadStructureContent = async (type) => {
  const query = `
    SELECT structure, content
    FROM gemini_prompt_data
    WHERE type = $1`;
  try {
    const result = await db.query(query, [type]);
    return result.rows[0];
  } catch (error) {
    console.error("Structure, content 조회 실패:", error.message);
    throw new Error("Structure, content 조회 실패");
  }
};

export const saveWeatherAIContent = async (content, type) => {
  const query = `
    INSERT INTO weather_ai_content (content, created_at, type)
    VALUES ($1, NOW(), $2)
    RETURNING content
  `;

  try {
    const result = await db.query(query, [content, type]);
    console.log("Weather AI Content 저장 완료:");
    return result.rows[0];
  } catch (error) {
    console.error("Weather AI Content 저장 실패:", error.message);
    throw new Error("Database 저장 실패");
  }
};
