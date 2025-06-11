import express from "express";
import { errorHandler } from "./exceptions/error_handler.exception";
import dotenv from "dotenv"
import { redisClient } from "./config/redis.config";

const app = express()

const port = 5000;

const redis = redisClient()
redis.ping

dotenv.config()

app.get('/', (req, res) => {
  res.send('Hello, TypeScript Node Express!');
});

app.get('/a', (req, res) => {
  res.send('Iwbal anjas!');
});

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})