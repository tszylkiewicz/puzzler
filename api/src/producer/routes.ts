import { Router } from 'express'
import ProducerController from './controller/producerController'

export class ProducerRoutes {
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes(): void {
        this.router.get('/', ProducerController.getAllProducers)
        this.router.post('/', ProducerController.createProducer)
        this.router.get('/:producerId', ProducerController.getProducer)
    }
}
