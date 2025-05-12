import {
  fetchAllDeviceUnits,
  fetchDeviceUnit,
  registerDeviceUnit,
  modifyDeviceUnit,
  removeDeviceUnit,
  findDeviceUnitsByDeviceId,
} from "./device-unit-service.js";

import { validateDeviceUnitInput } from "../../utils/validate-device-unit.js";

export const getDeviceUnits = async (req, res) => {
  try {
    const { device_id } = req.query;

    if (device_id) {
      const units = await findDeviceUnitsByDeviceId(device_id);
      return res.json(units);
    }

    const allUnits = await fetchAllDeviceUnits();
    return res.json(allUnits);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getDeviceUnit = async (req, res) => {
  try {
    const { unit_id } = req.params;
    const unit = await fetchDeviceUnit(unit_id);

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    return res.json(unit);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createDeviceUnit = async (req, res) => {
  try {
    const errorMessage = validateDeviceUnitInput(req.body);

    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    const newUnit = await registerDeviceUnit(req.body);
    return res.status(201).json(newUnit);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateDeviceUnit = async (req, res) => {
  try {
    const { unit_id } = req.params;
    const updatedUnit = await modifyDeviceUnit(unit_id, req.body);

    if (!updatedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    return res.json(updatedUnit);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteDeviceUnit = async (req, res) => {
  try {
    const { unit_id } = req.params;
    const deletedUnit = await removeDeviceUnit(unit_id);

    if (!deletedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    return res.json(deletedUnit);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getFilteredDeviceUnits = async (req, res) => {
  try {
    const { device_id } = req.query;

    if (device_id) {
      const units = await fetchDeviceUnitsByDeviceId(device_id);
      return res.json(units);
    }

    const allUnits = await fetchAllDeviceUnits();
    return res.json(allUnits);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
