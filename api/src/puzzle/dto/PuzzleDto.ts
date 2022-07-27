import { Dimension } from '../../common/dimension';

export type PuzzleRequest = {
    title: string;
    producerId: string;
    numberOfPieces: number;
    dimensions: Dimension;
    modelNumber: string;
    releaseDate: Date;
    recommendedAge: string;
};
