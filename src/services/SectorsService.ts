import { AppError } from "../utils/AppError";
import { prismaDatabase } from "../utils/prisma";
import { validatorObject } from "../utils/yup/location.validation";
import { ISectorCreateInterface } from "./interfaces/ISectorCreateInterface";
import { ISectorUpdateInterface } from "./interfaces/ISectorUpdateInterface";
import { SectorCreateValidation } from "./validations/SectorCreateValidation";
import { SectorDestroyValidation } from "./validations/SectorDestroyValidation";
import { SectorUpdateValidation } from "./validations/SectorUpdateValidation";

export class SectorsService {
    static async all() {
        return await prismaDatabase.sector.findMany({ include: { time: true, Publication: true } })
    }

    static async getById(id: number) {
        return await prismaDatabase.sector.findUnique({ where: { id }, include: { time: { select: { name: true, id: true } } } })
    }

    static async create(data: ISectorCreateInterface) {
        await validatorObject(SectorCreateValidation, { timeId: data.timeId, name: data.name })

        const time = await prismaDatabase.time.findUnique({ where: { id: data.timeId } })

        if (!time?.id) {
            throw new AppError("time already not exists in the database");
        }

        return await prismaDatabase.sector.create({
            data: {
                name: data.name,
                timeId: data.timeId
            }
        })
    }

    static async update(data: ISectorUpdateInterface) {
        await validatorObject(SectorUpdateValidation, { timeId: data.timeId, name: data.name, id: data.id })
        const sector = await prismaDatabase.sector.findUnique({ where: { id: Number(data.id) } })
        if (!sector?.id) {
            throw new AppError("Sector already not exists in the database");
        }

        return await prismaDatabase.sector.update({
            where: { id: Number(data.id) }, data: {
                name: data.name,
                timeId: data.timeId
            }
        })
    }

    static async distroy(id: number) {
        await validatorObject(SectorDestroyValidation, { id })
        return await prismaDatabase.sector.delete({ where: { id } })
    }

}