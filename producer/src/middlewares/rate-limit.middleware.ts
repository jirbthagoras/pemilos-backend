import { NextFunction, Request, Response } from "express";
import { getRedisClient } from "../configs/redis.config";
import { createError } from "../exceptions/error.exception";
import { MiddlewareHandler } from "../utils/types.util";

const WINDOW_SIZE_IN_SECONDS = 60
const MAX_REQUESTS = 5

// This sliding window algorithm utilize, Redis' ZSET (Sorted set)
// To organize the request history.
export const rateLimitMiddleware = async (handler: MiddlewareHandler) => {
     // Create redis client first
     const redis = await getRedisClient()

     // Init some vars like ip, key name format, and the now.
     const userIp = handler.req.ip || 'global'
     const key = `rate-limit:${userIp}`
     const now = Date.now()

     // delete sets that're older than 60 ago
     await redis.zRemRangeByScore(key, 0, now - WINDOW_SIZE_IN_SECONDS * 1000)

     // Count all the requests inside the ZSET
     const reqCount = await redis.zCard(key)

     // Throw the error if the request count inside the sorted sets is reached limit
     if (reqCount >= MAX_REQUESTS) {
          throw createError("unauthorized", "Request rate reached the limit", 401)
     }

     // If it passed, just add more score inside the sets.
     await redis.zAdd(key, [
          {
               score: now,
               value: now.toString()
          }
     ])
     // Expire the sets, so that the rate limiter remain clear.
     await redis.expire(key, WINDOW_SIZE_IN_SECONDS)

     handler.next()
}