import { db } from "../../config/db.js";

// ✅ 전체 checklist (device 기준) + 자식 항목 포함
export const getUserByUid = async (uid) => {
  const sql = `
    SELECT * FROM users WHERE uid = $1
    `;
  const result = await db.query(sql, [uid]);
  const userInfo = result.rows[0];

  return userInfo;
};
