import express from "express";
import {
  getAdminDeviceList,
  postAdminDevice,
  putAdminDevice,
  deleteAdminDeviceHandler,
} from "./device-management-controller.js";

const router = express.Router();

// 장비 관리 목록 불러오기
router.get("/", getAdminDeviceList);

// 장비 관리 항목 생성
router.post("/", postAdminDevice);

// 장비 관리 항목 수정
router.put("/:item_id", putAdminDevice);

// 장비 관리 항목 삭제
router.delete("/:item_id", deleteAdminDeviceHandler);

export default router;
