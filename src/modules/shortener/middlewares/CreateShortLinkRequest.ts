import { invalidUrl, requiredMessage } from '@shared/helpers/messages/messages';
import { body } from 'express-validator';

export const CreateShortLinkRequest = [
  body('url')
    .notEmpty()
    .withMessage(requiredMessage)
    .toLowerCase()
    .isURL()
    .withMessage(invalidUrl),
];
