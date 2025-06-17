import joi, { ObjectSchema } from "joi"

export type postUserCreate = {
     name: string,
     username: string,
     password: string
     role: "voter" | "admin"
}

// TODO: Just make sure if this correct, the validation thingy i mean.
export const postUserCreate: ObjectSchema = joi.object().keys({
     name: joi.string().min(5).max(60).required(),
     username: joi.string().min(5).max(30).required(),
     password: joi.string().min(5).max(30).required(),
     role: joi.string().valid("voter", "admin")
})