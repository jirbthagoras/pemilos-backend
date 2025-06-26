import joi, { allow, ObjectSchema } from "joi"
import { CLASS } from "../utils/variables.util"

export type PostUserCreate = {
     name: string,
     username: string,
     password: string,
     class: string,
     role: "voter" | "admin"
}

// TODO: Just make sure if this correct, the validation thingy i mean.
export const postUserCreate: ObjectSchema = joi.object().keys({
     name: joi.string().min(5).max(60).required(),
     username: joi.string().min(5).max(30).required(),
     password: joi.string().min(5).max(30).required(),
     kelas: joi.string().valid(...CLASS).required(),
     role: joi.string().valid("voter", "admin").required()
})

export type GetUser = {
     page: number,
     isVoted: boolean,
     kelas?: string,
     role: "voter" | "admin"
}

export const getUser: ObjectSchema = joi.object().keys({
     page: joi.number(),
     isVoted: joi.boolean(),
     kelas: joi.number().optional(),
     role: joi.string()
})