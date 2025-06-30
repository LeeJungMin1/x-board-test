import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS, // .env에서 설정해도 됨
});

redisClient.on("error", (err) => console.error("❌ Redis Error", err));

await redisClient.connect(); // async 환경 필요 시 별도 init 가능

export default redisClient;
