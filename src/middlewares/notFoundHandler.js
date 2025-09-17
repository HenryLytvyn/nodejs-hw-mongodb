import createHttpError from 'http-errors';

export default async function notFoundHandler(err, req, res, next) {
  next(createHttpError(404, 'Route not found'));
}
