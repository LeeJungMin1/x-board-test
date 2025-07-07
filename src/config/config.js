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

// 날씨 API Key 설정
export const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Gemini API Key 설정
export const GEN_AI_API_KEY = process.env.GEN_AI_API_KEY;

// Firebase Key 설정
export const FIREBASE_TYPE = process.env.FIREBASE_TYPE;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
export const FIREBASE_PRIVATE_KEY_ID = process.env.FIREBASE_PRIVATE_KEY_ID;
export const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
export const FIREBASE_CLIENT_ID = process.env.FIREBASE_CLIENT_ID;
export const FIREBASE_AUTH_URI = process.env.FIREBASE_AUTH_URI;
export const FIREBASE_TOKEN_URI = process.env.FIREBASE_TOKEN_URI;
export const FIREBASE_AUTH_PROVIDER_CERT_URL =
  process.env.FIREBASE_AUTH_PROVIDER_CERT_URL;
export const FIREBASE_CLIENT_CERT_URL = process.env.FIREBASE_CLIENT_CERT_URL;
export const FIREBASE_UNIVERSE_DOMAIN = process.env.FIREBASE_UNIVERSE_DOMAIN;
