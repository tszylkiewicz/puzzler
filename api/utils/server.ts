import express, { Express } from 'express'
import morganBody from 'morgan-body'
import { ProducerRoutes } from '../src/producer/routes'
import { UserRoutes } from '../src/user/routes'
import config from '../src/config'
import { PuzzleRoutes } from '../src/puzzle/routes'

export async function createServer(): Promise<Express> {
    const server = express()

    server.use(express.json())

    if (config.morganBody.enbabled) {
        morganBody(server)
    }

    server.use('/api/users/v1', new UserRoutes().router)
    server.use('/api/producers/v1', new ProducerRoutes().router)
    server.use('/api/puzzles/v1', new PuzzleRoutes().router)

    return server
}
