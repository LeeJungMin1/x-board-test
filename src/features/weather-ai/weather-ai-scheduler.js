import {
  CreateWeatherAIContent,
  CreateSpecialWeatherAlertAIContent,
} from "../weather-ai/services/weatherAI-service.js";

let isRunning = false;

const runWeatherAIService = async () => {
  if (isRunning) {
    console.log(
      "이전 날씨 AI 작업이 완료되지 않아서, 현재 실행을 건너뛰고 있습니다."
    );
    return;
  }

  isRunning = true;

  try {
    console.log("Weather AI Content 생성 시작");
    const aiContent = await CreateWeatherAIContent();
    console.log("Generated AI Weather Content:", aiContent);
  } catch (error) {
    console.error("Weather AI Scheduler 오류가 발생 했습니다 :", error.message);
  } finally {
    isRunning = false;
  }
};

let isRunning2 = false;

const runSpecialWeatherAIService = async () => {
  if (isRunning2) {
    console.log(
      "이전 특보 날씨 AI 작업이 완료되지 않아서, 현재 실행을 건너띄고 있습니다."
    );
    return;
  }

  isRunning2 = true;

  try {
    console.log("Special Weather AI Content 생성 시작");
    const aiContent = await CreateSpecialWeatherAlertAIContent();
    console.log("Generated AI Special Weather Content:", aiContent);
  } catch (error) {
    console.error(
      "Special Weather AI Scheduler 오류가 발생했습니다 :",
      error.message
    );
  } finally {
    isRunning2 = false;
  }
};

// 첫 실행
runWeatherAIService();
runSpecialWeatherAIService();

// 3시간마다 실행
const interval1 = 3 * 60 * 60 * 1000; // 3시간 (밀리초 단위)
const interval2 = 10 * 60 * 1000; // 10분 (밀리초 단위)

setInterval(runWeatherAIService, interval1);
setInterval(runSpecialWeatherAIService, interval2);

export default runWeatherAIService;
