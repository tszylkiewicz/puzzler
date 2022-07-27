import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../service/userService';
import logger from '../../../utils/logger';
import { ErrorResponse } from '../../common/ErrorResponse';
import { CreateUserRequest } from '../dto/UserDto';

export async function addUser(req: Request, res: Response): Promise<void> {
    const request: CreateUserRequest = {
        userName: req.body.userName,
        email: req.body.email,
    };
    try {
        const resp = await UserService.createUser(request);
        if ((resp as any).error) {
            if (
                (resp as ErrorResponse).error.type === 'account_already_exists'
            ) {
                res.status(StatusCodes.CONFLICT);
                res.json(resp);
            } else {
                throw new Error(`unsupported ${resp}`);
            }
        } else {
            res.status(StatusCodes.CREATED);
            res.json(resp);
        }
    } catch (e) {
        logger.error(`createUser: ${e}`);
        res.status(StatusCodes.BAD_REQUEST);
        res.send(e);
    }
}
