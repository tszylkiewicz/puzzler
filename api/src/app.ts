import express from 'express';
import { connect } from 'mongoose';
import { UserRoutes } from './user/routes';


require("dotenv").config();
export class App {
    server: express.Application;
    port: string;
    mongoUrl: string;

    constructor() {
        this.server = express();
        this.port = process.env.PORT;
        this.mongoUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

        this.config();
        this.routes();
        this.mongo();
    }

    config(): void {
        this.server.use(express.json());
    }

    routes(): void {
        this.server.use('/api/users', new UserRoutes().router);
    }

    mongo(): void {
        const run = async () => {
            await connect(this.mongoUrl);
        };
        run().catch(error => console.error(error));
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}