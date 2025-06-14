import { Request, Response, Router } from "express";
// import path from "path"
import fs from "fs"
import multer from "multer";
import { uploadVoterFromCsv } from "../controllers/voter.controller";
import upload from "../utils/multer.util";

const router = Router()

router.post("/upload-csv", upload.single('file'), uploadVoterFromCsv)
router.get("/", async (req: Request, res: Response) => {
     res.json({
          "message": "Success"
     })
})

export default router