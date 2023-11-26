import { AppError } from "../utils/AppError";
import { prismaDatabase } from "../utils/prisma";
import { validatorObject } from "../utils/yup/location.validation";
import { ITimeByIdInterface } from "./interfaces/ITimeByIdInterface";
import { ITimeCreateInterface } from "./interfaces/ITimeCreateInterface";
import { ITimeDestroyInterface } from "./interfaces/ITimeDestroyInterface";
import { ITimeUpdateInterface } from "./interfaces/ITimeUpdateInterface";
import { TimeByIdValidation } from "./validations/TimeByIdValidation";
import { TimeCreateValidation } from "./validations/TimeCreateValidation";
import { TimeDestroyValidation } from "./validations/TimeDestroyValidation";
import { TimeUpdateValidation } from "./validations/TimeUpdateValidation";

export class TimeService {
    static async all() {
        return await prismaDatabase.time.findMany();
    }


    static async create(data: ITimeCreateInterface) {
        await validatorObject(TimeCreateValidation, { name: data.name })

        return await prismaDatabase.time.create({
            data: {
                name: data.name,
            }
        })
    }


    static async getById({ id }: ITimeByIdInterface) {
        await validatorObject(TimeByIdValidation, { id })
        return await prismaDatabase.time.findUnique({ where: { id } })
    }


    static async update(data: ITimeUpdateInterface) {
        await validatorObject(TimeUpdateValidation, { name: data.name, id: data.id })

        return await prismaDatabase.time.update({
            where: {
                id: Number(data.id)
            },
            data: {
                name: data.name,
            }
        })
    }

    static async destroy(id: number) {
        await validatorObject(TimeDestroyValidation, { id })

        const time = await prismaDatabase.time.findUnique({
            where: {
                id
            }
        })

        if (!time?.id) {
            throw new AppError("time already not exists in the database");
        }

        return await prismaDatabase.time.delete({
            where: {
                id: Number(id)
            }
        })
    }
}