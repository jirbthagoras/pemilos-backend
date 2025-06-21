import { Settings, Voter } from "../utils/types.util";
import { User } from "../models/user.model";
import { createError } from "../exceptions/error.exception";
import { getRedlock } from "../configs/redlock.config";
import { PostInsertVote } from "../dtos/vote.dto";
import { Vote } from "../models/vote.model";
import { getRedisClient } from "../configs/redis.config";
import debounce from "lodash/debounce";

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
     // Acquire a lock first, to make sure if the process is mutex
     // This lock is only exclusive to process that contains the same userId
     const lockName = `user:vote:${userId}`
     // Acquire lock, exclusive process starts here.
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

          // Insert the vote
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
          ),

          // make the isVoted = true
          // TODO: test this
          await User.findOneAndUpdate({
               "_id": userId
          }, {
               $set: {
                    isVoted: true
               }
          })
     } catch (err) {
          throw err
     } finally {
          // Release the lock
          await lock.release()
     }
}

export const voterGetVoteResult = async () => {
     try {
          const osis = await Vote.find({"label": "osis"})
     } catch (err) {
          throw err
     }
}

// Will be implemented later. When the pusher is ready.
export const voterPushLiveCount = debounce(async () => {
     const result = await
})