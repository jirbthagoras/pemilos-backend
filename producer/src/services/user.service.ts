import { PostUserCreate } from "../dtos/user.dto";
import { createError } from "../exceptions/error.exception";
import { User } from "../models/user.model";

export const userCreate = async (req: PostUserCreate) => {
     try {
          const user = await User.insertOne(req)
          return user
     } catch (err) {
          throw err
     }
}

export const deleteUserById = async (req: {
     id: string
}) => {
     try {
          await User.deleteOne({
               _id: req.id,
          })
     } catch (err) {
          throw err
     }
}