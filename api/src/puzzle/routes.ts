import { Router } from 'express';
import { createPuzzle, getAllPuzzles } from './controller/puzzleController';

export class PuzzleRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', getAllPuzzles);
        this.router.post('/', createPuzzle);
    }
}
