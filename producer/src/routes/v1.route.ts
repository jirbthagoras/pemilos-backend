import { Router } from "express";
import adminRoute from "./admin.route"
import authRoute from "./auth.routes"

const router = Router()

router.use("/admin", adminRoute)
router.use("/auth", authRoute)

export default router