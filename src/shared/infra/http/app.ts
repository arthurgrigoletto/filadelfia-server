import 'reflect-metadata';
import 'dotenv/config';

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import helmet from 'helmet';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import StatusCode from '@shared/errors/StatusCodes';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

class App {
  public server: Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares(): void {
    this.server.use(helmet());
    this.server.use(rateLimiter);
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use('/files', express.static(uploadConfig.uploadFolder));
    this.server.use(routes);
  }

  private exceptionHandler(): void {
    this.server.use(errors);

    this.server.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response
            .status(err.statusCode)
            .json({ status: 'error', message: err.message });
        }

        console.log(err.message);

        return response
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ status: 'error', message: 'Internal Server Error' });
      },
    );
  }
}

export default new App().server;
