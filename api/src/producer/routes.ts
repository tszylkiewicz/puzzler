import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response, Router } from 'express';
import { ValidationError } from '../common/validationError';
import { ProducerRequest } from './dto/producerDto';
import {
    createProducer,
    deleteProducer,
    getAllProducers,
    getProducer,
    updateProducer,
} from './controller/producerController';

const validationMw = (dtoClass: any) => {
    return function (req: Request, res: Response, next: NextFunction) {
        const output: any = plainToInstance(dtoClass, req.body);
        validate(output, { skipMissingProperties: true }).then((errors) => {
            // errors is an array of validation errors
            if (errors.length > 0) {
                const validationError: ValidationError = {
                    errorCode: 'VALIDATION_ERRORS',
                    errorMessage: 'Multiple validation errors',
                    validations: [],
                };
                for (const errorItem of errors) {
                    validationError.validations.push({
                        property: errorItem.property,
                        code: '',
                    });
                }
                res.status(400).send(validationError);
            } else {
                res.locals.input = output;
                next();
            }
        });
    };
};

export class ProducerRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.get('/', getAllProducers);
        this.router.post('/', validationMw(ProducerRequest), createProducer);
        this.router.get('/:producerId', getProducer);
        this.router.put('/:producerId', updateProducer);
        this.router.delete('/:producerId', deleteProducer);
    }
}
