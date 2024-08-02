import { getSanitizedRequest } from '@shared/helpers/request/SanitizedRequest';
import { NextFunction, Response, Request } from 'express';
import { container } from 'tsyringe';
import ShortenerService from '../services/ShortenerService';

class ShortenerController {
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
}

export default ShortenerController;
