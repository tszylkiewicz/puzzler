import Puzzle, { IPuzzle } from '../model/puzzle'
import logger from '../../../utils/logger'
import { ErrorResponse } from '../../common/errorResponse'
import ProducerService from '../../producer/service/producerService'

type PuzzleRequest = {
    title: string
    producerId: string
}

export type CreateProducerResponse = { puzzleId: string } | ErrorResponse

class PuzzleService {
    async getProducers(): Promise<IPuzzle[]> {
        logger.info('[Producer] Fetching all puzzles')
        return Puzzle.find().populate('producer').exec()
    }

    async createProducer(
        puzzleRequest: PuzzleRequest
    ): Promise<CreateProducerResponse> {
        const producer = await ProducerService.getProducerById(
            puzzleRequest.producerId
        )
        logger.info(`[Puzzle] Creating new puzzle (producerId: ${producer._id}`)
        const puzzle = new Puzzle({
            title: puzzleRequest.title,
            producer: producer._id,
        })
        await puzzle.save()
        return { puzzleId: puzzle._id }
    }
}

export default new PuzzleService()
