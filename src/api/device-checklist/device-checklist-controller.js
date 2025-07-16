import * as ChecklistService from "./device-checklist-service.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getChecklist = async (req, res) => {
  const data = await ChecklistService.findChecklist();
  return res.json({ checkList: data });
};

export const getChecklistDetail = async (req, res) => {
  const { check_id } = req.params;
  const data = await ChecklistService.findChecklistDetail(check_id);
  return res.json(data);
};

export const getAllChecklistsView = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const result = await ChecklistService.findAllChecklistsWithDetails(
    page,
    limit
  );
  return res.json(result);
};

export const createChecklist = async (req, res) => {
  const result = await ChecklistService.addChecklist(req.body);
  return res.status(201).json(result);
};

export const createChecklistDetail = async (req, res) => {
  const result = await ChecklistService.addChecklistDetail(req.body);
  return res.status(201).json(result);
};

export const deleteChecklist = async (req, res) => {
  const { check_id } = req.params;
  const deleted = await ChecklistService.removeChecklist(check_id);

  if (!deleted) {
    throw new AppError(
      "check_id가 존재하지 않습니다.",
      404,
      "CHECKLIST_NOT_FOUND",
      { check_id }
    );
  }

  return res.json(deleted);
};

export const deleteChecklistDetail = async (req, res) => {
  const { id } = req.params;
  const deleted = await ChecklistService.removeChecklistDetail(id);

  if (!deleted) {
    throw new AppError(
      "detail_id가 존재하지 않습니다.",
      404,
      "CHECKLIST_DETAIL_NOT_FOUND",
      { id }
    );
  }

  return res.json(deleted);
};
