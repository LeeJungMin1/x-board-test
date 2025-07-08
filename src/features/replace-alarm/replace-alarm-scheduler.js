import schedule from "node-schedule";
import { todayDeviceReplaceAlerts } from "./services/replace-alarm-service.js";

export const runReplaceAlarmScheduler = () => {
  schedule.scheduleJob({ rule: "01 19 * * *", tz: "Asia/Seoul" }, async () => {
    console.log("장비 교체 알림 스케줄러 실행");

    try {
      await todayDeviceReplaceAlerts();
    } catch (error) {
      console.error("스케줄러 실행 중 오류:", error);
    }
  });
};
