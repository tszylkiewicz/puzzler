import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from './user'

export class UserController {
    public getUsers(req: Request, res: Response) {
        res.status(StatusCodes.OK);
        res.send('Hello world');
    };

    public addUser(req: Request, res: Response) {
        let newUser = new User(req.body);
        newUser.save((err: any, user: any) => {
            if (err) {
                console.error(err.message);
                res.status(StatusCodes.BAD_REQUEST)
                res.send(err);
            }
            res.json(user)
        });
    }
}