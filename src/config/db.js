import pkg from "pg";
import dotenv from "dotenv";

const { Pool, Client } = pkg;

dotenv.config();

export const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
});

export const listenClient = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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
