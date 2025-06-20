import mongoose from "mongoose";
import { Settings, Voter } from "../utils/types.util";
import { User } from "../models/user.model";
import { execWithTransaction } from "../utils/transaction.util";
import { logger } from "../utils/logger.util";
import { createError } from "../exceptions/error.exception";
import { getRedlock } from "../configs/redlock.config";
import { PostInsertVote } from "../dtos/vote.dto";
import { Vote } from "../models/vote.model";
import { getRedisClient } from "../configs/redis.config";

// receive one or more user, and then input it to database.
export const voterSaveMany = async (
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
          throw createError(
               "failed",
               "failed to insert the voter csv",
               500,
               err
          )
     }
}

export const voterSaveVote = async (req: PostInsertVote, userId: string) => {
     const lockName = `user:vote:${userId}`
     let lock = await getRedlock().acquire([lockName], 3000)
     try {
          // Checks the setting
          const rawData = await getRedisClient().hgetall("setting");
          const setting: Settings = {
               isVotingAllowed: rawData.isVotingAllowed === "true"
          }

          if (!setting.isVotingAllowed) {
               throw createError(
                    "failed",
                    "vote not allowed",
                    400
               )
          }

          await Vote.insertMany(
               [
                    {
                         label: "osis",
                         user: userId,
                         candidate: req.osis
                    },
                    {
                         label: "mpk",
                         user: userId,
                         candidate: req.mpk
                    }
               ],
               {
                    ordered: true
               }
          )
     } catch (err) {
          throw err
     } finally {
          await lock.release()
     }
}

// Will be implemented later. When the pusher is ready.
export const pushLiveCount = async () => {

}