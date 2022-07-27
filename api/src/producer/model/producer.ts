import { model, Schema } from 'mongoose';
import { BaseDocument } from '../../common/BaseDocument';

export interface IProducer extends BaseDocument {
    name: string;
    logoUrl?: string;
}

const ProducerSchema: Schema = new Schema<IProducer>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    logoUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default model<IProducer>('Producer', ProducerSchema);
