import { IUser } from '../entity/IUser';
import { IRegisterUser } from '../middlewares/RegisterRequest';

export interface IUsersRepository {
  create(data: IRegisterUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
}
