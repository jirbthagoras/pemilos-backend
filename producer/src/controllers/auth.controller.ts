import { TokenClass } from "typescript";
import { PostUserLogin } from "../dtos/auth.dto";
import { createError } from "../exceptions/error.exception";
import { asyncHandler } from "../middlewares/async_handler.middleware";
import { authLogin } from "../services/auth.service";
import { generateToken, getPayload } from "../utils/jwt.util";
import { logger } from "../utils/logger.util";

export const login = asyncHandler(async (req, res) =>  {
     // parse user credentials
     const {
          username,
          password
     } = req.body;
     

     // And then here we calls the service
     const user = await authLogin(
          {
               username,
               password
          } as PostUserLogin
     );

     let tokenAge = 60 * 1000;

     if (user.role == "admin") {
          tokenAge = 24 * 60 * 60 * 1000;
     }

     logger.info(`Token age: ${tokenAge}`)

     // Creates a JWT token with provided KEY in .env
     const token = generateToken(user._id.toString(), user.role)

     // Then create an httpOnly cookie that contains the token
     res.cookie('pemilostoken', token, {
        httpOnly: true, 
        secure: true,
        sameSite: 'strict',
        path: "/api/v1",
        maxAge: tokenAge
    })

     res.status(200).json({
          "status": "sucess",
          "message": "login success"
     })

     return
})

// Cuz, we're using httpOnly so let's make a function that frontend will be often using
export const checkProfile = asyncHandler(async (req, res) => {
     // get the payload
     const {
          id, role
     } = getPayload(req)

     res.status(200).json({
          "status": "success",
          "message": "successlly get the profile",
          "data": {
               id, role
          },
     })

     return
})