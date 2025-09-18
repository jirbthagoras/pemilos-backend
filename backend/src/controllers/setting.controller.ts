import { stat, statSync } from "fs";
import { asyncHandler } from "../middlewares/async_handler.middleware";
import { getVoteSettingStatus, settingToggleAllowVote } from "../services/setting.service";

export const toggleAllowVote = asyncHandler(async (req, res) => {
     // calls the service immediately
     await settingToggleAllowVote()

     res.status(200).json({
          status: "success",
          message: "successfully toggled the setting"
     })
})

export const getVoteStatus = asyncHandler(async (req, res) => {
     const status = await getVoteSettingStatus()

     res.status(200).json({
          status: "success",
          data: {
               vote_status: status,
          }
     })
})