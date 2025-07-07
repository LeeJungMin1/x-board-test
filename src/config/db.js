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
