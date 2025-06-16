import { NextFunction, Request, Response } from 'express';
import { verifyToken } from "../utils/jwt.util";
import {createError} from "../exceptions/error.exception";
import { MiddlewareHandler } from '../utils/types.util';
import { logger } from '../utils/logger.util';
import jwt from "jsonwebtoken";

export const authMiddleware: MiddlewareHandler = (req, res, next) => {
    const token: string | undefined = req.cookies.pemilostoken;
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