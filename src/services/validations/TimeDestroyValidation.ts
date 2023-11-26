import * as yup from "yup"


export const TimeDestroyValidation = yup.object().shape({
    id: yup.number().required()
})