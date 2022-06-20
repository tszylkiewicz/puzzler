import Puzzle, { IPuzzle } from '../model/puzzle'
import logger from '../../../utils/logger'
import { ErrorResponse } from '../../common/errorResponse'
import ProducerService from '../../producer/service/producerService'
import { Dimension } from '../../common/dimension'

type PuzzleRequest = {
    title: string
    producerId: string
    numberOfPieces: number
    dimensions: Dimension
    modelNumber: string
    releaseDate: Date
    recommendedAge: string
}

export type CreateProducerResponse = { puzzleId: string } | ErrorResponse

class PuzzleService {
    async getProducers(): Promise<IPuzzle[]> {
        logger.info('[Producer] Fetching all puzzles')
        return Puzzle.find()
            .populate({ path: 'producer', select: 'name' })
            .exec()
    }

    async createProducer(
        puzzleRequest: PuzzleRequest
    ): Promise<CreateProducerResponse> {
        const producer = await ProducerService.getProducerById(
            puzzleRequest.producerId
        )
        logger.info(`[Puzzle] Creating new puzzle (producerId: ${producer.id}`)
        const puzzle = new Puzzle({
            title: puzzleRequest.title,
            producer: producer.id,
            numberOfPieces: puzzleRequest.numberOfPieces,
            dimensions: puzzleRequest.dimensions,
            modelNumber: puzzleRequest.modelNumber,
            releaseDate: puzzleRequest.releaseDate,
            recommendedAge: puzzleRequest.recommendedAge,
        })
        await puzzle.save()
        return { puzzleId: puzzle._id }
    }
}

export default new PuzzleService()
