import { GoogleGenAI } from "@google/genai";
import { GEN_AI_API_KEY } from "../../../config/config.js";
import { AppError } from "../../../utils/common-utils/error-handler.js";

const genAI = new GoogleGenAI({ apiKey: GEN_AI_API_KEY });

const generateAIContent = async (prompt) => {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!response.text || typeof response.text !== "string") {
      throw new AppError(
        "응답에 유효한 텍스트가 없습니다.",
        500,
        "GEN_AI_INVALID_RESPONSE"
      );
    }
    return response.text;
  } catch (error) {
    throw new AppError(
      `AI 콘텐츠 생성 실패: ${error.message}`,
      500,
      "GEN_AI_GENERATION_FAILED"
    );
  }
};

// 서비스는 기본 내보내기
export default generateAIContent;
