import path from "path";
import fs from "fs";
import csv from "csv-parser";
import { ControllerHandler, Voter } from "../utils/types.util"
import { createError } from "../exceptions/error.exception";
import { generatePassword } from "../utils/auth.util";
import { logger } from "../utils/logger.util";
import { saveManyVoters } from "../services/voter.service";

export const uploadVoterFromCsv: ControllerHandler = async (req, res) => {
     // init an array to append the parsed csv
     const voters: Voter[] = []

     logger.info(req.file)

     // checks if there is a file attached
     if (!req.file) {
          throw createError(
               "failed",
               "no file attached",
               400
          )
     }    

     // get the path of file, seharusnya udah ke store di dalem temp storage
     const filePath = path.resolve(req.file.path)

     // create a read stream, yes dia bakal ngeread.
     fs.createReadStream(filePath)
     .pipe(csv())
     .on('data', (data) => {
          // push the data to var.
          voters.push({
               name: data.NAME,
               username: data.USERNAME,
               class: data.CLASS,
               // generate a password with given function the format is: "randstring:nis"
               password: generatePassword(data.USERNAME),
          })
          logger.info(data)
     })
     .on('end', async () => {
          try {
               // TODO: run voter service.
               await saveManyVoters(voters)
               logger.info("saved voters")
               // unlink the filepath
               fs.unlinkSync(filePath);
               res.status(201).json({
                    "status": "success",
                    "message": "Voters, successfully created"
               })
          return
          } catch (error) {
               throw error
          }
     })
}