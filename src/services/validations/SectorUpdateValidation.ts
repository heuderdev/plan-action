import * as yup from "yup"

export const SectorUpdateValidation = yup.object().shape({
    name: yup.string(),
    timeId: yup.number(),
    id: yup.number().required(),
})