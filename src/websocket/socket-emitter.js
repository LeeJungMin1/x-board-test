import { getIO } from "./index.js";
import { sendFirebaseNotification } from "../notification/firebase-sender.js";
import logger from "../utils/common-utils/logger.js";
import { AppError } from "../utils/common-utils/error-handler.js";

export const sendSocketAlert = async ({ type, data, title }) => {
  try {
    const io = getIO();

    io.emit(type, {
      title,
      data,
      type,
    });

    await sendFirebaseNotification({
      title,
      message: data,
      topic: type,
    });

    logger.info(`✅ 소켓 & Firebase 알림 전송 완료: [${type}]`);
  } catch (err) {
    throw new AppError(
      `소켓 또는 Firebase 알림 실패: ${err.message}`,
      500,
      "SOCKET_EMIT_FAILED",
      { type, title }
    );
  }
};
