import mongoose from "mongoose"
import { logger } from "../utils/logger.util"
import { boolean } from "zod"

export const connect = async () => {
     const DB_USERNAME = String(process.env.MONGODB_ROOT_USER)
     const DB_PASSWORD = String(process.env.MONGODB_ROOT_PASSWORD)
     const DB_NAME = String(process.env.MONGODB_DATABASE)
     const DB_HOST = String(process.env.MONGO_HOST)
     const DB_PORT = String(process.env.MONGO_PORT)

     const uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

     try {
          await mongoose.connect(uri, {
               serverSelectionTimeoutMS: 5000,
               connectTimeoutMS: 5000,
               authSource: 'admin',
          })
          logger.info("Connection to database established")
          return true
     } catch (err) {
          logger.error("Failed to establish a connection to database")
          return false
     }
}