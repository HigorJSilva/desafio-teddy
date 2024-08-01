import { validateRequest } from '@shared/helpers/request/ValidateRequest';
import express from 'express';
import AuthController from './controllers/AuthControler';
import { RegisterRequest } from './middlewares/RegisterRequest';

const authController = new AuthController();

const router = express.Router();

router.post(
  '/register',
  RegisterRequest,
  validateRequest,
  authController.register.bind(AuthController)
);

export default router;
