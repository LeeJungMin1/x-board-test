import { db } from "../../config/db.js";

// ✅ 전체 checklist (device 기준) + 자식 항목 포함
export const getChecklists = async () => {
  const checklistSql = `
    SELECT * FROM device_checklist
    `;
  const checklistResult = await db.query(checklistSql);
  const checklistItems = checklistResult.rows;

  return checklistItems;
};

export const getChecklistsDetail = async (check_id) => {
  const sql = `
  SELECT * FROM device_checklist_detail WHERE check_id = $1
  `;
  const checklistDetailResult = await db.query(sql, [check_id]);
  const checklistDetailItems = checklistDetailResult.rows[0];

  return checklistDetailItems;
};

export const getAllChecklistsWithDetails = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const totalResult = await db.query(`SELECT COUNT(*) FROM device_checklist`);
  const total = parseInt(totalResult.rows[0].count);

  const sql = `
    SELECT
      c.check_id, c.device_id, c.text, c.created_at AS checklist_created_at,
      d.id AS detail_id, d.chart_type, d.memo, d.value, d.time, d.created_at AS detail_created_at
    FROM device_checklist c
    LEFT JOIN device_checklist_detail d ON c.check_id = d.check_id
    ORDER BY c.created_at ASC, d.id ASC
    LIMIT $1 OFFSET $2
  `;

  const result = await db.query(sql, [limit, offset]);
  const rows = result.rows;

  const grouped = {};
  for (const row of rows) {
    if (!grouped[row.check_id]) {
      grouped[row.check_id] = {
        check_id: row.check_id,
        device_id: row.device_id,
        text: row.text,
        created_at: row.checklist_created_at,
        details: [],
      };
    }
    if (row.detail_id) {
      grouped[row.check_id].details.push({
        id: row.detail_id,
        chart_type: row.chart_type,
        memo: row.memo,
        value: row.value,
        time: row.time,
        created_at: row.detail_created_at,
      });
    }
  }

  return {
    data: Object.values(grouped),
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const createChecklist = async ({ device_id, text }) => {
  const sql = `
    INSERT INTO device_checklist (check_id, device_id, text, created_at)
    VALUES (gen_random_uuid()::text, $1, $2, NOW())
    RETURNING *
  `;
  const result = await db.query(sql, [device_id, text]);
  return result.rows[0];
};

export const createChecklistDetail = async ({
  check_id,
  device_id,
  chart_type,
  memo,
  value,
  time,
}) => {
  const sql = `
    INSERT INTO device_checklist_detail (check_id, device_id, chart_type, memo, value, time, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW())
    RETURNING *
  `;
  const result = await db.query(sql, [
    check_id,
    device_id,
    chart_type,
    memo,
    value,
    time,
  ]);
  return result.rows[0];
};

export const deleteChecklist = async (checkId) => {
  const sql = `DELETE FROM device_checklist WHERE check_id = $1 RETURNING *`;
  const result = await db.query(sql, [checkId]);
  return result.rows[0];
};

export const deleteChecklistDetail = async (detailId) => {
  const sql = `DELETE FROM device_checklist_detail WHERE id = $1 RETURNING *`;
  const result = await db.query(sql, [detailId]);
  return result.rows[0];
};

export const getChartType = async (device_id) => {
  const sql = `
    SELECT chart_type
    FROM device_checklist_detail
    WHERE device_id = $1
    `;
  const result = await db.query(sql, [device_id]);
  return result.rows[0];
};
