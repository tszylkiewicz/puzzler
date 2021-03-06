import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import UserService, { CreateUserRequest } from '../service/userService'
import logger from '../../../utils/logger'
import { ErrorResponse } from '../../common/errorResponse'

export function getUsers(req: Request, res: Response) {
    res.status(StatusCodes.OK)
    res.send('Hello world')
}

export function addUser(req: Request, res: Response): void {
    const request: CreateUserRequest = {
        userName: req.body.userName,
        email: req.body.email,
    }
    UserService.createUser(request)
        .then((resp) => {
            if ((resp as any).error) {
                if (
                    (resp as ErrorResponse).error.type ===
                    'account_already_exists'
                ) {
                    res.status(StatusCodes.CONFLICT)
                    res.json(resp)
                } else {
                    throw new Error(`unsupported ${resp}`)
                }
            } else {
                res.status(StatusCodes.CREATED)
                res.json(resp)
            }
        })
        .catch((err) => {
            logger.error(`createUser: ${err}`)
            res.status(StatusCodes.BAD_REQUEST)
            res.send(err)
        })
}
