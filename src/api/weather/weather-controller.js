import * as WeatherService from "./weather-service.js";

export const getWeatherInfo = async (req, res) => {
  const weatherInfo = await WeatherService.fetchWeatherInfo();
  res.json({ weatherInfo });
};
