import {
  CreateWeatherAIContent,
  CreateSpecialWeatherAlertAIContent,
} from "../weather-ai/services/weatherAI-service.js";
import logger from "../../utils/logger.js";
import {
  handleError,
  AppError,
} from "../../utils/common-utils/error-handler.js";

let isRunning = false;
let isRunning2 = false;

export const runWeatherAIService = async () => {
  if (isRunning) {
    logger.warn(
      "🔁  이전 날씨 AI 작업이 완료되지 않아서, 현재 실행을 건너뛰고 있습니다."
    );
    return;
  }

  isRunning = true;

  try {
    logger.info("🌤️  Weather AI Content 생성 시작");
    const aiContent = await CreateWeatherAIContent();
    logger.info(` ✅  생성된 AI Weather 콘텐츠: ${aiContent}`);
  } catch (error) {
    const err = new AppError(
      `Weather AI Scheduler 실패: ${error.message}`,
      500,
      "WEATHER_AI_SCHEDULER_FAILED"
    );
    handleError(null, err); // res 없이 로그만 기록
  } finally {
    isRunning = false;
  }
};

export const runSpecialWeatherAIService = async () => {
  if (isRunning2) {
    logger.warn(
      "🔁  이전 특보 날씨 AI 작업이 완료되지 않아서, 현재 실행을 건너띄고 있습니다."
    );
    return;
  }

  isRunning2 = true;

  try {
    logger.info("🌤️  Special Weather AI Content 생성 시작");
    const aiContent = await CreateSpecialWeatherAlertAIContent();
    logger.info(`✅  생성된 AI Special Weather 콘텐츠: ${aiContent}`);
  } catch (error) {
    const err = new AppError(
      `Special Weather AI Scheduler 실패: ${error.message}`,
      500,
      "SPECIAL_WEATHER_AI_SCHEDULER_FAILED"
    );
    handleError(null, err); // res 없이 로그만 기록
  } finally {
    isRunning2 = false;
  }
};

export const runWeatherAISchedulers = () => {
  runWeatherAIService();
  runSpecialWeatherAIService();

  const interval1 = 3 * 60 * 60 * 1000; // 3시간 (밀리초 단위)
  const interval2 = 10 * 60 * 1000; // 10분 (밀리초 단위)

  setInterval(runWeatherAIService, interval1);
  setInterval(runSpecialWeatherAIService, interval2);
};
