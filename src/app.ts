import * as bodyParser from 'body-parser';
import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import { UserController } from './business/controllers/user.controller';
import { errorHandler } from './business/middlewares/errorHandler';
import { NotFoundError } from './business/utils/errors/NotFoundError';

class App { 

    public express: express.Application;

    constructor() {
        dotenv.config();
        this.express = express();
        this.middleware();
        this.setControllers();
        this.express.use(errorHandler);
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cors());
    }

    private setControllers(){
        const userController = new UserController();
        this.express.use('/api/users', userController.router);

        this.express.all('/*', () => {
            throw new NotFoundError();
        });
    }

}

export default new App().express;