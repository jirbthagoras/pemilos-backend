import { connectToMongoose, disconnectMongo } from "../configs/db.config";
import { disconnectRedis, getRedisClient } from "../configs/redis.config";
import { logger } from "./logger.util";
import { createServer, Server } from "http";
import express from "express"
import { RedisSettingCache } from "./types.util";


let server: Server; // this will hold our HTTP server instance

export async function bootstrap(app: express.Express, port: string) {
  const mongoConnected = await connectToMongoose();
  await initSetting()
  if (!mongoConnected) {
  logger.error("Failed to connect to MongoDB. Exiting.");
    process.exit(1);
  }

  // create HTTP server manually so we can close it later
  server = createServer(app);

  server.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });

  // Graceful shutdown handlers
  const cleanup = async () => {
    await shutdown(server);
  };

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  process.on("unhandledRejection", async (reason: any) => {
    logger.error("Unhandled Rejection:", reason);
    await cleanup();
  });

  process.on("uncaughtException", async (err: Error) => {
    logger.error("Uncaught Exception:", err);
    await cleanup();
  });
}

export const shutdown = async (server: Server) => {
  logger.info("Starting graceful shutdown...");

  try {
    logger.info("Closing HTTP server...");
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    logger.info("Disconnecting MongoDB...");
    await disconnectMongo();

    logger.info("Disconnecting Redis...");
    await disconnectRedis();

    logger.info("Shutdown complete. Bye!");
    process.exit(0);
  } catch (err) {
    logger.error("Error during shutdown:", err);
    process.exit(1);
  }
};


export const initSetting = async () => {
  const redis = getRedisClient()

  const key = "setting";

  // for debugging
  const setting: RedisSettingCache = {
    isVotingAllowed: "true",
    candidates: ""
  }

  await redis.hset(key, setting)

  logger.info("Setting initiation succeeded")

  return
}