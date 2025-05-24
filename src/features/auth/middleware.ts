import { Request, Response, NextFunction } from "express";
import redis, { REDIS_KEYS } from "@/config/redis";
import { userRepository } from "@/features/users/repository";
import { omitPassword } from "@/lib/omitPassword";
import { AppError } from "@/lib/error";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  
  const sessionID = req.sessionID;
  const userId = req.session.userId;

  if (!sessionID || !userId) throw new AppError("Unauthorized.", 401);

  const redisKey = `${REDIS_KEYS.SESSION}${sessionID}`;

  // Check if session exists in Redis
  const redisSession = await redis.get(redisKey);
  if (!redisSession) throw new AppError("Session expired or invalid.", 401);

  // Ensure session has a valid expiration
  const ttl = await redis.ttl(redisKey);
  if (ttl < 0) throw new AppError("Session has no expiry (invalid).", 401);

  // Fetch the user
  const user = await userRepository.getById(Number(userId));
  if (!user) throw new AppError("User not found.", 404);

  // Extend session expiration
  await redis.expire(redisKey, Number(process.env.SESSION_MAXAGE));

  // Attach user to request
  req.user = omitPassword(user);

  next();
}
