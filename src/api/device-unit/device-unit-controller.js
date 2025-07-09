import * as UnitService from "./device-unit-service.js";
import { validateDeviceUnitInput } from "../../utils/validate-device-unit.js";
import { handleError } from "../../utils/common-utils/error-handler.js";

export const getDeviceUnits = async (req, res) => {
  try {
    const { device_id } = req.query;

    if (device_id) {
      const units = await UnitService.findDeviceUnitsByDeviceId(device_id);
      return res.json({ data: units });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const allUnits = await UnitService.fetchAllDeviceUnits(page, limit);
    return res.json(allUnits);
  } catch (error) {
    return handleError(res, error, 500, "DEVICE_UNIT_LIST_FAILED");
  }
};

export const getDeviceUnit = async (req, res) => {
  try {
    const { unit_id } = req.params;
    const unit = await UnitService.fetchDeviceUnit(unit_id);

    if (!unit) {
      return res.status(404).json({
        errorCode: "DEVICE_UNIT_NOT_FOUND",
        message: "Unit not found",
      });
    }

    return res.json(unit);
  } catch (error) {
    return handleError(res, error, 500, "DEVICE_UNIT_FETCH_FAILED");
  }
};

export const createDeviceUnit = async (req, res) => {
  try {
    const errorMessage = validateDeviceUnitInput(req.body);

    if (errorMessage) {
      return res.status(400).json({
        errorCode: "DEVICE_UNIT_VALIDATION_FAILED",
        message: errorMessage,
      });
    }

    const newUnit = await UnitService.registerDeviceUnit(req.body);
    return res.status(201).json(newUnit);
  } catch (error) {
    return handleError(res, error, 500, "DEVICE_UNIT_CREATE_FAILED");
  }
};

export const updateDeviceUnit = async (req, res) => {
  try {
    const { unit_id } = req.params;
    const updatedUnit = await UnitService.modifyDeviceUnit(unit_id, req.body);

    if (!updatedUnit) {
      return res.status(404).json({
        errorCode: "DEVICE_UNIT_NOT_FOUND",
        message: "Unit not found",
      });
    }

    return res.json(updatedUnit);
  } catch (error) {
    return handleError(res, error, 500, "DEVICE_UNIT_UPDATE_FAILED");
  }
};

export const deleteDeviceUnit = async (req, res) => {
  try {
    const { unit_id } = req.params;
    const deletedUnit = await UnitService.removeDeviceUnit(unit_id);

    if (!deletedUnit) {
      return res.status(404).json({
        errorCode: "DEVICE_UNIT_NOT_FOUND",
        message: "Unit not found",
      });
    }

    return res.json(deletedUnit);
  } catch (error) {
    return handleError(res, error, 500, "DEVICE_UNIT_DELETE_FAILED");
  }
};

export const getFilteredDeviceUnits = async (req, res) => {
  try {
    const { device_id } = req.query;

    if (device_id) {
      const units = await UnitService.fetchDeviceUnitsByDeviceId(device_id);
      return res.json(units);
    }

    const allUnits = await UnitService.fetchAllDeviceUnits();
    return res.json(allUnits);
  } catch (error) {
    return handleError(res, error, 500, "DEVICE_UNIT_FILTER_FAILED");
  }
};
