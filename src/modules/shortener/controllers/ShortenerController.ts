import { getSanitizedRequest } from '@shared/helpers/request/SanitizedRequest';
import { NextFunction, Response, Request } from 'express';
import { container } from 'tsyringe';
import ShortenerService from '../services/ShortenerService';

class ShortenerController {
  public async list(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const shortenerService = container.resolve(ShortenerService);

      const list = await shortenerService.list(request.params.userId);

      return response.json(list);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const payload = <{ url: string }>getSanitizedRequest(request);
      const shortenerService = container.resolve(ShortenerService);

      const shortLink = await shortenerService.create(
        payload.url,
        request.protocol + '://' + request.hostname,
        request.params.userId
      );

      next();
      return response.json(shortLink);
    } catch (error) {
      next(error);
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const payload = <{ id: string; url: string }>getSanitizedRequest(request);
      const shortenerService = container.resolve(ShortenerService);

      const shortLink = await shortenerService.update(
        payload.url,
        payload.id,
        request.params.userId
      );

      return response.json(shortLink);
    } catch (error) {
      next(error);
    }
  }
}

export default ShortenerController;
