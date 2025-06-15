import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from "joi";
import { logger } from "../utils/logger.util";

export const validateDTO = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            res.status(400).json({
                status: "error",
                message: "Failed on validation",
                error: error.details.map((err) => err.message), // Extract error messages
            });
            logger.debug("Validation Fails")
            return
        }
        logger.debug("validation Success")

        next();
    };
}