import express from 'express';
import usersRoutes from '@modules/users/routes';
import shortenerRoutes from '@modules/shortener/routes';

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/shortener', shortenerRoutes);

export { routes };
