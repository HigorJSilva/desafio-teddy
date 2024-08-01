import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import UserService from '../services/UserService';
import { getSanitizedRequest } from '@shared/helpers/request/SanitizedRequest';

class AuthController {
  public async register(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const userService = container.resolve(UserService);

      const user = await userService.register(getSanitizedRequest(request));

      next();

      return response.json(user);
    } catch (error) {
      next(error);
    }
  }

  public async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const userService = container.resolve(UserService);

      const user = await userService.login(getSanitizedRequest(request));

      next();

      return response.json(user);
    } catch (error) {
      next(error);
    }
  }
}
export default AuthController;
