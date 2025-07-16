import { db } from "../../../config/db.js";
import { AppError } from "../../../utils/common-utils/error-handler.js";

export const loadStructureContent = async (type) => {
  const query = `
    SELECT structure, content
    FROM gemini_prompt_data
    WHERE type = $1`;
  try {
    const result = await db.query(query, [type]);
    return result.rows[0];
  } catch (error) {
    throw new AppError(
      `Structure, content 조회 실패: ${error.message}`,
      500,
      "LOAD_GEMINI_PROMPT_FAILED"
    );
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
    throw new AppError(
      `Weather AI Content 저장 실패: ${error.message}`,
      500,
      "SAVE_WEATHER_AI_CONTENT_FAILED"
    );
  }
};
