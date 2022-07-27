import { Router } from 'express';
import { addUser } from './controller/userController';

export class UserRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes(): void {
        this.router.post('/', addUser);
    }
}
