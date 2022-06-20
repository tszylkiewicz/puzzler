import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import PuzzleService from '../service/puzzleService'

class PuzzleController {
    async getAllProducers(req: Request, res: Response): Promise<void> {
        const producers = await PuzzleService.getProducers()
        res.status(StatusCodes.OK).send(producers)
    }

    async createPuzzle(req: Request, res: Response): Promise<void> {
        const producerId = await PuzzleService.createProducer(req.body)
        res.status(StatusCodes.CREATED).send(producerId)
    }
}

export default new PuzzleController()
