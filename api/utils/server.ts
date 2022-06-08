import express from 'express'
import morganBody from 'morgan-body'
import { ProducerRoutes } from '../src/producer/routes'
import { UserRoutes } from '../src/user/routes'

export async function createServer(): Promise<any> {
    const server = express()

    server.use(express.json())

    morganBody(server)

    server.use('/api/users/v1', new UserRoutes().router)
    server.use('/api/producers/v1', new ProducerRoutes().router)

    return server
}
