import { Router } from "express";
import adminRoute from "./admin.route"
import authRoute from "./auth.routes"
import { authMiddleware } from "../middlewares/auth.middleware";
import { vote } from "../controllers/voter.controller";
import { rateLimitMiddleware } from "../middlewares/rate-limit.middleware";

const router = Router()

router.use(authMiddleware)
router.use(rateLimitMiddleware)
router.post("/", vote)

export default router