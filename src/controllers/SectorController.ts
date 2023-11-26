import { Request, Response } from "express";
import { SectorsService } from "../services/SectorsService";

export class SectorController {
    static async all(request: Request, response: Response) {
        try {
            const sectors = await SectorsService.all()
            return response.status(200).json(sectors)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    static async getById(request: Request, response: Response) {
        try {
            const id = Number(request.params.id)
            const sectors = await SectorsService.getById(id)
            return response.status(200).json(sectors)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    static async create(request: Request, response: Response) {
        try {
            const sectors = await SectorsService.create(request.body)
            return response.status(200).json(sectors)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
    static async update(request: Request, response: Response) {
        const data = {
            ...request.body,
            ...request.params
        }
        try {
            const sectors = await SectorsService.update(data)
            return response.status(200).json(sectors)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

}