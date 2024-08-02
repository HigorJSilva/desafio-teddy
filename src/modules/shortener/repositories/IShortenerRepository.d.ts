import { IShortener } from '../entity/IShortener';
import Shortener from '../entity/Shortener';

export interface IShortenerRepository {
  create(
    originUrl: string,
    shortUrl: string,
    userId: string | null
  ): Promise<IShortener>;
  findByShortUrl(shortUrl: string): Promise<IShortener | null>;
  findById(id: string): Promise<IShortener | null>;
  findByUserId(userId: string): Promise<Shortener[] | null>;
}
