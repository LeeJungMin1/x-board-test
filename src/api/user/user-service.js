import { db } from "../../config/db.js";

export const generateUniqueUid = async () => {
  let uid;
  let isDuplicate = true;

  while (isDuplicate) {
    uid = String(Math.floor(100000 + Math.random() * 900000)); // 6자리 랜덤
    const result = await db.query("SELECT 1 FROM users WHERE uid = $1", [uid]);
    isDuplicate = result.rowCount > 0;
  }

  return uid;
};

export const fetchAllUsers = async () => {
  const result = await db.query("SELECT uid, is_admin FROM users ORDER BY uid");
  return result.rows;
};

export const syncUserList = async (incomingList) => {
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
    await db.query("UPDATE users SET is_active = false WHERE uid = $1", [uid]);
  }

  return {
    addedUsers: toAdd,
    deletedUsers: toDeactivate,
  };
};
