import { invalidUrl, requiredMessage } from '@shared/helpers/messages/messages';
import { body, param } from 'express-validator';

export const DeleteShortLinkRequest = [
  param('id').notEmpty().withMessage(requiredMessage).isUUID(),
];
