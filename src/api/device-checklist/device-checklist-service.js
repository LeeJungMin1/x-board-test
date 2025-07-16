import * as ChecklistModel from "./device-checklist-model.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const findChecklist = async () => {
  try {
    return await ChecklistModel.getChecklists();
  } catch (error) {
    throw new AppError(
      `findChecklist 실패: ${error.message}`,
      500,
      "FIND_CHECKLIST_FAILED"
    );
  }
};

export const findChecklistDetail = async (check_id) => {
  try {
    return await ChecklistModel.getChecklistsDetail(check_id);
  } catch (error) {
    throw new AppError(
      `findChecklistDetail 실패: ${error.message}`,
      500,
      "FIND_CHECKLIST_DETAIL_FAILED"
    );
  }
};

export const findAllChecklistsWithDetails = async (page, limit) => {
  try {
    return await ChecklistModel.getAllChecklistsWithDetails(page, limit);
  } catch (error) {
    throw new AppError(
      `findAllChecklistsWithDetails 실패: ${error.message}`,
      500,
      "FIND_ALL_CHECKLISTS_WITH_DETAILS_FAILED"
    );
  }
};

export const addChecklist = async (data) => {
  try {
    return await ChecklistModel.createChecklist(data);
  } catch (error) {
    throw new AppError(
      `addChecklist 실패: ${error.message}`,
      500,
      "ADD_CHECKLIST_FAILED"
    );
  }
};

export const addChecklistDetail = async (data) => {
  try {
    return await ChecklistModel.createChecklistDetail(data);
  } catch (error) {
    throw new AppError(
      `addChecklistDetail 실패: ${error.message}`,
      500,
      "ADD_CHECKLIST_DETAIL_FAILED"
    );
  }
};

export const removeChecklist = async (checkId) => {
  try {
    return await ChecklistModel.deleteChecklist(checkId);
  } catch (error) {
    throw new AppError(
      `removeChecklist 실패: ${error.message}`,
      500,
      "REMOVE_CHECKLIST_FAILED"
    );
  }
};

export const removeChecklistDetail = async (detailId) => {
  try {
    return await ChecklistModel.deleteChecklistDetail(detailId);
  } catch (error) {
    throw new AppError(
      `removeChecklistDetail 실패: ${error.message}`,
      500,
      "REMOVE_CHECKLIST_DETAIL_FAILED"
    );
  }
};

export const findChartType = async (deviceId) => {
  try {
    return await ChecklistModel.getChartType(deviceId);
  } catch (error) {
    throw new AppError(
      `findChartType 실패: ${error.message}`,
      500,
      "FIND_CHART_TYPE_FAILED"
    );
  }
};
