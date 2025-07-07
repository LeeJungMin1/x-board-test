export const validateMaintenancePayload = (payload) => {
  const { start_time, end_time, uid, total_cnt, CheckDetail } = payload;

  if (
    !start_time ||
    !end_time ||
    !uid ||
    !total_cnt ||
    !Array.isArray(CheckDetail)
  ) {
    return false;
  }

  for (const item of CheckDetail) {
    const { check_id, device_id, chart_type, memo, time, value } = item;
    if (!check_id || !device_id || !time || value === undefined) {
      return false;
    }
  }

  return true;
};
