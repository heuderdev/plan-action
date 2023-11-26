import { Request, Response } from "express";
import { TimeService } from "../services/TimeService";

export class TimeController {
    static async all(request: Request, response: Response) {
        try {
            const times = await TimeService.all()
            return response.json(times)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
    static async create(request: Request, response: Response) {
        try {
            const times = await TimeService.create(request.body)
            return response.json(request.body)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

    static async update(request: Request, response: Response) {
        try {
            const data = {
                ...request.body,
                ...request.params
            }
            const times = await TimeService.update(data)
            return response.json(times)
        } catch (error) {
            return response.status(400).json(error)
        }
    }
    static async destroy(request: Request, response: Response) {
        try {
            const data = Number(request.params.id)
            const times = await TimeService.destroy(data)
            return response.json(times)
        } catch (error) {
            return response.status(400).json(error)
        }
    }


    static async getById(request: Request, response: Response) {
        try {
            const id = Number(request.params.id)
            const times = await TimeService.getById({ id })
            return response.json(times)
        } catch (error) {
            return response.status(400).json(error)
        }
    }

}