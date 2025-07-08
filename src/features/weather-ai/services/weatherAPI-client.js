import axios from "axios";
import { WEATHER_API_KEY } from "../../../config/config.js";
import {
  processWeatherData,
  processSpecialWeatherData,
  createWeatherReport,
} from "../../../utils/weather-ai/weather-utils.js";
import {
  getCurrentDateTimeForAPI,
  getCurrentDateTime,
} from "../../../utils/weather-ai/date-utils.js";

const CurrentDate = getCurrentDateTime(); //20250103
let previousReport = null;

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

export const getSpecialWeatherReportAPI = async (
  areaCode = "L1051700", //영암
  service = "production"
) => {
  const BASE_URL = "http://apis.data.go.kr/1360000/WthrWrnInfoService/getPwnCd";

  const params = {
    serviceKey: WEATHER_API_KEY,
    pageNo: 1,
    numOfRows: 1,
    dataType: "JSON",
    fromTmFc: CurrentDate,
    toTmFc: CurrentDate,
    areaCode, // 영암
    // areaCode: 'L1020110', //동해 평지
  };

  try {
    const response = await axios.get(BASE_URL, {
      params,
      headers: {
        Accept: "application/json",
      },
    });
    console.log("response.data => ", response.data);
    const resultMsg = response.data.response.header.resultMsg;
    let rawData = "NO_DATA";

    if (resultMsg === "NORMAL_SERVICE") {
      rawData = response.data.response.body.items.item;

      const processedData = processSpecialWeatherData(rawData);

      if (
        JSON.stringify(processedData) === JSON.stringify(previousReport) &&
        service === "production"
      ) {
        return { duplicate: "DUPLICATION_DATA" };
      }

      previousReport = processedData;
      const strData = createWeatherReport(processedData);

      return strData;
    }

    return { data: rawData };
  } catch (error) {
    throw new Error(`기상특보 정보 요청에 실패했습니다 : ${error.message}`);
  }
};
