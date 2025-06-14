import { createError } from "../exceptions/error.exception";
import { getPayload } from "../utils/jwt.util";
import {MiddlewareHandler } from "../utils/types.util";

export const adminMiddleware = async (handler: MiddlewareHandler) => {
     // first, decode the payload from request.
     const { role } = getPayload(handler.req)

     if (role != "admin") {
          throw createError(
               "unauthorized",
               "you're not an admin",
               401
          )
     }

     handler.next()
}