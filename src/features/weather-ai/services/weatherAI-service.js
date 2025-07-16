import generateAIContent from "../../gemini-ai/services/gemini-client.js";
import {
  getShortTermForecastAPI,
  getSpecialWeatherReportAPI,
} from "../services/weatherAPI-client.js";
import {
  saveWeatherAIContent,
  loadStructureContent,
} from "../models/weatherAI-model.js";
import { sendSocketAlert } from "../../../websocket/socket-emitter.js";
import { EVENT_TYPES } from "../../../websocket/event-types.js";

import { AppError } from "../../../utils/common-utils/error-handler.js";

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
    throw new AppError(
      `AI 기상 캐스터 제작 실패: ${error.message}`,
      500,
      "CREATE_WEATHER_AI_FAILED"
    );
  }
};

export const CreateSpecialWeatherAlertAIContent = async () => {
  try {
    const type = "specialWeather";
    const title = "기상 특보 알림!";
    const specialWeatherData = await getSpecialWeatherReportAPI();

    if (specialWeatherData.data) {
      return "기상 특보가 없으므로 AI 캐스터가 작동하지 않습니다.";
    }

    if (specialWeatherData.duplicate) {
      return "중복된 기상 특보이므로 AI 캐스터가 작동하지 않습니다.";
    }

    const geminiPromptData = await loadStructureContent(type);

    const aiSpecialWeatherCast =
      await generateAIContent(`${geminiPromptData.structure}\n
                                                          ${geminiPromptData.content}\n
                                                            \n${specialWeatherData}`);

    await saveWeatherAIContent(aiSpecialWeatherCast, type);

    await sendSocketAlert({
      type: EVENT_TYPES.SPECIAL_WEATHER,
      data: aiSpecialWeatherCast,
      title: title,
    });

    return aiSpecialWeatherCast;
  } catch (error) {
    throw new AppError(
      `AI 기상 특보 캐스터 제작 실패: ${error.message}`,
      500,
      "CREATE_SPECIAL_WEATHER_AI_FAILED"
    );
  }
};
