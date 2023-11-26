
import * as yup from "yup"

export const TimeByIdValidation = yup.object().shape({
    id: yup.number().required()
})