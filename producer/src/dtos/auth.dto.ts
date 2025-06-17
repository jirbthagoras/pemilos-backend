import joi, {ObjectSchema} from "joi";

export type PostAuthLogin = {
     username: string,
     password: string,
}

export const postAuthLogin: ObjectSchema = joi.object().keys({
     username: joi.string().max(60).required(),
     password: joi.string().max(60).required()
})