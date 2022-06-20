import { Router } from 'express'
import PuzzleController from './controller/puzzleController'

export class PuzzleRoutes {
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes(): void {
        this.router.get('/', PuzzleController.getAllProducers)
        this.router.post('/', PuzzleController.createPuzzle)
    }
}
