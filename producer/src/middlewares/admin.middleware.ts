import { getPayload } from "../utils/jwt.util";
import { Middleware } from "../utils/types.util";

export const adminMiddleware = async (handler: Middleware) {
     // first, decode the payload from request.
     const payload = getPayload(handler.req)

     // 
}