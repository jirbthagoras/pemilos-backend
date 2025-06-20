import { Router } from "express";
import adminRoute from "./admin.route"
import authRoute from "./auth.routes"
import { authMiddleware } from "../middlewares/auth.middleware";
import { vote } from "../controllers/voter.controller";
import { candidateGet } from "../services/candidate.service";
import { getCandidate } from "../controllers/candidate.controller";

const router = Router()

router.use(authMiddleware)
router.get("/", getCandidate)

export default router