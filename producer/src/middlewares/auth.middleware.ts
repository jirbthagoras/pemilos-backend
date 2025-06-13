import { NextFunction, Request, Response } from 'express';
import { verifyToken } from "../utils/jwt.util";
import {AppError, createError} from "../exceptions/error.exception";
import { verify } from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw createError(
            "Unauthorized",
            "Token Required",
            401
        );
    }

    if(!verifyToken(token)) {
        throw createError(
            "Unauthorized",
            "Invalid Token",
            401
        );
    }

    next()
}