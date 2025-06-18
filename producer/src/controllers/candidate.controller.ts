import { PostCandidateCreate } from "../dtos/candidate.dto";
import { asyncHandler } from "../middlewares/async_handler.middleware";
import { insertCandidate } from "../services/candidate.service";

export const createCandidate = asyncHandler(async (req, res) => {
     // parse the request
     const {
          name,
          label,
          number,
          image
     } = req.body

     // calls the user service
     const result = await insertCandidate({
          name,
          label,
          number,
          image
     } as PostCandidateCreate)

     res.status(201).json({
          "status": "success",
          "message": "candidate successfully created",
          "data": result
     })
})