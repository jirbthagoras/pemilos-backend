import Redis from "ioredis";
import { logger } from "../utils/logger.util";

export const getRedisClient = () => {
  const USERNAME = process.env.REDIS_USERNAME;
  const PASSWORD = process.env.REDIS_PASSWORD;
  const PORT = process.env.REDIS_PORT;
  const HOST = process.env.REDIS_HOST;

  const url = `redis://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`;

  logger.info("Connected to redis")

  return new Redis(url)
}