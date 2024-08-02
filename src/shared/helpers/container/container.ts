import { IShortenerRepository } from '@modules/shortener/repositories/IShortenerRepository';
import ShortenerRepository from '@modules/shortener/repositories/ShortenerRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import BcryptHashProvider from '@shared/provider/hash/BcryptAdapter';
import { IHashProvider } from '@shared/provider/hash/HashProvider';
import { IJwtProvider } from '@shared/provider/jwt/IJwtProvider';
import JwtProviderAdapter from '@shared/provider/jwt/JwtAdapter';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
container.registerSingleton<IShortenerRepository>(
  'ShortenerRepository',
  ShortenerRepository
);

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
container.registerSingleton<IJwtProvider>('JwtProvider', JwtProviderAdapter);
