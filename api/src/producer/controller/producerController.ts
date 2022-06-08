import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ProducerService from '../service/producerService'
import logger from '../../../utils/logger'

class ProducerController {
    async getAllProducers(req: Request, res: Response) {
        logger.info('Fetching all producers')
        const producers = await ProducerService.getProducers()
        res.status(StatusCodes.OK).send(producers)
    }

    async getProducer(req: Request, res: Response) {
        logger.info(`Fetching producer with id: ${req.body.id}`)
        const producer = await ProducerService.getProducerById(
            req.params.producerId
        )
        if (producer === null) {
            res.sendStatus(404)
        } else {
            res.status(StatusCodes.OK).send(producer)
        }
    }

    async createProducer(req: Request, res: Response) {
        logger.info('Creating new producer')
        const producerId = await ProducerService.createProducer(req.body)
        res.status(StatusCodes.CREATED).send(producerId)
    }
}

export default new ProducerController()
