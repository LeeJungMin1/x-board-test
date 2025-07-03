import {
  fetchAdminDevices,
  createAdminDevice,
  updateAdminDevice,
  deleteAdminDevice,
} from "./device-management-service.js";

export const getAdminDeviceList = async (req, res) => {
  try {
    const data = await fetchAdminDevices();
    res.status(200).json({ DeviceList: data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to load devices", error: error.message });
  }
};

export const postAdminDevice = async (req, res) => {
  try {
    const result = await createAdminDevice(req.body);
    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create device", error: error.message });
  }
};

export const putAdminDevice = async (req, res) => {
  try {
    const result = await updateAdminDevice(req.params.item_id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update device", error: error.message });
  }
};

export const deleteAdminDeviceHandler = async (req, res) => {
  try {
    const result = await deleteAdminDevice(req.params.item_id);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete device", error: error.message });
  }
};
