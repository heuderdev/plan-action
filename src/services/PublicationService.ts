import { prismaDatabase } from "../utils/prisma";
import { IPublicationCreateInterface } from "./interfaces/IPublicationCreateInterface";
import { AppError } from "../utils/AppError";
import { validatorObject } from "../utils/yup/location.validation";
import { PublicationCreateValidation } from "./validations/PublicationCreateValidation";
import { IPublicationUpdateInterface } from "./interfaces/IPublicationUpdateInterface";



export class PublicationService {
    static async all() {
        return await prismaDatabase.publication.findMany({
            include: {
                sector: {
                    include: {
                        time: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        permission: true,

                    }
                }
            }
        });
    }
    static async getById(id: number) {
        return await prismaDatabase.publication.findUnique({
            where: { id },
            include: {
                sector: {
                    include: {
                        time: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        permission: true,

                    }
                }
            }
        });
    }

    static async create(data: IPublicationCreateInterface) {
        await validatorObject(PublicationCreateValidation, { title: data.title, video: data.video, description: data.description, id: data.id, sectorId: data.sectorId })
        try {
            return await prismaDatabase.publication.create({
                data: {
                    title: data.title,
                    video: data.video,
                    description: data.description,
                    userId: Number(data.id),
                    sectorId: Number(data.sectorId)
                }
            })
        } catch (error) {
            throw new AppError(String(error));
        }
    }


    static async update(data: IPublicationUpdateInterface) {
        try {
            const publication = await prismaDatabase.publication.findUnique({ where: { id: Number(data._id) } })
            if (!publication?.id) {
                throw new AppError("Publication already not exists in the database");
            }

            const publicationUpdate = await prismaDatabase.publication.update({
                where: { id: Number(data._id) },
                data: {
                    title: data.title ?? publication.title,
                    userId: data.id ?? publication.id,
                    description: data.description ?? publication.description,
                    sectorId: data.setorId ?? publication.sectorId,
                    video: data.video ?? publication.video
                }
            })

            return publicationUpdate;
        } catch (error) {
            // @ts-ignore
            throw new AppError(String(error.message));
        }
    }
}