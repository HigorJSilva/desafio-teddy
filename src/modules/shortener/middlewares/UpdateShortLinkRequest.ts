import { invalidUrl, requiredMessage } from '@shared/helpers/messages/messages';
import { body, param } from 'express-validator';

export const UpdateShortLinkRequest = [
  param('id').notEmpty().withMessage(requiredMessage).isUUID(),
  body('url')
    .notEmpty()
    .withMessage(requiredMessage)
    .toLowerCase()
    .isURL()
    .withMessage(invalidUrl),
];
