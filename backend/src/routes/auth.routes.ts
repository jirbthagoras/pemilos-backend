import { Router } from "express"
import { validateDTO } from "../middlewares/validate.middleware"
import { postAuthLogin } from "../dtos/auth.dto"
import { checkProfile, login } from "../controllers/auth.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { rateLimitMiddleware } from "../middlewares/rate-limit.middleware"

const router = Router()

router.post("/login", validateDTO(postAuthLogin), login)
router.use(authMiddleware)
router.get("/me", checkProfile)

export default router