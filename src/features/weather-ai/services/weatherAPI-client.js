import axios from "axios";
import { WEATHER_API_KEY } from "../../../config/config.js";
import { processWeatherData } from "../../../utils/weather-ai/weather-utils.js";
import { getCurrentDateTimeForAPI } from "../../../utils/weather-ai/date-utils.js";

export const getShortTermForecastAPI = async () => {
  const { base_date, base_time } = getCurrentDateTimeForAPI();

  const BASE_URL =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

  const params = {
    serviceKey: WEATHER_API_KEY,
    pageNo: 1,
    numOfRows: 72,
    dataType: "JSON",
    base_date,
    base_time,
    nx: "51",
    ny: "65",
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    const rawData = response.data.response.body.items.item;

    const processedData = processWeatherData(rawData);

    return processedData;
  } catch (error) {
    throw new Error(`단기예보 정보 요청에 실패했습니다 : ${error.message}`);
  }
};
