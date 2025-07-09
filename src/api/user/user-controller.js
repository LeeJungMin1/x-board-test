import * as userService from "./user-service.js";
import { handleError } from "../../utils/common-utils/error-handler.js";

export const getGenerateUid = async (req, res) => {
  try {
    const uid = await userService.generateUniqueUid(); // 예: 중복 체크 포함
    res.json({ uid });
  } catch (error) {
    return handleError(res, error, 500, "UID_GENERATION_FAILED");
  }
};

export const getUserList = async (req, res) => {
  try {
    const users = await userService.fetchAllUsers();
    return res.json({ uidList: users });
  } catch (error) {
    return handleError(res, error, 500, "USER_LIST_FETCH_FAILED");
  }
};

export const postsyncUsers = async (req, res) => {
  try {
    const { uidList } = req.body;

    if (!Array.isArray(uidList)) {
      return res.status(400).json({
        errorCode: "INVALID_INPUT",
        message: "uidList는 배열이어야 합니다.",
      });
    }

    const { addedUsers, deletedUsers } = await userService.syncUserList(
      uidList
    );

    return res.json({
      message: "동기화 성공",
      addedUsers,
      deletedUsers,
    });
  } catch (error) {
    return handleError(res, error, 500, "USER_SYNC_FAILED");
  }
};
