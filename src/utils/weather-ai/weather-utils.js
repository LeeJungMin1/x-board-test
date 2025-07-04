export const processWeatherData = (rawData) => {
  const categoryMap = {
    TMP: "1시간 기온",
    UUU: "풍속(동서성분)",
    VVV: "풍속(남북성분)",
    VEC: "풍향",
    WSD: "풍속",
    SKY: "하늘상태",
    PTY: "강수형태",
    POP: "강수확률",
    WAV: "파고",
    PCP: "1시간 강수량",
    REH: "습도",
    SNO: "1시간 신적설",
  };

  const groupedData = rawData.reduce((acc, item) => {
    const { fcstDate, fcstTime, category, fcstValue } = item;

    if (!acc[fcstDate]) acc[fcstDate] = {};
    if (!acc[fcstDate][fcstTime]) acc[fcstDate][fcstTime] = {};

    const categoryName = categoryMap[category] || category;

    acc[fcstDate][fcstTime][categoryName] = fcstValue;
    return acc;
  }, {});

  return groupedData;
};

export const processSpecialWeatherData = (rawData) => {
  const numberOfState = {
    cancel: {
      0: "정상",
      1: "취소된 특보",
    },
    command: {
      1: "발표",
      2: "해제",
      3: "연장",
      6: "정정",
      7: "변경발표",
      8: "변경해제",
    },
    warnStress: {
      0: "주의보",
      1: "경보",
    },
    warnVar: {
      1: "강풍",
      2: "호우",
      3: "한파",
      4: "건조",
      5: "폭풍해일",
      6: "풍랑",
      7: "태풍",
      8: "대설",
      9: "황사",
      12: "폭염",
    },
  };

  const processedData = rawData.map((item) => ({
    area: {
      name: item.areaName,
    },
    status: {
      command: numberOfState.command[item.command],
      cancel: numberOfState.cancel[item.cancel],
      warnVar: numberOfState.warnVar[item.warnVar],
      warnStress: numberOfState.warnStress[item.warnStress],
    },
    time: {
      tmFc: item.tmFc,
      startTime: item.startTime,
      endTime: item.endTime,
    },
  }));

  return processedData;
};

export const createWeatherReport = (data) => {
  return data
    .map((entry) => {
      const {
        area: { name },
        status: { command, cancel, warnVar, warnStress },
        time: { tmFc, startTime, endTime },
      } = entry;

      // const cancelText = cancel === '정상' ? '확정된 특보' : '취소된 특보';
      const cancelText =
        cancel === "정상"
          ? command === "해제"
            ? "해제되었습니다."
            : "발표되었습니다."
          : "취소된 특보";

      const formatTime = (time) => {
        const str = time.toString();
        const year = str.slice(0, 4);
        const month = str.slice(4, 6);
        const day = str.slice(6, 8);
        const hour = str.slice(8, 10) || "00";
        const minute = str.slice(10) || "00";
        return `${year}-${month}-${day} ${hour}:${minute}`;
      };

      const announcementTime = formatTime(tmFc);
      const effectiveStartTime = startTime
        ? formatTime(startTime)
        : "발효 시작 시각 정보 없음";
      const effectiveEndTime = endTime
        ? formatTime(endTime)
        : "발효 종료 시각 정보 없음";

      return `지역 이름: ${name}\n특보 상태: ${command}\n특보 종류: ${warnVar} (${warnStress})\n발표 시각: ${announcementTime}\n발효 시각: ${effectiveStartTime} ~ ${effectiveEndTime}\n특보가 ${cancelText}`;
    })
    .join("\n\n");
};
