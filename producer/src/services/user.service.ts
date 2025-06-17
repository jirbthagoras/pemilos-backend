import { postUserCreate } from "../dtos/user.dto";
import { createError } from "../exceptions/error.exception";
import { User } from "../models/user.model";

export const userCreate = async (req: postUserCreate) => {
     try {
          const user = await User.insertOne(req)
          return user
     } catch (err) {
          throw createError(
                         "failed",
                         "failed to insert user",
                         500,
                         err
                    )
     }
}