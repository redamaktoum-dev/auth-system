// Necessary imports
import dotenv from "dotenv";
import Redis from "ioredis";

// Load environment variables
dotenv.config();

export const REDIS_KEYS = {
  ROOT: "auth-system:",
  SESSION: "session:"
}

const redis = new Redis({
  host: String(process.env.REDIS_HOST),
  port: Number(process.env.REDIS_PORT),
  password: String(process.env.REDIS_PASSWORD) || undefined,
  db: Number(process.env.REDIS_DATABASE),
  keyPrefix: REDIS_KEYS.ROOT
})

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (error) => {
  console.error("Redis error", error);
});

export default redis;