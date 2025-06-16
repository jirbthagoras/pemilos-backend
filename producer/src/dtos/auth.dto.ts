import joi, {ObjectSchema} from "joi";

export type PostUserLogin = {
     username: string,
     password: string,
}

export const postUserLogin: ObjectSchema = joi.object().keys({
     username: joi.string().min(5).max(10).required(),
     password: joi.string().min(12).max(20).required()
})