import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProducerService from '../service/producerService';

export async function getAllProducers(
    _req: Request,
    res: Response
): Promise<void> {
    const producers = await ProducerService.getProducers();
    res.status(StatusCodes.OK).send(producers);
}

export async function getProducer(req: Request, res: Response): Promise<void> {
    const producer = await ProducerService.getProducerById(
        req.params.producerId
    );
    if (producer === null) {
        res.sendStatus(404);
    } else {
        res.status(StatusCodes.OK).send(producer);
    }
}

export async function createProducer(
    req: Request,
    res: Response
): Promise<void> {
    const producerId = await ProducerService.createProducer(req.body);
    res.status(StatusCodes.CREATED).send(producerId);
}

export async function updateProducer(
    req: Request,
    res: Response
): Promise<void> {
    const updatedProducer = await ProducerService.updateProducer(
        req.params.producerId,
        req.body
    );
    if (updatedProducer === null) {
        res.sendStatus(404);
    } else {
        res.status(StatusCodes.OK).send(updatedProducer);
    }
}

export async function deleteProducer(
    req: Request,
    res: Response
): Promise<void> {
    await ProducerService.deleteProducer(req.params.producerId);
    res.status(StatusCodes.NO_CONTENT).send();
}
