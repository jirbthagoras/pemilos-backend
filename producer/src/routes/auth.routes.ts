import { Router } from "express"
import { validateDTO } from "../middlewares/validate.middleware"
import { postUserLogin } from "../dtos/auth.dto"
import { login } from "../controllers/auth.controller"

const router = Router()

router.post("/login", validateDTO(postUserLogin), login)

export default router