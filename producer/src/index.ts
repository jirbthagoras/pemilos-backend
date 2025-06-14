import express from "express";
import { errorHandler } from "./exceptions/error_handler.exception";
import { rateLimitMiddleware } from "./middlewares/rate-limit.middleware";
import { connect } from "./configs/db.config";
import { adminMiddleware } from "./middlewares/admin.middleware";
import v1Route from "./routes/v1.route"
import { logger } from "./utils/logger.util";
import dotenv from "dotenv";
import path from "path";

// uses the dev .env.dev file 
dotenv.config({ 
  path: path.resolve(__dirname, "../../.env.dev")
})

const app = express()
const port = String(process.env.APP_PORT);

// Attach rate limiter middleware, ensure it works
app.use(rateLimitMiddleware)

// Attach json
app.use(express.json());

// attach the route
app.use("/api/v1/", v1Route)

// Attach the error handler, so that all thrown error can be catch and returned to user.
app.use(errorHandler)


// Just bundles all the things need to be started.
async function bootstrap() {
  // connects to MongoDB
  const status = await connect();

  if (!status) {
    logger.info("Shutting Down the server")
    return
  }
  
  // listens  
  app.listen(port, () => console.log(`Server started on port: ${port}`));
}

bootstrap()