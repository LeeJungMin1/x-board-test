import admin from "../config/firebase-admin.js";

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
    throw new Error(`알림 전송 싶패!!: ${error.message}`);
  }
};
