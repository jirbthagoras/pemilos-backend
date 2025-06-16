import { Router } from "express"
import { validateDTO } from "../middlewares/validate.middleware"
import { postUserLogin } from "../dtos/auth.dto"
import { checkProfile, login } from "../controllers/auth.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()

router.post("/login", validateDTO(postUserLogin), login)
router.get("/me", authMiddleware, checkProfile)

export default router