import { NextFunction, Request, Response } from "express";

// Vote interface, to parse the .csv
export type Voter = {
  name: string;
  username: string;
  class: string;
  password: string;
}

// A handler yield by middleware.
export type MiddlewareHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

// Here we define a JWT Payload, because this is typescript.
export type Payload  = {
  id: string,
  role: "voter" | "admin" | "super-admin"
}