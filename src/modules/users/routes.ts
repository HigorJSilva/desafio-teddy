import { validateRequest } from '@shared/helpers/request/ValidateRequest';
import express from 'express';
import AuthController from './controllers/AuthControler';
import { RegisterRequest } from './middlewares/RegisterRequest';
import { LoginRequest } from './middlewares/LoginRequest';

const authController = new AuthController();

const router = express.Router();

router.post(
  '/register',
  RegisterRequest,
  validateRequest,
  authController.register.bind(AuthController)
);

router.post('/login', LoginRequest, validateRequest, authController.login);

export default router;
