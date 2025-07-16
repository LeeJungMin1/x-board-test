import schedule from "node-schedule";
import { todayDeviceReplaceAlerts } from "./services/replace-alarm-service.js";
import {
  handleError,
  AppError,
} from "../../utils/common-utils/error-handler.js";
import logger from "../../utils/common-utils/logger.js";

export const runReplaceAlarmScheduler = () => {
  schedule.scheduleJob({ rule: "01 19 * * *", tz: "Asia/Seoul" }, async () => {
    logger.info("⏰ 장비 교체 알림 스케줄러 실행");

    try {
      await todayDeviceReplaceAlerts();
    } catch (error) {
      const err = new AppError(
        `장비 교체 알림 스케줄러 실패: ${error.message}`,
        500,
        "REPLACE_ALARM_SCHEDULER_FAILED"
      );
      handleError(null, err); // res 없음
    }
  });
};
