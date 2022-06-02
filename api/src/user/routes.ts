import { Router } from 'express';
import { UserController } from './userController';

export class UserRoutes {
    router: Router;
    userController: UserController;

    constructor() {
        this.router = Router()
        this.userController = new UserController();
        this.routes();
    }

    routes(): void {
        this.router.get('/', this.userController.getUsers);
        this.router.post('/', this.userController.addUser);
    }
}