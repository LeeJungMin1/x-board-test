import * as ChecklistModel from "./device-checklist-model.js";

export const findChecklist = async () => {
  return await ChecklistModel.getChecklists();
};

export const findChecklistDetail = async (check_id) => {
  return await ChecklistModel.getChecklistsDetail(check_id);
};

export const findAllChecklistsWithDetails = async (page, limit) => {
  return await ChecklistModel.getAllChecklistsWithDetails(page, limit);
};

export const addChecklist = async (data) => {
  return await ChecklistModel.createChecklist(data);
};

export const addChecklistDetail = async (data) => {
  return await ChecklistModel.createChecklistDetail(data);
};

export const removeChecklist = async (checkId) => {
  return await ChecklistModel.deleteChecklist(checkId);
};

export const removeChecklistDetail = async (detailId) => {
  return await ChecklistModel.deleteChecklistDetail(detailId);
};

export const findChartType = async (deviceId) => {
  return await ChecklistModel.getChartType(deviceId);
};
