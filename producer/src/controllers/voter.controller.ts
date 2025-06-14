import path from "path";
import fs from "fs";
import csv from "csv-parser";
import { ControllerHandler, Voter } from "../utils/types.util"
import { createError } from "../exceptions/error.exception";
import { generatePassword } from "../utils/auth.util";
import { logger } from "../utils/logger.util";
import { saveManyVoters } from "../services/voter.service";
import { asyncHandler } from "../middlewares/async_handler.middleware";

export const uploadVoterFromCsv = asyncHandler(async (req, res, next) => {
  const voters: Voter[] = []

  if (!req.file) {
    throw createError("failed", "no file attached", 400)
  }

  const filePath = path.resolve(req.file.path)

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        voters.push({
          name: data.NAME,
          username: data.USERNAME,
          class: data.CLASS,
          password: generatePassword(data.USERNAME),
        });
      })
      .on("end", resolve)
      .on("error", reject)
  });

  await saveManyVoters(voters)
  logger.info("saved voters")
  fs.unlinkSync(filePath)

  res.status(201).json({
    status: "success",
    message: "Voters, successfully created"
  });
});
