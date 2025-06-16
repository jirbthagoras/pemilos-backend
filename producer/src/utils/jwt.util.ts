import { Request } from "express"
import jwt, { Jwt } from "jsonwebtoken"
import { createError } from "../exceptions/error.exception"
import { Payload } from "./types.util"
import { logger } from "./logger.util"

export const generateToken = (userId: string, role: string, expiresIn: number) => {
     const JWT_KEY: string = String(process.env.JWT_KEY)
     return jwt.sign({
          role: role,
          id: userId
     }, JWT_KEY, {
          expiresIn,
          issuer: "pemilos-backend",
     })
}

export const verifyToken = (token: string) => {
     const JWT_KEY: string = String(process.env.JWT_KEY)
     logger.info(JWT_KEY)
     try {
          return jwt.verify(token, JWT_KEY)
     } catch (error) {
          return false
     }
}

export const getPayload = (req: Request) => {
     const token: string | undefined = req.cookies.pemilostoken
     if (!token) {
          throw createError(
               "unauthorized",
               "token Not Found",
               401
          )
     }

     const decoded = jwt.decode(token) as Payload
     if (!decoded) {
          throw createError(
               "failed",
               "internal server error",
               500
          )
     }

     return decoded
}