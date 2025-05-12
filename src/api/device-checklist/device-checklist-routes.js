import { Router } from "express";
import {
  getChecklist,
  getChecklistDetail,
  createChecklist,
  createChecklistDetail,
  deleteChecklist,
  deleteChecklistDetail,
  getAllChecklistsView,
} from "./device-checklist-controller.js";

const router = Router();

router.get("/", getChecklist);
router.get("/detail/:check_id", getChecklistDetail);
router.post("/", createChecklist);
router.post("/detail", createChecklistDetail);
router.delete("/:check_id", deleteChecklist);
router.delete("/detail/:id", deleteChecklistDetail);

router.get("/all", getAllChecklistsView); // View 조회

export default router;
