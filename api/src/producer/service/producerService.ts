import Producer, { IProducer } from '../model/producer'
import logger from '../../../utils/logger'

export type ProducerRequest = {
    name: string
    logoUrl: string
}

class ProducerService {
    async getProducers(): Promise<IProducer[]> {
        return Producer.find().exec()
    }

    async getProducerById(producerId: string): Promise<IProducer> {
        return Producer.findById(producerId).exec()
    }

    async createProducer(producerRequest: ProducerRequest): Promise<any> {
        const producer = new Producer({
            name: producerRequest.name,
            logoUrl: producerRequest.logoUrl,
        })
        await producer.save()
        return { producerId: producer._id }
    }
}

export default new ProducerService()
