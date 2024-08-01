import { routes } from '@shared/routes/api';
import express from 'express';

const application = express();

application.use(express.json());

export default application;
