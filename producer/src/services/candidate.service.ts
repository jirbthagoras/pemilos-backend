import { getRedisClient } from "../configs/redis.config"
import { PostCandidateCreate } from "../dtos/candidate.dto"
import { createError } from "../exceptions/error.exception"
import { Candidate } from "../models/candidate.model"
import { User } from "../models/user.model"

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
          const candidates = await Candidate.find().lean()

          return candidates
     } catch (err) {
          throw err
     }
}