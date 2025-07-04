import generateAIContent from "../../gemini-ai/services/gemini-client.js";
import { getShortTermForecastAPI } from "../services/weatherAPI-client.js";
import {
  saveWeatherAIContent,
  loadStructureContent,
} from "../models/weatherAI-model.js";

export const CreateWeatherAIContent = async () => {
  try {
    const type = "shortTermWeather";
    const weatherData = await getShortTermForecastAPI();
    const geminiPromptData = await loadStructureContent(type);

    const formattedWeatherData = Object.entries(weatherData)
      .map(([date, times]) => {
        return (
          `${date}:\n` +
          Object.entries(times)
            .map(([time, details]) => {
              return `${time} - ${Object.entries(details)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ")}`;
            })
            .join("\n")
        );
      })
      .join("\n\n");

    const aiWeatherCast =
      await generateAIContent(`${geminiPromptData.structure}\n
                                                    ${geminiPromptData.content}\n
                                                    \n${formattedWeatherData}`);

    await saveWeatherAIContent(aiWeatherCast, type);

    return aiWeatherCast;
  } catch (error) {
    throw new Error(`AI 기상 캐스터 제작에 실패했습니다 : ${error.message}`);
  }
};
