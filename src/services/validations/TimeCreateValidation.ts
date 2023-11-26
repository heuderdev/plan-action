
import * as yup from "yup"

export const TimeCreateValidation = yup.object().shape({
    name: yup.string().required()
})