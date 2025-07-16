import { getAllDeviceAlarmSchedules } from "../models/replace-alarm-model.js";
import { getDueAlarmLabelsForToday } from "../../../utils/replace-alarm/replace-alarm-utils.js";
import { sendSocketAlert } from "../../../websocket/socket-emitter.js";
import { EVENT_TYPES } from "../../../websocket/event-types.js";
import { AppError } from "../../../utils/common-utils/error-handler.js";

export const todayDeviceReplaceAlerts = async () => {
  const alarms = await getAllDeviceAlarmSchedules();

  if (!alarms || alarms.length === 0) {
    throw new AppError(
      "등록된 교체시기 장비가 없습니다.",
      404,
      "NO_DEVICE_ALARM_FOUND"
    );
  }

  for (const alarm of alarms) {
    const { device_name, end_date, alarm_type } = alarm;
    const alarmAgoday = getDueAlarmLabelsForToday(end_date, alarm_type);

    if (alarmAgoday.length === 0) {
      continue;
    }

    for (const agoday of alarmAgoday) {
      const title = "장비 교체 알림";
      const message = `${device_name}의 교체일(${end_date}) 까지 ${agoday} 전 입니다.`;

      await sendSocketAlert({ title, data: message, type: EVENT_TYPES.ALL });
    }
  }
};
