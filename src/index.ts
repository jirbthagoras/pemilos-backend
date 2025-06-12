import express from "express";
import { errorHandler } from "./exceptions/error_handler.exception";
import dotenv from "dotenv"
import { rateLimitMiddleware } from "./middlewares/rate-limit.middleware";

const app = express()

const port = 5000;

dotenv.config()

// Attach rate limiting cuz y not
app.use(rateLimitMiddleware)

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Node Express!');
});

// Attach the error handler, so that all thrown error can be catch and returned to user.
app.use(errorHandler)

// The app listens
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})