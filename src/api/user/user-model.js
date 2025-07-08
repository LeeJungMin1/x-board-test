import { db } from "../../config/db.js";

export const findUserByUid = async (uid) => {
  const result = await db.query("SELECT 1 FROM users WHERE uid = $1", [uid]);
  return result.rowCount;
};
