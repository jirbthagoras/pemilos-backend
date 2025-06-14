import mongoose from "mongoose";
import { Voter } from "../utils/types.util";
import { User } from "../models/user.model";
import { execWithTransaction } from "../utils/transaction.util";
import { logger } from "../utils/logger.util";

// receive one or more user, and then input it to database.
export const saveManyVoters = async (
     voters: Voter[]
) => {
     try {
          await User.insertMany(
                    voters,
                    {
                         ordered: true,
                    }
               );
     } catch (err) {
          throw err
     }
}