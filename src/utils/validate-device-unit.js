export const validateDeviceUnitInput = ({
  device_id,
  telemetry_key,
  unit,
  property,
}) => {
  if (!device_id || !telemetry_key || !unit || !property) {
    return "[ device_id, telemetry_key, unit, property ] 필드는 필수입니다.";
  }
  return null;
};
