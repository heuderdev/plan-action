import { Request, Response } from "express";
import { PublicationService } from "../services/PublicationService";
import { number } from "yup";

export class PublicationController {
    static async all(request: Request, response: Response) {
        const publication = await PublicationService.all()
        return response.json(publication)
    }

    static async getById(request: Request, response: Response) {
        try {
            const id = Number(request.params.id)
            const publication = await PublicationService.getById(id)
            return response.json(publication)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    static async create(request: Request, response: Response) {
        try {
            const data = {
                ...request.user,
                ...request.body
            }
            
            const publication = await PublicationService.create(data)
            return response.json(publication)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
    static async update(request: Request, response: Response) {
        try {
            const data = {
                ...request.user,
                ...request.body,
                ...request.params
            }
            
            const publication = await PublicationService.update(data)
            return response.json(publication)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    static async destroy(request: Request, response: Response) {
        try {        

            const data = {
                deletedAt: new Date(),
                deletedAtUser: request.user.username,
                id: Number(request.params._id)
            }
            const publication = await PublicationService.destroy(data)
            return response.status(201).json()
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}