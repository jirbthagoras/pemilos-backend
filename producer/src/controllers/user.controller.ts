import { PostUserCreate } from "../dtos/user.dto";
import { asyncHandler } from "../middlewares/async_handler.middleware";
import { userCreate } from "../services/user.service";

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