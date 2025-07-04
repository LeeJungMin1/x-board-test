import dotenv from "dotenv";

dotenv.config();

// EXPRESS SERVER PORT 설정
export const API_SERVER_PORT = process.env.API_SERVER_PORT;

// Node 모드 설정 (개발모드 OR 운영모드)
export const NODE_ENV = process.env.NODE_ENV;

// DB 설정
export const DB_USER = process.env.DB_USER;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;

// Redis 주소 설정
export const REDIS_URL = process.env.REDIS_URL;

// JWT 토큰 설정
export const JWT_SECRET = process.env.JWT_SECRET;
