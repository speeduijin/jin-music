import { RequestHandler, ErrorRequestHandler } from 'express';
import logger from './logger';

export const notFoundMiddleware: RequestHandler = (req, res, next) => {
  const error = new Error(`${req.method} ${req.url} route does not exist.`);
  error.status = 404;
  next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err.message);

  const { message } = err;
  const error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.json({ message, status: error.status, stack: error.stack });
};
