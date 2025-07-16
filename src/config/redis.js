import { createClient } from "redis";
import logger from "../utils/common-utils/logger.js";
import { REDIS_URL } from "../config/config.js";

const redisClient = createClient({
  url: REDIS_URL, // .env에서 설정해도 됨
});

redisClient.on("error", (err) => {
  logger.error("❌ Redis Client Error", {
    message: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

await redisClient.connect(); // async 환경 필요 시 별도 init 가능

export default redisClient;
