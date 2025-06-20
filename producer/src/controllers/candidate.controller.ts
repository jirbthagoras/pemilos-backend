import { PostCandidateCreate } from "../dtos/candidate.dto";
import { asyncHandler } from "../middlewares/async_handler.middleware";
import { candidateGet, candidateInsert } from "../services/candidate.service";

export const createCandidate = asyncHandler(async (req, res) => {
     // parse the request
     const {
          name,
          label,
          number,
     } = req.body

     // calls the user service
     const result = await candidateInsert({
          name,
          label,
          number,
     } as PostCandidateCreate)

     res.status(201).json({
          "status": "success",
          "message": "candidate successfully created",
          "data": result
     })
})

export const getCandidate = asyncHandler(async (req, res) => {
     // Calls the candidate service
     const candidates = await candidateGet()

     res.status(200).json({
          "status": "success",
          "message": "successfully query the candidates",
          "data": candidates
     })
     return
})