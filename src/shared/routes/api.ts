import express from 'express';
import usersRoutes from '@modules/users/routes';
import shortenerRoutes from '@modules/shortener/routes';
import { validateRequest } from '@shared/helpers/request/ValidateRequest';
import ShortenerController from '@modules/shortener/controllers/ShortenerController';
import { VisitShortLinkRequest } from '@modules/shortener/middlewares/VisitShortLinkRequest';

const routes = express.Router();
const shortenerController = new ShortenerController();

routes.use('/users', usersRoutes);
routes.use('/shortener', shortenerRoutes);

routes.use(
  '/:id',
  VisitShortLinkRequest,
  validateRequest,
  shortenerController.visit
);

export { routes };
