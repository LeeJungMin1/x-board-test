import { getIO } from "./index.js";
import { sendFirebaseNotification } from "../notification/firebase-sender.js";

export const sendSocketAlert = async (eventType, payload, title) => {
  try {
    const io = getIO();
    io.emit(eventType, {
      title,
      data: payload,
      type: eventType,
    });

    await sendFirebaseNotification({
      title,
      message: payload,
      topic: eventType,
    });
  } catch (err) {
    console.error(`❌ 소켓 알림 실패 [${eventType}]`, err.message);
  }
};
