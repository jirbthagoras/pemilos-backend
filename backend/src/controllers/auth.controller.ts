import { TokenClass } from "typescript";
import { PostAuthLogin } from "../dtos/auth.dto";
import { createError } from "../exceptions/error.exception";
import { asyncHandler } from "../middlewares/async_handler.middleware";
import { authLogin } from "../services/auth.service";
import { generateToken, getPayload } from "../utils/jwt.util";
import { logger } from "../utils/logger.util";

const cookieName = "pemilostoken"

export const login = asyncHandler(async (req, res) =>  {
     // parse user credentials
     const {
          username,
          password
     } = req.body;
     
     // checks if the user is logged in currently
     // const session: string | undefined = req.cookies.pemilostoken;
     // if (!session) {
     //      throw createError(
     //           "failed",
     //           "you're already logged in",
     //           401
     //      );
     // }

     // And then here we calls the service
     const user = await authLogin(
          {
               username,
               password
          } as PostAuthLogin
     );

     // this is cookie age, in miliseconds 
     let cookieAge = 5 * 60 * 1000;

     if (user.role == "admin") {
          // generate token as admin
          cookieAge = 24 * 60 * 60 * 1000;
     }

     // notice that i divide cookieAge by 1000, to convert it from miliseconds to seconds
     const token = generateToken(user._id.toString(), user.role, cookieAge / 1000)

     // Then create an httpOnly cookie that contains the token
     res.cookie(cookieName, token, {
        httpOnly: true, 
        secure: true,
        sameSite: 'strict',
        path: "/api/v1",
        maxAge: cookieAge
    })

     res.status(200).json({
          "status": "sucess",
          "message": "login success"
     })

     return
})

export const logout = asyncHandler(async (req, res) => {
     // just simply clear the cookie i guess
     res.clearCookie(cookieName, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/api/v1'
     });

     res.status(200).json({
          "status": "success",
          "message": "successfully logged out"
     })

     res.end()

     return
})

// Cuz, we're using httpOnly so let's make a function that frontend will be often using
export const checkProfile = asyncHandler(async (req, res) => {
     // get the payload
     const {
          role,
          id
     } = getPayload(req)

     res.status(200).json({
          "status": "success",
          "message": "successlly get the profile",
          "data": {
               role, 
               id
          },
     })

     return
})