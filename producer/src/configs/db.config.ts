import mongoose from "mongoose"
import { logger } from "../utils/logger.util"
import { createError } from "../exceptions/error.exception"

const DB_USERNAME = String(process.env.MONGO_INITDB_ROOT_USERNAME)
const DB_PASSWORD = String(process.env.MONGO_INITDB_ROOT_PASSWORD)
const DB_NAME = String(process.env.MONGODB_DATABASE)
const DB_HOST = String(process.env.MONGO_HOST)
const DB_PORT = String(process.env.MONGO_PORT)

const uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`

export const connect = async () => {
     try {
          await mongoose.connect(uri)
          logger.info("Connected to db")
          return
     } catch (err) {
          logger.error("Failed to connect to mongo")
          return 
     }
}