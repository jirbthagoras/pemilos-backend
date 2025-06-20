import { Router } from "express";
import adminRoute from "./admin.route"
import authRoute from "./auth.routes"
import { authMiddleware } from "../middlewares/auth.middleware";
import { vote } from "../controllers/voter.controller";

const router = Router()

router.use(authMiddleware)
router.post("/", vote)

export default router