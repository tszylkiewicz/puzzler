import { model, Schema } from 'mongoose';
import { Dimension } from '../../common/dimension';
import { BaseDocument } from '../../common/BaseDocument';

export interface IPuzzle extends BaseDocument {
    title: string;
    producer: string;
    numberOfPieces: number;
    dimensions: Dimension;
    modelNumber: string;
    releaseDate: Date;
    recommendedAge: string;
}

const PuzzleSchema: Schema = new Schema<IPuzzle>({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    numberOfPieces: {
        type: Number,
    },
    dimensions: {
        type: {
            length: Number,
            width: Number,
            unit: String,
        },
    },
    modelNumber: {
        type: String,
    },
    releaseDate: {
        type: Date,
    },
    recommendedAge: {
        type: String,
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
});

export default model<IPuzzle>('Puzzle', PuzzleSchema);
