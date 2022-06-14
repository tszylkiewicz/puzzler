import { IProducer } from '../model/producer'
import { ProducerDto } from './producerDto'

export class ProducerMapper {
    public static toDto(producer: IProducer): ProducerDto {
        return {
            id: producer.id,
            name: producer.name,
            logoUrl: producer.logoUrl,
        }
    }
}
