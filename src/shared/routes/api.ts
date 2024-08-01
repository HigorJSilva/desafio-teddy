import express from 'express';
import usersRoutes from '@modules/users/routes';

const routes = express.Router();

routes.use('/users', usersRoutes);

export { routes };
