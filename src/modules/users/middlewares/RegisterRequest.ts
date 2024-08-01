import {
  emailNotValid,
  requiredMessage,
  weakPassword,
} from '@shared/helpers/messages/messages';
import { body } from 'express-validator';

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

export const RegisterRequest = [
  body('name').notEmpty().withMessage(requiredMessage),
  body('email')
    .notEmpty()
    .withMessage(requiredMessage)
    .toLowerCase()
    .isEmail()
    .withMessage(emailNotValid),
  body('password')
    .notEmpty()
    .withMessage(requiredMessage)
    .isStrongPassword()
    .withMessage(weakPassword),
];
