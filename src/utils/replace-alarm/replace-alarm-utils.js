const ALARM_DAYS = {
  1: { days: 1, label: "1일" },
  2: { days: 3, label: "3일" },
  4: { days: 7, label: "7일" },
  8: { days: 15, label: "15일" },
  16: { days: 30, label: "1달" },
};

export const getDueAlarmLabelsForToday = (endDate, alarmType) => {
  const alarmDates = [];
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  Object.keys(ALARM_DAYS).forEach((bit) => {
    if ((alarmType & bit) === parseInt(bit)) {
      // 해당 비트가 포함되어 있는지 확인
      const alarmDay = new Date(endDate);
      alarmDay.setDate(alarmDay.getDate() - ALARM_DAYS[bit].days);

      const alarmDateStr = alarmDay.toISOString().split("T")[0];

      if (alarmDateStr === today) {
        alarmDates.push(ALARM_DAYS[bit].label);
      }
    }
  });

  return alarmDates;
};
