import { Request, Response, Router } from "express";
import multer from "multer";
import {
  countVoter,
  exportTokenizedVoterFromCSV,
  getLiveCount,
  resetVote,
  uploadVoterFromCsv,
} from "../controllers/voter.controller";
import path from "path";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validateDTO } from "../middlewares/validate.middleware";
import { getUser, postUserCreate } from "../dtos/user.dto";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
} from "../controllers/user.controller";
import { postCandidateCreate } from "../dtos/candidate.dto";
import { createCandidate, deleteCandidate } from "../controllers/candidate.controller";
import { deleteResetVote } from "../dtos/vote.dto";

import {
  getVoteStatus,
  toggleAllowVote,
} from "../controllers/setting.controller";
import { isAdmin, isUser } from "../controllers/auth.controller";

const router = Router();

let upload: multer.Multer;

upload = multer({
  dest: path.resolve(__dirname, "..", "..", "uploads"),
});


// prod
// upload = multer({
//   dest: "/app/uploads"
// });

// router.use(adminMiddleware)
router.post("/upload/csv", upload.single("file"), uploadVoterFromCsv);
router.post("/upload/csv/token", upload.single("file"), exportTokenizedVoterFromCSV);
router.post("/user", validateDTO(postUserCreate), createUser);
router.post("/candidate", validateDTO(postCandidateCreate), createCandidate);
router.delete("/candidate/:id", deleteCandidate)
router.put("/reset", validateDTO(deleteResetVote), resetVote);
router.get("/user", validateDTO(getUser), getAllUser);
router.delete("/user/:id", deleteUser)
router.get("/user/:id", getUserById);
router.get("/count", countVoter);
router.put("/vote/status", toggleAllowVote);
router.get("/vote/status", getVoteStatus);
router.put("/check/user", isUser);
router.put("/check/admin", isAdmin);
router.get("/live/count", getLiveCount);

export default router;
