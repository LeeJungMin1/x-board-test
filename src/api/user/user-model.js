import { db } from "../../config/db.js";

export const findUserByUid = async (uid) => {
  try {
    const result = await db.query("SELECT 1 FROM users WHERE uid = $1", [uid]);
    return result.rowCount;
  } catch (error) {
    throw new AppError(
      `findUserByUid 실패: ${error.message}`,
      500,
      "FIND_USER_BY_UID_FAILED"
    );
  }
};
