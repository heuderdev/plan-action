
import * as yup from "yup"

export const TimeUpdateValidation = yup.object().shape({
    name: yup.string().required(),
    id: yup.number().required()
})