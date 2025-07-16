import { db } from "../../config/db.js";

// ✅ 전체 checklist (device 기준) + 자식 항목 포함
export const getChecklists = async () => {
  try {
    const checklistSql = `SELECT * FROM device_checklist`;
    const checklistResult = await db.query(checklistSql);
    return checklistResult.rows;
  } catch (error) {
    throw new AppError(
      `getChecklists 실패: ${error.message}`,
      500,
      "GET_CHECKLISTS_FAILED"
    );
  }
};

export const getChecklistsDetail = async (check_id) => {
  try {
    const sql = `SELECT * FROM device_checklist_detail WHERE check_id = $1`;
    const checklistDetailResult = await db.query(sql, [check_id]);
    return checklistDetailResult.rows[0];
  } catch (error) {
    throw new AppError(
      `getChecklistsDetail 실패: ${error.message}`,
      500,
      "GET_CHECKLISTS_DETAIL_FAILED"
    );
  }
};

export const getAllChecklistsWithDetails = async (page = 1, limit = 10) => {
  try {
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
  } catch (error) {
    throw new AppError(
      `getAllChecklistsWithDetails 실패: ${error.message}`,
      500,
      "GET_ALL_CHECKLISTS_WITH_DETAILS_FAILED"
    );
  }
};

export const createChecklist = async ({ device_id, text }) => {
  try {
    const sql = `
      INSERT INTO device_checklist (check_id, device_id, text, created_at)
      VALUES (gen_random_uuid()::text, $1, $2, NOW())
      RETURNING *
    `;
    const result = await db.query(sql, [device_id, text]);
    return result.rows[0];
  } catch (error) {
    throw new AppError(
      `createChecklist 실패: ${error.message}`,
      500,
      "CREATE_CHECKLIST_FAILED"
    );
  }
};

export const createChecklistDetail = async ({
  check_id,
  device_id,
  chart_type,
  memo,
  value,
  time,
}) => {
  try {
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
  } catch (error) {
    throw new AppError(
      `createChecklistDetail 실패: ${error.message}`,
      500,
      "CREATE_CHECKLIST_DETAIL_FAILED"
    );
  }
};

export const deleteChecklist = async (checkId) => {
  try {
    const sql = `DELETE FROM device_checklist WHERE check_id = $1 RETURNING *`;
    const result = await db.query(sql, [checkId]);
    return result.rows[0];
  } catch (error) {
    throw new AppError(
      `deleteChecklist 실패: ${error.message}`,
      500,
      "DELETE_CHECKLIST_FAILED"
    );
  }
};

export const deleteChecklistDetail = async (detailId) => {
  try {
    const sql = `DELETE FROM device_checklist_detail WHERE id = $1 RETURNING *`;
    const result = await db.query(sql, [detailId]);
    return result.rows[0];
  } catch (error) {
    throw new AppError(
      `deleteChecklistDetail 실패: ${error.message}`,
      500,
      "DELETE_CHECKLIST_DETAIL_FAILED"
    );
  }
};

export const getChartType = async (device_id) => {
  try {
    const sql = `
      SELECT chart_type
      FROM device_checklist_detail
      WHERE device_id = $1
    `;
    const result = await db.query(sql, [device_id]);
    return result.rows[0];
  } catch (error) {
    throw new AppError(
      `getChartType 실패: ${error.message}`,
      500,
      "GET_CHART_TYPE_FAILED"
    );
  }
};
