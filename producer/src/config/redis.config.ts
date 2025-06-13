import { createClient } from "redis";
import { logger } from "../models/utils/logger.util";

const USERNAME = String(process.env.REDIS_USERNAME);
const PASSWORD = String(process.env.REDIS_PASSWORD);
const PORT = String(process.env.REDIS_PORT);
const HOST = String(process.env.REDIS_HOST);

const url = `redis://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`;

const client = createClient({ url });

client.on("error", (err) => logger.error("Redis Client Error", err));

// Yes, this code is very confusing but trust me. Creating a new connection over and over will makes the app overwhelmed.
let connected = false;

export const getRedisClient = async () => {
  if (!connected) {
    logger.info("Connecting Redis client...");
    await client.connect();
    connected = true;
    logger.info("Connected to redis client.")
  }
  return client;
};
