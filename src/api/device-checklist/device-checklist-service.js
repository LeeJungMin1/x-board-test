import {
  getChecklists,
  getChecklistsDetail,
  createChecklist,
  createChecklistDetail,
  deleteChecklist,
  deleteChecklistDetail,
  getAllChecklistsWithDetails,
} from "./device-checklist-model.js";

export const findChecklist = async () => {
  return await getChecklists();
};

export const findChecklistDetail = async (check_id) => {
  return await getChecklistsDetail(check_id);
};

export const findAllChecklistsWithDetails = async (page, limit) => {
  return await getAllChecklistsWithDetails(page, limit);
};

export const addChecklist = async (data) => {
  return await createChecklist(data);
};

export const addChecklistDetail = async (data) => {
  return await createChecklistDetail(data);
};

export const removeChecklist = async (checkId) => {
  return await deleteChecklist(checkId);
};

export const removeChecklistDetail = async (detailId) => {
  return await deleteChecklistDetail(detailId);
};
