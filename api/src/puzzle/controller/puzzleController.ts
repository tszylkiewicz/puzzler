import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import PuzzleService from '../service/puzzleService';

export const getAllPuzzles = async (
    req: Request,
    res: Response
): Promise<void> => {
    const puzzles = await PuzzleService.getProducers();
    res.status(StatusCodes.OK).send(puzzles);
};

export async function createPuzzle(req: Request, res: Response): Promise<void> {
    const producerId = await PuzzleService.createPuzzle(req.body);
    res.status(StatusCodes.CREATED).send(producerId);
}
