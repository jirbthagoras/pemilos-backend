import { Request } from "express"
import jwt, { Jwt } from "jsonwebtoken"
import { createError } from "../exceptions/error.exceptions"

const JWT_KEY: string = String(process.env.JWT_KEY)

export const generateToken = (userId: number) => {
     return jwt.sign({} ,JWT_KEY, {
          subject: String(userId),
          expiresIn: "15m"
     })
}

export const verifyToken = (token: string) => {
     try {
          return jwt.verify(token, JWT_KEY)
     } catch (error) {
          return false
     }
}

export const getSubjectFromToken = (req: Request) => {
     const token: string | undefined = req.headers.authorization?.split(' ')[1];
     if (!token) {
          throw createError(
               "unauthorized",
               "token Not Found",
               401
          )
     }

     const decoded = jwt.decode(token) as jwt.JwtPayload
     if (!decoded.sub) {
          throw createError(
               "failed",
               "internal server error",
               500
          )
     }

     return decoded.sub
}