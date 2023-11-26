
import { Request, Response, NextFunction } from "express"

import { verify } from "jsonwebtoken"
import { AppError } from "../utils/AppError";


export const ensureAuthentication = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.headers?.authorization;

        if (!authHeader) {
            throw new AppError("JWT inválido.")
        }

        // @ts-ignore
        const [, token] = authHeader?.split(" ");

        if (!token) {
            throw new AppError("JWT inválido.")
        }

        const data = verify(token, String(process.env.JWT_KEY)) as any

        if (data.user) {
            request.user = JSON.parse(data.user)
            return next()
        } else {
            throw new AppError("JWT inválido.")
        }

    } catch (error) {
        throw new AppError(String(error))
    }

}