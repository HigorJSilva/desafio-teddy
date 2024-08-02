import { requiredMessage } from '@shared/helpers/messages/messages';
import { param } from 'express-validator';

export const VisitShortLinkRequest = [
  param('id').notEmpty().withMessage(requiredMessage),
];
