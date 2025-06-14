import multer from "multer";
import path from "path";
import fs from "fs";
import csv from "csv-parser";
import { RequestHandler, Voter } from "../utils/types.util"
import { createError } from "../exceptions/error.exception";
import { generatePassword } from "../utils/auth.util";
import { logger } from "../utils/logger.util";
import { execWithTransaction } from "../utils/transaction.util";
import { saveManyVoters } from "../services/voter.service";

// Temp storage (in-memory or disk)
const upload = multer({ dest: 'uploads/' });

export const uploadVoterFromCsv = async (handler: RequestHandler) => {
     // init an array to append the parsed csv
     const voters: Voter[] = []

     // chekcs if there is a file attached
     if (!handler.req.file) {
          throw createError(
               "failed",
               "no file attached",
               400
          )
     }    

     // get the path of file, seharusnya udah ke store di dalem temp storage
     const filePath = path.resolve(handler.req.file.path)

     // create a read stream, yes dia bakal ngeread.
     fs.createReadStream(filePath)
     .pipe(csv())
     .on('data', (data) => {
          // push the data to var.
          voters.push({
               name: data.name,
               username: data.username,
               class: data.class,
               // generate a password with given function the format is: "randstring:nis"
               password: generatePassword(data.username),
          })
          logger.info(data)
     })
     .on('end', async () => {
          // TODO: run voter service.
          await saveManyVoters(voters)

          // unlink the filepath
          fs.unlinkSync(filePath);
          return handler.res.status(201).json({
               "status": "success",
               "message": "Voters, successfully created"
          })
     })
}