import { Request, Response, Router } from "express";
// import path from "path"
import fs from "fs"
import multer from "multer";
import { uploadVoterFromCsv } from "../controllers/voter.controller";

const router = Router()

const upload = multer({
     dest: "../../uploads"
})

router.post("/upload-csv", upload.single('file'), uploadVoterFromCsv)
router.get("/", async (req: Request, res: Response) => {
     res.json({
          "message": "Success"
     })
})

export default router