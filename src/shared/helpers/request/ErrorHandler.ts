import { NextFunction, Response, Request } from 'express';
import { ValidationError } from '../exceptions/ValidationError';
import { internalError, unauthenticatedUser } from '../messages/messages';
import { UnauthenticatedError } from '../exceptions/UnauthenticatedError';

function errorHandler(
  err: TypeError,
  _: Request,
  res: Response,
  next: NextFunction
) {
  switch (true) {
    case err instanceof UnauthenticatedError:
      res.status(401).json({ message: unauthenticatedUser });
      break;

    case err instanceof ValidationError:
      res.status(422).json({ message: err.message });
      break;

    default:
      console.log(err);
      res.status(500).json({ message: internalError });
      break;
  }

  next();
}
export default errorHandler;
