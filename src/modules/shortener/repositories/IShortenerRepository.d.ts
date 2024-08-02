import { IShortener } from '../entity/IShortener';
import Shortener from '../entity/Shortener';

export interface IShortenerRepository {
  create(
    originUrl: string,
    shortUrl: string,
    userId: string | null
  ): Promise<IShortener>;
  save(shortenUrl: Shortener): Promise<Shortener>;
  findByShortUrl(shortUrl: string): Promise<IShortener | null>;
  findById(id: string, userId: string): Promise<IShortener | null>;
  findByUserId(userId: string): Promise<Shortener[] | null>;
}
