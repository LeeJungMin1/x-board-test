import * as userService from "./user-service.js";

export const getGenerateUid = async (req, res) => {
  try {
    const uid = await userService.generateUniqueUid(); // 예: 중복 체크 포함
    res.json({ uid });
  } catch (err) {
    res.status(500).json({ error: "UID 발급 실패" });
  }
};

export const getUserList = async (req, res) => {
  const users = await userService.fetchAllUsers();
  res.json({ uidList: users });
};

export const postsyncUsers = async (req, res) => {
  const { uidList } = req.body;
  if (!Array.isArray(uidList)) {
    return res.status(400).json({ error: "uidList는 배열이어야 합니다." });
  }

  const { addedUsers, deletedUsers } = await userService.syncUserList(uidList);

  res.json({
    message: "동기화 성공",
    addedUsers,
    deletedUsers,
  });
};
