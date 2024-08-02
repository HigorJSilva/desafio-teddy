import { authorize } from '@shared/helpers/request/Autorize';
import { validateRequest } from '@shared/helpers/request/ValidateRequest';
import ShortenerController from './controllers/ShortenerController';
import express from 'express';
import { CreateShortLinkRequest } from './middlewares/CreateShortLinkRequest';
import { UpdateShortLinkRequest } from './middlewares/UpdateShortLinkRequest';
import { DeleteShortLinkRequest } from './middlewares/DeleteShortLinkRequest';

const shortenerController = new ShortenerController();

const router = express.Router();

router.get('/', authorize(), validateRequest, shortenerController.list);

router.post(
  '/',
  authorize('guest'),
  CreateShortLinkRequest,
  validateRequest,
  shortenerController.create
);

router.put(
  '/:id',
  authorize(),
  UpdateShortLinkRequest,
  validateRequest,
  shortenerController.update
);

router.delete(
  '/:id',
  authorize(),
  DeleteShortLinkRequest,
  validateRequest,
  shortenerController.delete
);

export default router;
