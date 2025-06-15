import joi, {ObjectSchema} from "joi";

export type PostUserLogin = {
     username: string,
     password: string,
}

export const postUserLogin: ObjectSchema = joi.object().keys({
     username: joi.string().min(6).max(6).required(),
     password: joi.string().min(13).max(13).required()
})