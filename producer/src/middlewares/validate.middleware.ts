import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from "joi";
import { logger } from "../utils/logger.util";

export const validateDTO = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req.body, { abortEarly: false });

        if (result.error) {
            const errors = result.error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message,
                type: detail.type,
                limit: detail.context?.limit
            }))
            res.status(400).json({
                status: "error",
                message: "Failed on validation",
                error: errors
            });
            logger.debug("Validation Fails")
            return
        }
        logger.debug("validation Success")

        next();
    };
}