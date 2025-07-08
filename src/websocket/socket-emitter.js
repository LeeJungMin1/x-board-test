import { getIO } from "./index.js";
import { sendFirebaseNotification } from "../notification/firebase-sender.js";

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
  } catch (err) {
    console.error(`❌ 소켓 알림 실패 [${type}]`, err.message);
  }
};
