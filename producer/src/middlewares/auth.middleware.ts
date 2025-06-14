import { NextFunction, Request, Response } from 'express';
import { verifyToken } from "../utils/jwt.util";
import {createError} from "../exceptions/error.exception";
import { MiddlewareHandler } from '../utils/types.util';

export const authMiddleware = (handler: MiddlewareHandler) => {
    const token: string | undefined = handler.req.headers.authorization?.split(' ')[1];
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

    handler.next()
}