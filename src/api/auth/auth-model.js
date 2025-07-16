import { db } from "../../config/db.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

// ✅ 전체 checklist (device 기준) + 자식 항목 포함
export const getUserByUid = async (uid) => {
  try {
    const sql = `
      SELECT * FROM users WHERE uid = $1
    `;
    const result = await db.query(sql, [uid]);
    const userInfo = result.rows[0];

    return userInfo;
  } catch (error) {
    throw new AppError(
      `getUserByUid 실패: ${error.message}`,
      500,
      "GET_USER_BY_UID_FAILED"
    );
  }
};
