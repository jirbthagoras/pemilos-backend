// src/middlewares/multer.middleware.ts
import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: "/app/uploads", // absolute path in Docker
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

export default upload;