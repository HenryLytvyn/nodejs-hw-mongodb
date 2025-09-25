import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export default function isValidId(req, res, next) {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId))
    next(createHttpError(400, 'Invalid contact Id!'));

  next();
}
