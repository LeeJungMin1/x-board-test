import * as DeviceService from "./device-service.js";

export const getDevices = async (req, res) => {
  try {
    const devices = await DeviceService.listDevices();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDeviceDetail = async (req, res) => {
  try {
    const { device_id } = req.params;
    const device = await DeviceService.findDeviceDetail(device_id);

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    return res.json(device);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllDeviceDetails = async (req, res) => {
  try {
    const devices = await DeviceService.listAllDeviceDetails();
    return res.json(devices);
  } catch (error) {
    console.error("❌ getAllDeviceDetails 에러:", error);
    return res.status(500).json({ error: error.message });
  }
};
