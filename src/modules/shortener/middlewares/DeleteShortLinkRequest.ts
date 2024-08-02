import { requiredMessage } from '@shared/helpers/messages/messages';
import { param } from 'express-validator';

export const DeleteShortLinkRequest = [
  param('id').notEmpty().withMessage(requiredMessage).isUUID(),
];
