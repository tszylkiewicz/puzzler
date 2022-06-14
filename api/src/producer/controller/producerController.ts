import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ProducerService from '../service/producerService'

class ProducerController {
    async getAllProducers(_req: Request, res: Response): Promise<void> {
        const producers = await ProducerService.getProducers()
        res.status(StatusCodes.OK).send(producers)
    }

    async getProducer(req: Request, res: Response): Promise<void> {
        const producer = await ProducerService.getProducerById(
            req.params.producerId
        )
        if (producer === null) {
            res.sendStatus(404)
        } else {
            res.status(StatusCodes.OK).send(producer)
        }
    }

    async createProducer(req: Request, res: Response): Promise<void> {
        const producerId = await ProducerService.createProducer(req.body)
        res.status(StatusCodes.CREATED).send(producerId)
    }

    async updateProducer(req: Request, res: Response): Promise<void> {
        const udaptedProducer = await ProducerService.updateProducer(
            req.params.producerId,
            req.body
        )
        if (udaptedProducer === null) {
            res.sendStatus(404)
        } else {
            res.status(StatusCodes.OK).send(udaptedProducer)
        }
    }

    async deleteProducer(req: Request, res: Response): Promise<void> {
        await ProducerService.deleteProducer(req.params.producerId)
        res.status(StatusCodes.NO_CONTENT).send()
    }
}

export default new ProducerController()
