import { NextFunction, Request, Response } from 'express';
import { handleErrorMessage } from './ErrorMessageHandler';
import { validationResult } from 'express-validator';

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsArray = handleErrorMessage(errors.array());

    res.status(422).json({ message: errorsArray });
    return;
  }

  next();
}
