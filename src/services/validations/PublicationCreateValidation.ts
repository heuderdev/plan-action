import * as yup from "yup"

export const PublicationCreateValidation = yup.object().shape({
    title: yup.string().required(),
    video: yup.string(),
    description: yup.string().required(),
    id: yup.string().required(),
    sectorId: yup.string().required(),
})
