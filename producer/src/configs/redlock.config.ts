import Redlock from "redlock";
import { getRedisClient } from "./redis.config";

let redlock: Redlock | null = null;

export const getRedlock = () => {
     if (!redlock) {
          redlock = new Redlock([getRedisClient()], {
               retryCount: 10,
               retryDelay: 200
          })
     }
     return redlock
}