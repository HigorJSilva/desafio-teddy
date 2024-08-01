import { Repository } from 'typeorm';
import User from '../entity/User';
import { AppDataSource } from '@shared/database/datasource';
import { IRegisterUser } from '../middlewares/RegisterRequest';
import { IUser } from '../entity/IUser';
import { IUsersRepository } from './IUsersRepository';

class UsersRepository implements IUsersRepository {
  private readonly ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: IRegisterUser): Promise<IUser> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({
      email,
    });

    return user;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({
      id,
    });

    return user;
  }
}

export default UsersRepository;
