import { IsNull, Repository } from 'typeorm';
import Shortener from '../entity/Shortener';
import { IShortenerRepository } from './IShortenerRepository';
import { AppDataSource } from '@shared/database/datasource';
import { IShortener } from '../entity/IShortener';

export default class ShortenerRepository implements IShortenerRepository {
  private readonly ormRepository: Repository<Shortener>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Shortener);
  }
  public async create(
    originUrl: string,
    shortUrl: string,
    userId: string | null
  ): Promise<IShortener> {
    const shortLink = this.ormRepository.create({
      originUrl,
      shortUrl,
      userId,
    });

    await this.ormRepository.save(shortLink);

    return shortLink;
  }

  public async findByUserId(userId: string): Promise<Shortener[] | null> {
    return await this.ormRepository.find({
      where: {
        userId,
        deleted_at: IsNull(),
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  findByShortUrl(shortUrl: string): Promise<IShortener | null> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<IShortener | null> {
    throw new Error('Method not implemented.');
  }
}
