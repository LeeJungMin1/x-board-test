import {
  fetchAdminDevices,
  createAdminDevice,
  updateAdminDevice,
  deleteAdminDevice,
} from "./device-management-service.js";

export const getAdminDeviceList = async (req, res) => {
  const data = await fetchAdminDevices();
  res.status(200).json({ DeviceList: data });
};

export const postAdminDevice = async (req, res) => {
  const result = await createAdminDevice(req.body);
  res.status(201).json(result);
};

export const putAdminDevice = async (req, res) => {
  const result = await updateAdminDevice(req.params.item_id, req.body);
  res.status(200).json(result);
};

export const deleteAdminDeviceHandler = async (req, res) => {
  const result = await deleteAdminDevice(req.params.item_id);
  res.status(200).json(result);
};
