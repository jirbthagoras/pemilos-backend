import joi, { ObjectSchema } from "joi"

export type PostInsertVote = {
     osis: number,
     mpk: number
}

export const postInsertVote: ObjectSchema = joi.object().keys({
     osis: joi.number().required(),
     mpk: joi.number().required()
})