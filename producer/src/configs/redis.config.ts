import { createClient } from "redis";
import { logger } from "../utils/logger.util";
import Redis from "ioredis";

export const getRedisClient = () => {
  const USERNAME = process.env.REDIS_USERNAME;
  const PASSWORD = process.env.REDIS_PASSWORD;
  const PORT = process.env.REDIS_PORT;
  const HOST = process.env.REDIS_HOST;

  const url = `redis://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`;

  return new Redis(url)
}