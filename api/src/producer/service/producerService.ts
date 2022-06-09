import Producer, { IProducer } from '../model/producer'
import logger from '../../../utils/logger'
import { ErrorResponse } from '../../common/errorResponse'
import { ProducerRequest } from '../dto/producerDto'

export type CreateProducerResponse = { producerId: string } | ErrorResponse

class ProducerService {
    async getProducers(): Promise<IProducer[]> {
        logger.info('[Producer] Fetching all producers')
        return Producer.find().exec()
    }

    async getProducerById(producerId: string): Promise<IProducer> {
        logger.info(`[Producer] Fetching producer with id: ${producerId}`)
        return Producer.findById(producerId).exec()
    }

    async createProducer(
        producerRequest: ProducerRequest
    ): Promise<CreateProducerResponse> {
        const producer = new Producer({
            name: producerRequest.name,
            logoUrl: producerRequest.logoUrl,
        })
        await producer.save()
        return { producerId: producer._id }
    }

    async updateProducer(
        producerId: string,
        producerRequest: ProducerRequest
    ): Promise<IProducer> {
        logger.info(
            `[Producer] Updating producer with id: ${producerId} with values: ${producerRequest}`
        )
        return Producer.findOneAndUpdate(
            { _id: producerId },
            { $set: producerRequest }
        ).exec()
    }

    async deleteProducer(producerId: string): Promise<void> {
        logger.info(`[Producer] Removing producer with id: ${producerId}`)
        await Producer.findByIdAndDelete(producerId).exec()
    }
}

export default new ProducerService()
