import { getRedisClient } from "../configs/redis.config";
import { MiddlewareHandler } from "../utils/types.util";

// this rate limit just limits the backend application and not both.
// for the frontend i most likely will use something like nginx rate limiter.

// This sliding window algorithm utilize, Redis' ZSET (Sorted set)
// To organize the request history.
export const rateLimitMiddleware: MiddlewareHandler = async (req, res, next) => {
     
     // Checks and casts the provided env
     const WINDOW_SIZE_IN_SECONDS = +String(process.env.WINDOW_SIZE_IN_SECONDS) || 60;
     const MAX_REQUESTS = +String(process.env.MAX_REQUESTS) || 5;

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
               "status": "failed",
               "message": "too many request"
          })
          return
     }

     // If it passed, just add more score inside the sets.
     await redis.zadd(key, now, now.toString())
     // Expire the sets, so that the rate limiter remain clear.
     await redis.expire(key, WINDOW_SIZE_IN_SECONDS)

     next()
}