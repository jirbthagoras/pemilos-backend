import { createClient } from "redis";
import { logger } from "../utils/logger.utils";

// Redis here will be used as a Rate Limiting with sliding window algorithm

const USERNAME: string = String(process.env.REDIS_USERNAME)
const PASSWORD: string = String(process.env.REDIS_PASSWORD)
const PORT: string = String(process.env.REDIS_PORT)
const HOST: string = String(process.env.REDIS_HOST)

const url = `redis://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`

export const redisClient = () => {
     logger.info("Creating a Redis client")
     return createClient({
          url
     });
}