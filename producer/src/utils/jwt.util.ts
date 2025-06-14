import { Request } from "express"
import jwt, { Jwt } from "jsonwebtoken"
import { createError } from "../exceptions/error.exception"
import { string } from "zod"
import { Payload } from "./types.util"

const JWT_KEY: string = String(process.env.JWT_KEY)

export const generateToken = (userId: number, role: string) => {
     return jwt.sign({
          role: String(userId),
          id: String(role)
     }, JWT_KEY, {
          expiresIn: "15m",
          issuer: "pemilos-backend",
          notBefore: Date.now()
     })
}

export const verifyToken = (token: string) => {
     try {
          return jwt.verify(token, JWT_KEY)
     } catch (error) {
          return false
     }
}

export const getPayload = (req: Request) => {
     const token: string | undefined = req.headers.authorization?.split(' ')[1];
     if (!token) {
          throw createError(
               "unauthorized",
               "token Not Found",
               401
          )
     }

     const decoded = jwt.verify(token, JWT_KEY) as jwt.JwtPayload
     if (!decoded.sub) {
          throw createError(
               "failed",
               "internal server error",
               500
          )
     }

     return decoded as Payload
}