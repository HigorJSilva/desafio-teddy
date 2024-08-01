import { IHashProvider } from '@shared/provider/hash/HashProvider';
import { IRegisterUser } from '../middlewares/RegisterRequest';
import { IUser } from '../entity/IUser';
import { emailNotUnique } from '@shared/helpers/messages/messages';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { ValidationError } from '@shared/helpers/exceptions/ValidationError';

@injectable()
class UserService {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) {}

  public async register({
    name,
    email,
    password,
  }: IRegisterUser): Promise<IUser | null> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new ValidationError(emailNotUnique);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default UserService;
