import mongoose from "mongoose";
import { Voter } from "../utils/types.util";
import { User } from "../models/user.model";
import { execWithTransaction } from "../utils/transaction.util";

// receive one or more user, and then input it to database.
export const saveManyVoters = async (
     voters: Voter[]
) => {
     await execWithTransaction(async (session: mongoose.ClientSession) => {
          const result = await User.create(
               voters,
               {
                    session: session
               }
          );
     })
}