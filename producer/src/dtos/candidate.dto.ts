import joi, { ObjectSchema } from "joi"
import { LABEL } from "../utils/variables.util"

export type PostCandidateCreate = {
     name: string,
     label: "osis" | "mpk",
     number: number,
     image: string
}

export const postCandidateCreate: ObjectSchema = joi.object().keys({
     name: joi.string().min(3).required(),
     label: joi.string().valid(...LABEL).required(),
     number: joi.number().required(),
     image: joi.string().required()
})