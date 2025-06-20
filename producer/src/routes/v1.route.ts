import { Router } from "express";
import adminRoute from "./admin.route"
import authRoute from "./auth.routes"
import candidateRoute from "./candidate.route"
import voteRoute from "./vote.route"

const router = Router()

router.use("/admin", adminRoute)
router.use("/auth", authRoute)
router.use("/vote", voteRoute)
router.use("/candidate", candidateRoute)

export default router