import { Router } from "express";
import {
  getGenerateUid,
  getUserList,
  postsyncUsers,
} from "./user-controller.js";
import { authenticateToken } from "../../middlewares/auth-middleware.js";
import { authorizeAdmin } from "../../middlewares/authorize-admin.js";

const router = Router();
router.get("/uid", authenticateToken, authorizeAdmin, getGenerateUid);
router.get("/", authenticateToken, authorizeAdmin, getUserList);
router.post("/sync", authenticateToken, authorizeAdmin, postsyncUsers);

export default router;
