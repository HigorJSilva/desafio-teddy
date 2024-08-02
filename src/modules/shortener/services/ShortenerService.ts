import { inject, injectable } from 'tsyringe';
import { IShortenerRepository } from '../repositories/IShortenerRepository';
import Shortener from '../entity/Shortener';
import { IShortener } from '../entity/IShortener';
import { randomBytes } from 'node:crypto';
import { parse } from 'node:url';

@injectable()
export default class ShortenerService {
  constructor(
    @inject('ShortenerRepository')
    private readonly shortenerRepository: IShortenerRepository
  ) {}

  public async create(
    url: string,
    hostname: string,
    userId: string | null
  ): Promise<IShortener | null> {
    const shortLink = await this.shortenerRepository.create(
      url,
      hostname + '/' + this.generateShortCode(),
      userId
    );
    return shortLink as IShortener;
  }

  private generateShortCode(): string {
    return randomBytes(3).toString('hex');
  }
}
