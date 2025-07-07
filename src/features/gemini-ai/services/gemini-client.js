import { GoogleGenAI } from "@google/genai";
import { GEN_AI_API_KEY } from "../../../config/config.js";

const genAI = new GoogleGenAI({ apiKey: GEN_AI_API_KEY });

const generateAIContent = async (prompt) => {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!response.text || typeof response.text !== "string") {
      throw new Error("응답에 유효한 텍스트가 없습니다.");
    }
    return response.text;
  } catch (error) {
    throw new Error(`Failed to generate content: ${error.message}`);
  }
};

// 서비스는 기본 내보내기
export default generateAIContent;
