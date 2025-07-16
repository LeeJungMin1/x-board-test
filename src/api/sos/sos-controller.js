import { sendSocketAlert } from "../../websocket/socket-emitter.js";
import { EVENT_TYPES } from "../../websocket/event-types.js";
import { findUserByUid } from "../user/user-model.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const postSosNotification = async (req, res) => {
  const { sos_uid } = req.body;

  if (!sos_uid) {
    throw new AppError("sos_uid 값은 필수 입니다.", 400, "SOS_UID_REQUIRED");
  }

  const userExists = await findUserByUid(sos_uid);

  if (!userExists) {
    throw new AppError(
      "존재하지 않는 UID(sos_uid)입니다.",
      404,
      "SOS_UID_NOT_FOUND",
      { sos_uid }
    );
  }

  const now = new Date();
  const koreaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const sos_time = `${koreaTime.getFullYear()}-${String(
    koreaTime.getMonth() + 1
  ).padStart(2, "0")}-${String(koreaTime.getDate()).padStart(2, "0")} ${String(
    koreaTime.getHours()
  ).padStart(2, "0")}:${String(koreaTime.getMinutes()).padStart(
    2,
    "0"
  )}:${String(koreaTime.getSeconds()).padStart(2, "0")}`;

  const alarm_title = "긴급 알림!";
  const alarm_message = `발생자 : ${sos_uid}\n발생시각 : ${sos_time}`;

  await sendSocketAlert({
    type: EVENT_TYPES.SOS,
    data: alarm_message,
    title: alarm_title,
  });

  res.status(200).json({ message: "SOS 알림이 성공적으로 전송되었습니다." });
};
