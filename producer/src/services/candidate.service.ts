import { PostCandidateCreate } from "../dtos/candidate.dto"
import { createError } from "../exceptions/error.exception"
import { Candidate } from "../models/candidate.model"
import { User } from "../models/user.model"

export const insertCandidate = async (req: PostCandidateCreate) => {
     try {
          // First, make sure if the number is unique
          const countDoc = await Candidate.where({number: req.number}).countDocuments()

          if (countDoc != 0) {
               throw createError(
                    "failed",
                    "number already used by another candidate",
                    400
               )
          }

          const result = await Candidate.insertOne(req)

          return result
     } catch (err) {
          throw err
     }
}