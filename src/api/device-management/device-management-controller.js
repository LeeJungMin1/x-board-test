import {
  fetchAdminDevices,
  createAdminDevice,
  updateAdminDevice,
  deleteAdminDevice,
} from "./device-management-service.js";
import { handleError } from "../../utils/common-utils/error-handler.js";

export const getAdminDeviceList = async (req, res) => {
  try {
    const data = await fetchAdminDevices();
    res.status(200).json({ DeviceList: data });
  } catch (error) {
    return handleError(res, error, 500, "ADMIN_DEVICE_LIST_FETCH_FAILED");
  }
};

export const postAdminDevice = async (req, res) => {
  try {
    const result = await createAdminDevice(req.body);
    res.status(201).json(result);
  } catch (error) {
    return handleError(res, error, 500, "ADMIN_DEVICE_CREATE_FAILED");
  }
};

export const putAdminDevice = async (req, res) => {
  try {
    const result = await updateAdminDevice(req.params.item_id, req.body);
    res.status(200).json(result);
  } catch (error) {
    return handleError(res, error, 500, "ADMIN_DEVICE_UPDATE_FAILED");
  }
};

export const deleteAdminDeviceHandler = async (req, res) => {
  try {
    const result = await deleteAdminDevice(req.params.item_id);
    res.status(200).json(result);
  } catch (error) {
    return handleError(res, error, 500, "ADMIN_DEVICE_DELETE_FAILED");
  }
};
