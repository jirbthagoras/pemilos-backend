import { PostAuthLogin } from "../dtos/auth.dto";
import { createError } from "../exceptions/error.exception";
import { User } from "../models/user.model";

export const authLogin = async (req: PostAuthLogin) => {
  // check if there is a user with those username
  const user = await User.findOne({
    username: req.username,
  }).exec();

  if (!user) {
    throw createError("failed", "user with such credential not found", 400);
  }

  if (user.isVoted) {
    throw createError(
      "failed",
      "failed to logged in, your account already voted",
      401,
    );
  }

  // checks the password or token or, u said lah
  if (req.password != user.password) {
    throw createError("failed", "password is not valid", 400);
  }

  return user;
};
