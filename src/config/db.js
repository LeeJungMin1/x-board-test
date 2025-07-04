import pkg from "pg";
import {
  DB_USER,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASSWORD,
} from "../config/config.js";

const { Pool, Client } = pkg;

export const db = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
});

export const listenClient = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// export const connectListener = async () => {
//   try {
//     await listenClient.connect();
//     console.log('✅ LISTEN용 PostgreSQL Client 연결 성공');
//     await listenClient.query('LISTEN telemetry_changes');
//   } catch (error) {
//     console.error('❌ LISTEN Client 연결 실패:', error.message);
//     process.exit(1);
//   }
// };
