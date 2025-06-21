import { json } from "stream/consumers"
import { getRedisClient } from "../configs/redis.config"
import { PostCandidateCreate } from "../dtos/candidate.dto"
import { createError } from "../exceptions/error.exception"
import { Candidate } from "../models/candidate.model"
import { User } from "../models/user.model"
import { RedisCandidate } from "../utils/types.util"
import { logger } from "../utils/logger.util"

export const candidateInsert = async (req: PostCandidateCreate) => {
     try {
          const result = await Candidate.insertOne(req)

          return result
     } catch (err) {
          throw err
     }
}

export const candidateGet = async () => {
     try {
          // implements caching.
          // first init, vars
          const redis = getRedisClient()
          const keyName = "candidate:cache";

          // getting caches resource from redis.
          const cached = await redis.get(keyName)

          if (cached) {
               // take the cached
               const parsed = JSON.parse(cached)
               logger.info("Candidates cached")
               return parsed as RedisCandidate[]
          }

          // get candidate manually from db.
          const candidates = await Candidate.find().lean()

          // set the new cache
          await redis.set(keyName, JSON.stringify(candidates))

          return candidates
     } catch (err) {
          throw err
     }
}