import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/repositories/UsersRepository';
import BcryptHashProvider from '@shared/provider/hash/BcryptAdapter';
import { IHashProvider } from '@shared/provider/hash/HashProvider';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
