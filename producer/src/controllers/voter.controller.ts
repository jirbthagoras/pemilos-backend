import path from "path";
import fs from "fs";
import csv from "csv-parser";
import { Voter } from "../utils/types.util"
import { createError } from "../exceptions/error.exception";
import { generatePassword } from "../utils/auth.util";
import { logger } from "../utils/logger.util";
import { voterSaveMany, voterSaveVote } from "../services/voter.service";
import { asyncHandler } from "../middlewares/async_handler.middleware";
import { PostInsertVote } from "../dtos/vote.dto";
import { getPayload } from "../utils/jwt.util";

export const uploadVoterFromCsv = asyncHandler(async (req, res) => {
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

  await voterSaveMany(voters)
  logger.info("saved voters")
  fs.unlinkSync(filePath)

  res.status(201).json({
    status: "success",
    message: "Voters, successfully created"
  });
});

export const vote = asyncHandler(async (req, res) => {
  // Parse the payload
    const {
      osis,
      mpk
    } = req.body

    // get the userid from httpOnly cookie
         const {
              id
         } = getPayload(req)
    
    // Calls the service
    await voterSaveVote({
      osis, mpk
    } as PostInsertVote, id)

    res.status(201).json({
      "status": "success",
      "message": "successfully inserted vote"
    })
})