import { asyncHandler } from "../middlewares/async_handler.middleware";

export const userLogin = asyncHandler(async (req, res,) =>  {
     // parse user credentials
     const {
          username,
          password
     } = req.body;

     // And then here we calls the service
})