import { getUniqueHostnamesFromOptions } from "ioredis/built/cluster/util";
import { GetUser, PostUserCreate } from "../dtos/user.dto";
import { createError } from "../exceptions/error.exception";
import { User } from "../models/user.model";
import { logger } from "../utils/logger.util";

export const userCreate = async (req: PostUserCreate) => {
     try {
          const user = await User.insertOne(req)
          return user
     } catch (err) {
          throw err
     }
}

export const userDeleteById = async (req: {
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

export const userGetAll = async (
     req: GetUser
) => {
     try {
          // make a vars for pagination.
          const skip = (page: number) => {
               return --page * 10
          }
          // limits the user quantities to 10
          const limit = 10

          // make a query class so that class field can dynamically defined or not
          const query: any = {
               role: req.role,
               isVoted: req.isVoted,
          }

          if (req.kelas) {
               query.class = req.kelas
          }

          logger.info(query)

          const users = await User.find()
          .where(query)
          .skip(skip(req.page)).limit(limit).lean()
          return users
     } catch (err) {
          throw err
     }
}