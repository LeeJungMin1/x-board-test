import { db } from "../../config/db.js";
import { findUserByUid } from "./user-model.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const generateUniqueUid = async () => {
  try {
    let uid;
    let isDuplicate = true;

    while (isDuplicate) {
      uid = String(Math.floor(100000 + Math.random() * 900000)); // 6자리 랜덤
      const rowCount = await findUserByUid(uid);
      isDuplicate = rowCount > 0;
    }

    return uid;
  } catch (error) {
    throw new AppError(
      `generateUniqueUid 실패: ${error.message}`,
      500,
      "GENERATE_UNIQUE_UID_FAILED"
    );
  }
};

export const fetchAllUsers = async () => {
  try {
    const result = await db.query(
      "SELECT uid, is_admin FROM users ORDER BY uid"
    );
    return result.rows;
  } catch (error) {
    throw new AppError(
      `fetchAllUsers 실패: ${error.message}`,
      500,
      "FETCH_ALL_USERS_FAILED"
    );
  }
};

export const syncUserList = async (incomingList) => {
  try {
    const dbUsers = await db.query("SELECT uid FROM users");
    const existingUids = dbUsers.rows.map((u) => u.uid);

    const incomingUids = incomingList.map((u) => u.uid);

    // 추가할 유저
    const toAdd = incomingList.filter((u) => !existingUids.includes(u.uid));

    for (const u of toAdd) {
      await db.query(
        "INSERT INTO users (uid, is_admin, is_active) VALUES ($1, $2, $3)",
        [u.uid, u.is_admin, true]
      );
    }

    // 비활성할 유저
    const toDeactivate = existingUids.filter(
      (uid) => !incomingUids.includes(uid)
    );

    for (const uid of toDeactivate) {
      await db.query("UPDATE users SET is_active = false WHERE uid = $1", [
        uid,
      ]);
    }

    return {
      addedUsers: toAdd,
      deletedUsers: toDeactivate,
    };
  } catch (error) {
    throw new AppError(
      `syncUserList 실패: ${error.message}`,
      500,
      "SYNC_USER_LIST_FAILED"
    );
  }
};
