import { NextFunction, Request, Response } from 'express';
import { verifyToken } from "../utils/jwt.util";
import {createError} from "../exceptions/error.exception";
import { MiddlewareHandler } from '../utils/types.util';

export const authMiddleware: MiddlewareHandler = (req, res, next) => {
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