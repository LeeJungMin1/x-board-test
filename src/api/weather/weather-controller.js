import * as WeatherService from "./weather-service.js";

export const getWeatherInfo = async (req, res) => {
  try {
    const weatherInfo = await WeatherService.fetchWeatherInfo();
    res.json({ weatherInfo });
  } catch (err) {
    res.status(500).json({ error: "날씨 조회 실패" });
  }
};
