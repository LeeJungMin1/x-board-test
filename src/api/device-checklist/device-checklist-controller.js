import * as ChecklistService from "./device-checklist-service.js";

export const getChecklist = async (req, res) => {
  try {
    const data = await ChecklistService.findChecklist();
    return res.json({ checkList: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getChecklistDetail = async (req, res) => {
  try {
    const { check_id } = req.params;
    const data = await ChecklistService.findChecklistDetail(check_id);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllChecklistsView = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await ChecklistService.findAllChecklistsWithDetails(
      page,
      limit
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createChecklist = async (req, res) => {
  try {
    const result = await ChecklistService.addChecklist(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createChecklistDetail = async (req, res) => {
  try {
    const result = await ChecklistService.addChecklistDetail(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteChecklist = async (req, res) => {
  try {
    const { check_id } = req.params;
    const deleted = await ChecklistService.removeChecklist(check_id);

    if (!deleted) {
      return res.status(404).json({ message: "check_id가 존재하지 않습니다." });
    }

    return res.json(deleted);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteChecklistDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ChecklistService.removeChecklistDetail(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "detail_id가 존재하지 않습니다." });
    }

    return res.json(deleted);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
