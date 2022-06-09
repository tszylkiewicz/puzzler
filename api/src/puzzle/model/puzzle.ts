import { model, Schema } from 'mongoose'
import { IDocument } from '../../common/BaseDocument'

export interface IPuzzle extends IDocument {
    title: string
    producer: string
}

const PuzzleSchema: Schema = new Schema<IPuzzle>({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    producer: {
        type: Schema.Types.ObjectId,
        ref: 'Producer',
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

export default model<IPuzzle>('Puzzle', PuzzleSchema)
