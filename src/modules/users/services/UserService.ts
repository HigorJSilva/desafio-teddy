import { IHashProvider } from '@shared/provider/hash/HashProvider';
import { IRegisterUser } from '../middlewares/RegisterRequest';
import { IUser } from '../entity/IUser';
import { emailNotUnique } from '@shared/helpers/messages/messages';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { ValidationError } from '@shared/helpers/exceptions/ValidationError';
import User from '../entity/User';

@injectable()
class UserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider
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
}

export default UserService;
