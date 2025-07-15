import * as WeatherModel from "./weather-model.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const fetchWeatherInfo = async () => {
  try {
    return await WeatherModel.fetchTodayLatestWeatherInfo();
  } catch (error) {
    throw new AppError(
      `fetchWeatherInfo 실패: ${error.message}`,
      500,
      "FETCH_WEATHER_INFO_FAILED"
    );
  }
};
