import { GetUser, PostUserCreate } from "../dtos/user.dto";
import { asyncHandler } from "../middlewares/async_handler.middleware";
import { userCreate, userGetAll } from "../services/user.service";
import { logger } from "../utils/logger.util";

export const createUser = asyncHandler(async (req, res) => {
     // parse the json from payload
     const {
          kelas,
          name,
          username,
          password,
          role,
     } = req.body

     // calls the service
     const user = await userCreate(
          {
               name,
               username,
               password,
               class: kelas,
               role
          } as PostUserCreate
     );

     res.status(201).json({
          status: "success",
          message: "user successfully created",
          data: user.toJSON
     })
})

export const getAllUser = asyncHandler(async (req, res) => {
     // get the payload first as always
     logger.info(req.body)
     const {
          page = 1,
          isVoted = false,
          kelas,
          role = "voter"
     } = req.query

     // calls the service
     const users = await userGetAll({
          page, isVoted, kelas, role
     } as GetUser)

     res.status(200).json({
          status: "success",
          message: "successfully get the user",
          data: users
     })
})

export const getUserByName = asyncHandler(async (req, res) => {

})