import * as UnitService from "./device-unit-service.js";
import { validateDeviceUnitInput } from "../../utils/validate-device-unit.js";
import { AppError } from "../../utils/common-utils/error-handler.js";

export const getDeviceUnits = async (req, res) => {
  const { device_id } = req.query;

  if (device_id) {
    const units = await UnitService.findDeviceUnitsByDeviceId(device_id);
    return res.json({ data: units });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const allUnits = await UnitService.fetchAllDeviceUnits(page, limit);
  return res.json(allUnits);
};

export const getDeviceUnit = async (req, res) => {
  const { unit_id } = req.params;
  const unit = await UnitService.fetchDeviceUnit(unit_id);

  if (!unit) {
    throw new AppError("Unit not found", 404, "DEVICE_UNIT_NOT_FOUND", {
      unit_id,
    });
  }

  return res.json(unit);
};

export const createDeviceUnit = async (req, res) => {
  const errorMessage = validateDeviceUnitInput(req.body);

  if (errorMessage) {
    throw new AppError(errorMessage, 400, "DEVICE_UNIT_VALIDATION_FAILED", {
      body: req.body,
    });
  }

  const newUnit = await UnitService.registerDeviceUnit(req.body);
  return res.status(201).json(newUnit);
};

export const updateDeviceUnit = async (req, res) => {
  const { unit_id } = req.params;
  const updatedUnit = await UnitService.modifyDeviceUnit(unit_id, req.body);

  if (!updatedUnit) {
    throw new AppError("Unit not found", 404, "DEVICE_UNIT_NOT_FOUND", {
      unit_id,
    });
  }

  return res.json(updatedUnit);
};

export const deleteDeviceUnit = async (req, res) => {
  const { unit_id } = req.params;
  const deletedUnit = await UnitService.removeDeviceUnit(unit_id);

  if (!deletedUnit) {
    throw new AppError("Unit not found", 404, "DEVICE_UNIT_NOT_FOUND", {
      unit_id,
    });
  }

  return res.json(deletedUnit);
};

export const getFilteredDeviceUnits = async (req, res) => {
  const { device_id } = req.query;

  if (device_id) {
    const units = await UnitService.fetchDeviceUnitsByDeviceId(device_id);
    return res.json(units);
  }

  const allUnits = await UnitService.fetchAllDeviceUnits();
  return res.json(allUnits);
};
