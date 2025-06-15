import { PostUserLogin } from "../dtos/auth.dto"
import { createError } from "../exceptions/error.exception"
import { User } from "../models/user.model"

export const authLogin = async(req: PostUserLogin) => {
     // check if there is a user with those username
     const user = await User.findOne({
          username: req.username
     }).exec()

     if (!user) {
          throw createError(
               "failed",
               "user with such credential not found",
               401  
          )
     }

     // checks the password or token or, u said lah
     if (req.password != user.password) {
          throw createError(
               "failed",
               "password is not valid",
               401  
          )
     }

     return user
}