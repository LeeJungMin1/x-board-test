export const getCurrentDateTimeForAPI = () => {
  const now = new Date();

  // 가능한 base_time 시간 배열
  const validTimes = [
    "0200",
    "0500",
    "0800",
    "1100",
    "1400",
    "1700",
    "2000",
    "2300",
  ];

  // 현재 시간 계산
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  // 현재 시간에서 가장 가까운 이전시간 구함.
  //(현재 시간이 13:55분인 경우 base_time은 11:00분으로 구함)
  let closestTime = validTimes[0];
  for (const time of validTimes) {
    const hour = parseInt(time.slice(0, 2), 10);
    if (currentHour > hour || (currentHour === hour && currentMinutes >= 0)) {
      closestTime = time;
    } else {
      break;
    }
  }

  if (closestTime === validTimes[0] && currentHour < 2) {
    now.setDate(now.getDate() - 1); // 하루 전날로 설정
  }

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");

  return {
    base_date: `${year}${month}${date}`,
    base_time: closestTime,
  };
};

export const getCurrentDateTime = () => {
  const now = new Date();

  const padZero = (num) => num.toString().padStart(2, "0");

  const currentDateTime = [
    padZero(now.getFullYear()),
    padZero(now.getMonth() + 1),
    padZero(now.getDate()),
  ].join("");

  return currentDateTime;
};
