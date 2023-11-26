import * as yup from "yup"

export const SectorDestroyValidation = yup.object().shape({
    id: yup.number().required()
})