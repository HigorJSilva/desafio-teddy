import express from 'express';
import usersRoutes from '@modules/users/routes';
import shortenerRoutes from '@modules/shortener/routes';
import { validateRequest } from '@shared/helpers/request/ValidateRequest';
import ShortenerController from '@modules/shortener/controllers/ShortenerController';
import { VisitShortLinkRequest } from '@modules/shortener/middlewares/VisitShortLinkRequest';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../docs/swagger_output.json';

const routes = express.Router();
const shortenerController = new ShortenerController();

routes.use('/users', usersRoutes);
routes.use('/shortener', shortenerRoutes);

routes.use(
  '/api',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customSiteTitle: 'Teddy Api' })
);

routes.use(
  '/:id',
  VisitShortLinkRequest,
  validateRequest,
  shortenerController.visit
);

export { routes };
