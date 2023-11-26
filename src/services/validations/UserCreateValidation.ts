import * as yup from "yup"



export const UserCreateValidation = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    email: yup.string().email().required(),
    sector: yup.string().required(),
    permission: yup.string()
})