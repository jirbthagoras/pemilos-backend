import { asyncHandler } from "../middlewares/async_handler.middleware";
import { settingToggleAllowVote } from "../services/setting.service";

export const toggleAllowVote = asyncHandler(async (req, res) => {
     // calls the service immediately
     await settingToggleAllowVote()

     res.status(200).json({
          status: "success",
          message: "successfully toggled the setting"
     })
})