import * as WeatherService from "./weather-service.js";
import { handleError } from "../../utils/common-utils/error-handler.js";

export const getWeatherInfo = async (req, res) => {
  try {
    const weatherInfo = await WeatherService.fetchWeatherInfo();
    res.json({ weatherInfo });
  } catch (error) {
    return handleError(res, error, 500, "WEATHER_FETCH_FAILED");
  }
};
