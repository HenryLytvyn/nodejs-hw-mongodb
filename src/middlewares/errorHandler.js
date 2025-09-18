import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export default async function errorHandler(err, req, res, next) {
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: 'Something went wrong',
      data: err.message,
    });
    return;
  }

  if (err instanceof MongooseError) {
    res.status(500).json({
      status: 500,
      message: `Mongoose Error: ${err.message}`,
      data: err.message,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
}
