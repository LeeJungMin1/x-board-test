import { db } from "../../config/db.js";
import * as authModel from "./auth-model.js";

export const findUserByUid = async (uid) => {
  return await authModel.getUserByUid(uid);
};
