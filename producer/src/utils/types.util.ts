import { NextFunction, Request } from "express";

export interface Voter {
  name: string;
  username: string;
  class: string;
}

export type Middleware = {
  req: Request,
  res: Response,
  next: NextFunction
}

// Here we define a JWT Payload, because this is typescript.
export type Payload  = {
  subject: string,
  role: "voter" | "admin"
}

