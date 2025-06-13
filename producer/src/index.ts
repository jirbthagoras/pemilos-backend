import express from "express";
import { errorHandler } from "./exceptions/error_handler.exception";
import dotenv from "dotenv"
import { rateLimitMiddleware } from "./middlewares/rate-limit.middleware";
import { connect } from "./config/db.config";

dotenv.config()

const app = express()
const port = String(process.env.APP_PORT);

// connect to mongodb

// Attach rate limiter middleware, ensure it works
app.use(rateLimitMiddleware)

app.get('/', (req, res) => {
  res.status(200).json({
    "status": "success",
    "message": "This is the /"
  })
});

// Attach the error handler, so that all thrown error can be catch and returned to user.
app.use(errorHandler)

async function bootstrap() {
  await connect();
  app.listen(3000, () => console.log("Server started on http://localhost:3000"));
}

bootstrap()