import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { UnauthenticatedError } from '../exceptions/UnauthenticatedError';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IJwtProvider } from '@shared/provider/jwt/IJwtProvider';
import { IUser } from '@modules/users/entity/IUser';
import { UnauthorizedError } from '../exceptions/UnauthorizedError';

export function authorize(roles: string[] | string = []): any {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    async (req: Request, _: Response, next: NextFunction) => {
      const token = req.headers.authorization as string;

      if (!token) {
        roles.includes('guest') ? next() : next(new UnauthenticatedError());
        return;
      }

      const jwtProvider = container.resolve<IJwtProvider>('JwtProvider');
      const usersRepository =
        container.resolve<IUsersRepository>('UsersRepository');

      let decodedToken;
      try {
        decodedToken = jwtProvider.verify<IUser>(token.split(' ')[1]);
      } catch (error) {
        next(new UnauthenticatedError());
        return;
      }
      const user: IUser | null = await usersRepository.findById(
        decodedToken.id
      );

      if (!user) {
        next(new UnauthenticatedError());
        return;
      }

      req.params.userId = user.id;

      if (roles.length && !roles.includes('guest')) {
        next(new UnauthorizedError());
        return;
      }
      next();
    },
  ];
}
