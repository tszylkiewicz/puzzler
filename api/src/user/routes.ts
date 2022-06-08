import { Router } from 'express';
import { addUser, getUsers } from './controller/userController';

export class UserRoutes {
    router: Router;

    constructor() {
        this.router = Router()
        this.routes();
    }

    routes(): void {
        this.router.get('/', getUsers);
        this.router.post('/', addUser);
    }
}