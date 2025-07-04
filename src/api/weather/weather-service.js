import * as WeatherModel from "./weather-model.js";

export const fetchWeatherInfo = async () => {
  return await WeatherModel.fetchTodayLatestWeatherInfo();
};
