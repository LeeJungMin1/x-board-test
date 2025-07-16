import * as authModel from "./auth-model.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const findUserByUid = async (uid) => {
  try {
    return await authModel.getUserByUid(uid);
  } catch (error) {
    throw new AppError(
      `findUserByUid 실패: ${error.message}`,
      500,
      "FIND_USER_BY_UID_FAILED"
    );
  }
};
