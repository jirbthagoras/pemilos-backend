import { Router } from "express";
import adminRoute from "./admin.route"

const router = Router()

router.use("/admin", adminRoute)

export default router