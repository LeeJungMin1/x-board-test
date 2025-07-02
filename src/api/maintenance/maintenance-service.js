import { db } from "../../config/db.js";

export const getMaintenanceHistoryGrouped = async (limit) => {
  try {
    // 1. 최근 세션 가져오기
    const sessionRes = await db.query(
      `SELECT session_id
       FROM device_maintenance
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    );

    const sessionIds = sessionRes.rows.map((row) => row.session_id);

    if (sessionIds.length === 0) {
      return [];
    }

    // 2. session_id에 해당하는 메타 + 상세 데이터 가져오기
    const placeholders = sessionIds.map((_, i) => `$${i + 1}`).join(",");

    const metaRes = await db.query(
      `SELECT *
       FROM device_maintenance
       WHERE session_id IN (${placeholders})`,
      sessionIds
    );

    const detailRes = await db.query(
      `SELECT *
       FROM device_maintenance_detail
       WHERE session_id IN (${placeholders})
       ORDER BY id ASC`,
      sessionIds
    );

    const metaMap = Object.fromEntries(
      metaRes.rows.map((row) => [row.session_id, row])
    );

    const grouped = sessionIds.map((sessionId) => {
      const meta = metaMap[sessionId];
      const records = detailRes.rows.filter((r) => r.session_id === sessionId);

      return {
        session_id: sessionId,
        start_time: meta?.start_time || null,
        end_time: meta?.end_time || null,
        uid: meta?.uid || null,
        total_cnt: meta?.total_cnt || null,
        CheckDetail: records.map((r) => ({
          check_id: r.check_id,
          device_id: r.device_id,
          chart_type: r.chart_type,
          memo: r.memo,
          time: r.time,
          value: r.value,
        })),
      };
    });

    return grouped;
  } catch (err) {
    throw new Error(`Failed to load maintenance history: ${err.message}`);
  }
};

export const saveMaintenanceRecords = async (sessionId, payload) => {
  const { start_time, end_time, uid, total_cnt, CheckDetail } = payload;

  const client = await db.connect();
  try {
    await client.query("BEGIN");

    // 1. device_maintenance 삽입
    await client.query(
      `INSERT INTO device_maintenance
        (session_id, uid, start_time, end_time, total_cnt, pdf_path, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [sessionId, uid, start_time, end_time, total_cnt, "none.pdf"]
    );

    // 2. 각 상세 항목 삽입
    const detailInsertQuery = `
      INSERT INTO device_maintenance_detail
        (session_id, check_id, device_id, chart_type, memo, time, value)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    for (const record of CheckDetail) {
      const values = [
        sessionId,
        record.check_id,
        record.device_id,
        record.chart_type || "",
        record.memo || "",
        record.time,
        record.value,
      ];
      await client.query(detailInsertQuery, values);
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
