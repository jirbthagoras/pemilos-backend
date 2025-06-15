import { Request, Response, Router } from "express";
import multer from "multer";
import { uploadVoterFromCsv } from "../controllers/voter.controller";
import path from "path";

const router = Router()

const upload = multer({
  dest: path.resolve(__dirname, "..", "..", "uploads")
})

router.post("/upload-csv", upload.single('file'), uploadVoterFromCsv)
router.get("/", async (req: Request, res: Response) => {
     res.json({
          "message": "Success"
     })
})

export default router