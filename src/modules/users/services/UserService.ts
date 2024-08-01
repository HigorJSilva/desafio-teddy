import { IHashProvider } from '@shared/provider/hash/HashProvider';
import { IRegisterUser } from '../middlewares/RegisterRequest';
import { IUser } from '../entity/IUser';
import {
  emailNotUnique,
  userCredsMatch,
} from '@shared/helpers/messages/messages';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { ValidationError } from '@shared/helpers/exceptions/ValidationError';
import User from '../entity/User';
import { ILoggedUser, ILoginUser } from '../middlewares/LoginRequest';
import { IJwtProvider } from '@shared/provider/jwt/IJwtProvider';

@injectable()
class UserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    @inject('JwtProvider')
    private readonly jwtProvider: IJwtProvider
  ) {}

  public async register(userData: IRegisterUser): Promise<IUser | null> {
    const emailExists = await this.usersRepository.findByEmail(userData.email);

    if (emailExists) {
      throw new ValidationError(emailNotUnique);
    }

    const hashedPassword = await this.hashProvider.generateHash(
      userData.password
    );

    const user = await this.usersRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    const { password, ...protectedUser } = user;

    return protectedUser as User;
  }

  public async login(loginData: ILoginUser): Promise<ILoggedUser> {
    const userExists = await this.usersRepository.findByEmail(loginData.email);

    if (!userExists) {
      throw new ValidationError(userCredsMatch);
    }

    const matchPassword = await this.hashProvider.compareHash(
      loginData.password,
      userExists.password
    );

    if (!matchPassword) {
      throw new ValidationError(userCredsMatch);
    }

    const { password, ...protectedUser } = userExists;

    return { user: protectedUser, token: this.jwtProvider.sign(protectedUser) };
  }
}

export default UserService;
