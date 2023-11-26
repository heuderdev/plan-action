
import { Request, Response, NextFunction } from "express"
import { prismaDatabase } from "../utils/prisma"
import { AppError } from "../utils/AppError";

export const ensurePermission = (args?: string[]) => {

    return async (request: Request, response: Response, next: NextFunction) => {
        const id = request.user?.id;

        const user = await prismaDatabase.user.findUnique({
            where: {
                id
            }
        })

        if (user?.permission == "PERMISSION_ADMIN") {
            return next()
        }

        const permissionExists = args?.map(item => item).includes(user?.permission!) // user?.permission.some(permission => args?.includes(permission))

        if (!permissionExists) {
            return response.status(400).json({ message: "permission denid", code: 400 })
        }


        return next()
    }

}
