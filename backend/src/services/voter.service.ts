import { Settings, VoteCount, Voter } from "../utils/types.util";
import { User } from "../models/user.model";
import { createError } from "../exceptions/error.exception";
import { getRedlock } from "../configs/redlock.config";
import { PostInsertVote } from "../dtos/vote.dto";
import { Vote } from "../models/vote.model";
import { getRedisClient } from "../configs/redis.config";
import debounce from "lodash/debounce";
import { getPusherClient } from "../configs/pusher.config";
import { Candidate } from "../models/candidate.model";
import { logger } from "../utils/logger.util";

// receive one or more user, and then input it to database.
export const voterSaveMany = async (voters: Voter[]) => {
  try {
    await User.insertMany(voters, {
      ordered: true,
    });
  } catch (err) {
    throw createError("failed", "failed to insert the voter csv", 500, err);
  }
};

export const voterSaveVote = async (req: PostInsertVote, userId: string) => {
  // Acquire a lock first, to make sure if the process is mutex
  // This lock is only exclusive to process that contains the same userId
  const lockName = `user:vote:${userId}`;
  // Acquire lock, exclusive process starts here.
  const redlock = await getRedlock()
  let lock = await redlock.acquire([lockName], 10000)
  try {
    // Checks the setting, is voting allowed or nah
    const rawData = await getRedisClient().hget("setting", "isVotingAllowed");
    const isVotingAllowed = rawData === "true";

    if (!isVotingAllowed) {
      throw createError("failed", "vote not allowed", 400);
    }

    // Checks if the id in the payload is valid

    const osis = await Candidate.findOne({
      _id: req.osis,
      label: "osis",
    });

    const mpk = await Candidate.findOne({
      _id: req.mpk,
      label: "mpk",
    });

    if (!osis || !mpk) {
      throw createError("failed", "candidate chosen is not valid", 401);
    }

    // Checks if the user exists just to make sure, and yeah defensive coding buddy.
    const user = await User.findById(userId);
    if (!user) {
      throw createError("failed", "user with such id not found", 401);
    }

    // Checks if the user already voted

    const vote = await Vote.findOne({
      user: userId,
    });

    if (user.isVoted || vote) {
      throw createError("failed", "user already voted", 401);
    }

    // Checks if the user is an admin
    if (user.role == "admin") {
      throw createError("failed", "bro u're literally admin, why u vote", 401);
    }

    // Insert the vote
    (await Vote.insertMany(
      [
        {
          label: "osis",
          user: userId,
          candidate: req.osis,
        },
        {
          label: "mpk",
          user: userId,
          candidate: req.mpk,
        },
      ],
      {
        ordered: true,
      },
    ),
      // make the isVoted = true
      // TODO: test this
      await User.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          $set: {
            isVoted: true,
          },
        },
      ));

    // push livecount, started the debouncing algorithm w/lodash.
    // Debouncing algorithm allows a specific function to be called after a period of silence.
    // Makes it more suitable for this condition.
    voterPushLiveCount();
    await lock.redlock.release(lock)
  } catch (err) {
    throw err;
  } finally {
    // Release the lock
    // await lock.redlock.release(lock);
  }
};

export const voterGetResult = async (label: string) => {
  try {
    const results = await Vote.aggregate([
      // Dynamically search, this aggregate simply take all votes based on label
      { $match: { label } },

      // Groups the newly queried result by their candidateId, so the result is as much as the candidates available.
      // Also adds a path or field named column, to sum up the grouped vote.
      {
        $group: {
          _id: "$candidate",
          count: { $sum: 1 },
        },
      },

      //  Since the available identifier for candidates is only the _id. This $lookup will cast it
      //  into a real candidates, with their own name, number, etc.
      {
        $lookup: {
          from: "candidates",
          localField: "_id",
          foreignField: "_id",
          as: "candidate",
        },
      },

      //  candidate that looked up is an array, so let's cast it into one single beautiful object cihuy
      { $unwind: "$candidate" },

      //  Finalize the result, casts some unnecessary field like _id (set it to 0) and candidates (just do ont mention it)
      {
        $project: {
          _id: 0,
          name: "$candidate.name",
          number: "$candidate.number",
          count: 1,
        },
      },

      //  sort based on number
      { $sort: { number: 1 } },
    ]);

    return results;
  } catch (err) {
    throw err;
  }
};

// Will be implemented later. When the pusher is ready.
export const voterPushLiveCount = debounce(async () => {
  const result = {
    osis: await voterGetResult("osis"),
    mpk: await voterGetResult("mpk"),
  };

  const pusher = await getPusherClient();

  pusher.trigger("pemilose", "pemilolot", result);
  return;
}, 3000);

export const voterResetVote = async (username: string) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        username: username,
      },
      {
        $set: {
          isVoted: false,
        },
      },
    );

    if (!user) {
      throw createError("failed", "user with such credentials not found", 401);
    }

    await Vote.deleteMany({
      user: user._id,
    });
  } catch (err) {
    throw err;
  }
};

export const voterCount = async () => {
  try {
    const result: VoteCount[] = await User.aggregate([
      {
        $match: {
          role: "voter",
        },
      },
      {
        $group: {
          _id: "$isVoted",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    return result;
  } catch (err) {
    throw err;
  }
};
