import { NextFunction, Request, Response } from "express";

// Vote interface, to parse the .csv
export type Voter = {
  name: string;
  username: string;
  class: string;
  password: string;
}

// A handler yield by middleware.
export type MiddlewareHandler = {
  req: Request,
  res: Response,
  next: NextFunction
}

// A handler yield by Controller, maaf namanya gajelas, aku kehabisan ide.
export type RequestHandler = {
  req: Request,
  res: Response
}

// Here we define a JWT Payload, because this is typescript.
export type Payload  = {
  id: string,
  role: "voter" | "admin"
}