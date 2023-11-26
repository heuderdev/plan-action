import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

export class UserController {
    static async enrollment(request: Request, response: Response) {
        try {
            const user = await UsersService.enrollment(request.body);
            return response.status(200).json(user);
        } catch (error) {
            return response.status(400).json(error);
        }

    }

    static async access(request: Request, response: Response) {
        try {
            const user = await UsersService.access(request.body);
            return response.status(200).json(user);
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}