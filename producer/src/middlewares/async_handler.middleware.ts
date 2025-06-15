import { Request, Response, NextFunction } from "express";

/* 

Do not confuses here, this asyncHandler function is just a caster where it can casts a handler into async one.
Just for handler do some asynchronous process.

*/
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
