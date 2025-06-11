import {AppError, isAppError} from "./error.exceptions";
import {Request, Response, NextFunction} from "express";
import { logger } from "../utils/logger.utils";

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
        message: "Internal server error"
    })
    logger.error(`Internal server error`, err);

    return

}