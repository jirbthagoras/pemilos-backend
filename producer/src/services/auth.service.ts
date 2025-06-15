import { PostUserLogin } from "../dtos/auth.dto"
import { createError } from "../exceptions/error.exception"
import { User } from "../models/user.model"

export const userLogin = async(req: PostUserLogin) => {
     // check if there is a user with those name
     const user = await User.findOne({
          username: req.username
     }).exec()

     if (!user) {
          throw createError(
               "failed",
               "username not found",
               401  
          )
     }
}