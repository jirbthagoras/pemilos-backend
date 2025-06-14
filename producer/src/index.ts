import express from "express";
import { errorHandler } from "./exceptions/error_handler.exception";
import { rateLimitMiddleware } from "./middlewares/rate-limit.middleware";
import { connect } from "./configs/db.config";
import { adminMiddleware } from "./middlewares/admin.middleware";
import v1Route from "./routes/v1.route"
import { logger } from "./utils/logger.util";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") })

const app = express()
const port = String(process.env.APP_PORT);

// Attach rate limiter middleware, ensure it works
app.use(rateLimitMiddleware)

// // // attach admin middleware
// // app.use(adminMiddleware);

// Attach json
app.use(express.json());

// attach the route
app.use("/api/v1/", v1Route)

// Attach the error handler, so that all thrown error can be catch and returned to user.
app.use(errorHandler)

async function bootstrap() {
  // connects to MongoDB
  await connect();
  // listens  
  app.listen(port, () => console.log(`Server started on port: ${port}`));
}

bootstrap()