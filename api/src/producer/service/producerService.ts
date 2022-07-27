import Producer from '../model/producer';
import logger from '../../../utils/logger';
import { ProducerDto, ProducerRequest } from '../dto/producerDto';
import { ProducerMapper } from '../dto/producerMapper';

class ProducerService {
    async getProducers(): Promise<ProducerDto[]> {
        logger.info('[Producer] Fetching all producers');
        const producers = await Producer.find().exec();
        return producers.map(ProducerMapper.toDto);
    }

    async getProducerById(producerId: string): Promise<ProducerDto> {
        logger.info(`[Producer] Fetching producer with id: ${producerId}`);
        const producer = await Producer.findOne({ _id: producerId }).exec();
        return ProducerMapper.toDto(producer);
    }

    async createProducer(
        producerRequest: ProducerRequest
    ): Promise<ProducerDto> {
        const producer = new Producer({
            name: producerRequest.name,
            logoUrl: producerRequest.logoUrl,
        });
        await producer.save();
        return ProducerMapper.toDto(producer);
    }

    async updateProducer(
        producerId: string,
        producerRequest: ProducerRequest
    ): Promise<ProducerDto> {
        logger.info(
            `[Producer] Updating producer with id: ${producerId} with values: ${producerRequest}`
        );
        const producer = await Producer.findOneAndUpdate(
            { _id: producerId },
            {
                $set: {
                    name: producerRequest.name,
                    logoUrl: producerRequest.logoUrl,
                },
            },
            { new: true }
        ).exec();
        return ProducerMapper.toDto(producer);
    }

    async deleteProducer(producerId: string): Promise<void> {
        logger.info(`[Producer] Removing producer with id: ${producerId}`);
        await Producer.findByIdAndDelete(producerId).exec();
    }
}

export default new ProducerService();
