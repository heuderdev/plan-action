import { genSaltSync, hashSync, compareSync } from "bcryptjs"
import { sign } from 'jsonwebtoken';

import { AppError } from "../utils/AppError";
import { prismaDatabase } from "../utils/prisma";
import { IUserCreateInterce } from "./interfaces/IUserCreateInterce";
import { validatorObject } from "../utils/yup/location.validation";
import { UserCreateValidation } from "./validations/UserCreateValidation";
import { IUserAccessInterface } from "./interfaces/IUserAccessInterface";


export class UsersService {
    static async enrollment(data: IUserCreateInterce) {
        const permission = data.permission ? data.permission : "PERMISSION_USER"
        const { email, password, sector, username } = data;

        await validatorObject(UserCreateValidation, { email, password, sector, username, permission })

        const salt = genSaltSync(1);
        const passwordHash = hashSync(data.password, salt);

        const userExists = await prismaDatabase.user.findUnique({
            where: { username: data.username }
        });

        if (userExists?.username) {
            throw new AppError("user already exists in the database");
        }

        const userCreated = await prismaDatabase.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: passwordHash,
                sector: data.sector,
                permission
            }
        })

        return userCreated


    }

    static async access(data: IUserAccessInterface) {
        const user = await prismaDatabase.user.findUnique({
            where: {
                username: data.username
            }
        });

        if (!user?.id) {
            throw new AppError("user already not exists in the database");
        }
        const passwordMatched = compareSync(data.password, user?.password);

        if (!passwordMatched) {
            throw new AppError("user already not exists in the database");
        }

        const token = sign({ user: JSON.stringify(user) }, String(process.env.JWT_KEY), { expiresIn: '7d' })

        // @ts-ignore
        delete user.password

        return {
            token,
            user
        }

    }
}