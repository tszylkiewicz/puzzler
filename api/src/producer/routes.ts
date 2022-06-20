import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response, Router } from 'express'
import { ValidationError } from '../common/validationError'
import ProducerController from './controller/producerController'
import { ProducerRequest } from './dto/producerDto'

const validationMw = (dtoClass: any) => {
    return function (req: Request, res: Response, next: NextFunction) {
        const output: any = plainToInstance(dtoClass, req.body)
        validate(output, { skipMissingProperties: true }).then((errors) => {
            // errors is an array of validation errors
            if (errors.length > 0) {
                const validationError: ValidationError = {
                    errorCode: 'VALIDATION_ERRORS',
                    errorMessage: 'Multiple validation errors',
                    validations: [],
                }
                for (const errorItem of errors) {
                    validationError.validations.push({
                        property: errorItem.property,
                        code: '',
                    })
                }
                res.status(400).send(validationError)
                return
            } else {
                res.locals.input = output
                next()
            }
        })
    }
}

export class ProducerRoutes {
    router: Router

    constructor() {
        this.router = Router()
        this.routes()
    }

    routes(): void {
        this.router.get('/', ProducerController.getAllProducers)
        this.router.post(
            '/',
            validationMw(ProducerRequest),
            ProducerController.createProducer
        )
        this.router.get('/:producerId', ProducerController.getProducer)
        this.router.put('/:producerId', ProducerController.updateProducer)
        this.router.delete('/:producerId', ProducerController.deleteProducer)
    }
}
