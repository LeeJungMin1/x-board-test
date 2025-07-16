import * as userService from "./user-service.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getGenerateUid = async (req, res) => {
  const uid = await userService.generateUniqueUid(); // 예: 중복 체크 포함
  res.json({ uid });
};

export const getUserList = async (req, res) => {
  const users = await userService.fetchAllUsers();
  return res.json({ uidList: users });
};

export const postsyncUsers = async (req, res) => {
  const { uidList } = req.body;

  if (!Array.isArray(uidList)) {
    throw new AppError("uidList는 배열이어야 합니다.", 400, "INVALID_INPUT", {
      uidList,
    });
  }

  const { addedUsers, deletedUsers } = await userService.syncUserList(uidList);

  return res.json({
    message: "동기화 성공",
    addedUsers,
    deletedUsers,
  });
};
