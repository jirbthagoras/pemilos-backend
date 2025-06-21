import { Router } from "express"
import { validateDTO } from "../middlewares/validate.middleware"
import { postAuthLogin } from "../dtos/auth.dto"
import { checkProfile, login, logout } from "../controllers/auth.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()

router.post("/login", validateDTO(postAuthLogin), login)
router.use(authMiddleware)
router.delete("/logout", logout)
router.get("/me", checkProfile)

export default router