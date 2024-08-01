import { routes } from '@shared/routes/api';
import '../helpers/container/container';
import express from 'express';
import errorHandler from '@shared/helpers/request/ErrorHandler';

const application = express();

application.use(express.json());
application.use(routes);
application.use(errorHandler);

export default application;
