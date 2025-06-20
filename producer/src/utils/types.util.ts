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

// SO this setting will be stored in redis, cuz it will be used sooooo many times.
// This type will be serialized into string when enters redis.
export type Settings = {
  isVotingAllowed: boolean
}

// this is just the representation of cache setting inside redis.
// lagi lagi apa? Type safety 
export type RedisSettingCache = {
  isVotingAllowed: "true" | "false"
}

// Here we define a JWT Payload, because this is typescript.
export type Payload  = {
  id: string,
  role: "voter" | "admin"
}