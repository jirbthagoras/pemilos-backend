import { getRedisClient } from "../configs/redis.config";
import { createError } from "../exceptions/error.exception";
import { logger } from "../utils/logger.util";
import { MiddlewareHandler } from "../utils/types.util";

// This sliding window algorithm utilize, Redis' ZSET (Sorted set)
// To organize the request history.
export const rateLimitMiddleware: MiddlewareHandler = async (req, res, next) => {
     
     let WINDOW_SIZE_IN_SECONDS: number;
     let MAX_REQUESTS: number;

     // checks if the env exists
     if (
          !process.env.WINDOW_SIZE_IN_SECONDS ||
          !process.env.MAX_REQUESTS
     ) {
          WINDOW_SIZE_IN_SECONDS = 60
          MAX_REQUESTS = 5
     } else {
          WINDOW_SIZE_IN_SECONDS = +process.env.WINDOW_SIZE_IN_SECONDS
          MAX_REQUESTS = +process.env.MAX_REQUESTS
     }

     // Create redis client first
     const redis = getRedisClient()

     // Init some vars like ip, key name format, and the now.
     const userIp = req.ip || 'global'
     const key = `rate-limit:${userIp}`
     const now = Date.now()

     // delete sets that're older than 60 ago
     await redis.zremrangebyscore(key, 0, now - WINDOW_SIZE_IN_SECONDS * 1000)

     // Count all the requests inside the ZSET
     const reqCount = await redis.zcard(key)

     // Throw the error if the request count inside the sorted sets is reached limit
     if (reqCount >= MAX_REQUESTS) {
          res.status(429).json({
               "status": "unauthorized",
               "message": "you already reached the request limit"
          })
          return
     }

     // If it passed, just add more score inside the sets.
     await redis.zadd(key, now, now.toString())
     // Expire the sets, so that the rate limiter remain clear.
     await redis.expire(key, WINDOW_SIZE_IN_SECONDS)

     next()
}