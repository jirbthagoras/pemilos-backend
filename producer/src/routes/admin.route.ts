import { Request, Response, Router } from "express";
import multer from "multer";
import { resetVote, uploadVoterFromCsv } from "../controllers/voter.controller";
import path from "path";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validateDTO } from "../middlewares/validate.middleware";
import { getUser, postUserCreate } from "../dtos/user.dto";
import { createUser, getAllUser } from "../controllers/user.controller";
import { postCandidateCreate } from "../dtos/candidate.dto";
import { createCandidate } from "../controllers/candidate.controller";
import { deleteResetVote } from "../dtos/vote.dto";
import { userGetAll } from "../services/user.service";
import { getAllJSDocTags } from "typescript";

const router = Router()

const upload = multer({
  dest: path.resolve(__dirname, "..", "..", "uploads")
})

router.use(adminMiddleware)
router.post("/upload-csv", upload.single('file'), uploadVoterFromCsv)
router.post("/user", validateDTO(postUserCreate), createUser)
router.post("/candidate", validateDTO(postCandidateCreate), createCandidate)
router.delete("/reset", validateDTO(deleteResetVote), resetVote)
router.get("/user", validateDTO(getUser), getAllUser)
router.get("/", async (req: Request, res: Response) => {
     res.json({
          "message": "Success"
     })
})

export default router