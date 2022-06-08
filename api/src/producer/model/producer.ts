import { Document, Schema, model } from 'mongoose'

export interface IProducer extends Document {
    name: string
    logoUrl: string
    createdAt: Date
    updatedAt: Date
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
})

export default model<IProducer>('Producer', ProducerSchema)
