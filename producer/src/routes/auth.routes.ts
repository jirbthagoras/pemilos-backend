import { Router } from "express"
import { validateDTO } from "../middlewares/validate.middleware"
import { postAuthLogin } from "../dtos/auth.dto"
import { checkProfile, login } from "../controllers/auth.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { postUserCreate } from "../dtos/user.dto"
import { createUser } from "../controllers/user.controller"
import { adminMiddleware } from "../middlewares/admin.middleware"

const router = Router()

router.post("/login", validateDTO(postAuthLogin), login)
router.get("/me", authMiddleware, checkProfile)

export default router