import * as yup from "yup"

export const SectorCreateValidation = yup.object().shape({
    name: yup.string().required(),
    timeId: yup.number().required()
})