import { createClient } from "redis";
import { REDIS_URL } from "../config/config.js";

const redisClient = createClient({
  url: REDIS_URL, // .env에서 설정해도 됨
});

redisClient.on("error", (err) => console.error("❌ Redis Error", err));

await redisClient.connect(); // async 환경 필요 시 별도 init 가능

export default redisClient;
