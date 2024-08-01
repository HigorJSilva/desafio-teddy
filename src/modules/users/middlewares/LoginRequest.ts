import {
  requiredMessage,
  emailNotValid,
  weakPassword,
} from '@shared/helpers/messages/messages';
import { body } from 'express-validator';

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoggedUser {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const LoginRequest = [
  body('email')
    .notEmpty()
    .withMessage(requiredMessage)
    .toLowerCase()
    .isEmail()
    .withMessage(emailNotValid),
  body('password').notEmpty().withMessage(requiredMessage),
];
