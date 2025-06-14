import {AppError, isAppError} from "./error.exception";
import {Request, Response, NextFunction} from "express";
import { logger } from "../utils/logger.util";

export const errorHandler = (err: AppError, _: Request, res: Response, __: NextFunction) => {

    if(isAppError(err)) {
        res.status(err.statusCode || 500).json({
            status: err.status,
            message: err.message,
            error: err.error
        })

        logger.error(`${err.status}, message: ${err.message}`);
        return
    }

    res.status(500).json({
        status: "failed",
        message: "internal server error",
        error: err
    })
    logger.error(`Internal server error`, err);

    return

}