import admin from "../config/firebase-admin.js";
import { AppError } from "../utils/common-utils/error-handler.js";

export const sendFirebaseNotification = async ({ title, message, topic }) => {
  const payload = {
    notification: { title, body: message },
    topic,
  };

  try {
    const response = await admin.messaging().send(payload);
    console.log("알림 전송 성공:", payload, response);
  } catch (error) {
    console.error("알림 전송 실패:", error);
    throw new AppError(
      `Firebase 알림 전송 실패: ${error.message}`,
      500,
      "FIREBASE_NOTIFICATION_FAILED",
      { topic, title }
    );
  }
};
