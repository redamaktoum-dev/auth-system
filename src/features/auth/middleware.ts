import { Request, Response, NextFunction } from "express";
import redis, { REDIS_KEYS } from "@/config/redis";
import { userRepository } from "@/features/users/repository";
import { omitPassword } from "@/lib/omitPassword";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  
  const sessionID = req.sessionID;
  const userId = req.session.userId;

  if (!sessionID || !userId) {
    throw new Error("Unauthorized.");
  }

  const redisKey = `${REDIS_KEYS.SESSION}${sessionID}`;

  // Check if session exists in Redis
  const redisSession = await redis.get(redisKey);
  if (!redisSession) {
    throw new Error("Session expired or invalid.");
  }

  // Ensure session has a valid expiration
  const ttl = await redis.ttl(redisKey);
  if (ttl < 0) {
    throw new Error("Session has no expiry (invalid).");
  }

  // Fetch the user
  const user = await userRepository.getById(Number(userId));
  if (!user) {
    throw new Error("User not found.");
  }

  // Extend session expiration
  await redis.expire(redisKey, Number(process.env.SESSION_MAXAGE));

  // Attach user to request
  req.user = omitPassword(user);

  next();
}
