import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';

import logger from './logger';
import { notFoundMiddleware, errorHandler } from './middlewares';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.enable('trust proxy');

  app.use(
    helmet({
      // contentSecurityPolicy: false,
      // crossOriginResourcePolicy: false,
    }),
  );
  app.use(hpp());
}
// TODO: form 있는 경우 XSS, CSRF 방어 필요!!!
// TODO: SQL Injection 방어 필요!!!

app.use(
  morgan(isProduction ? 'combined' : 'dev', {
    stream: {
      write: (message) => {
        logger.http(message.trim());
      },
    },
  }),
);
app.use(express.urlencoded({ extended: true })); // extended - 객체로 변환
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET!, // !: Non-Null
    resave: false,
    saveUninitialized: false,
    proxy: isProduction, // true - nginx, apache...
    cookie: {
      httpOnly: true,
      secure: isProduction, // true - https
    },
  }),
);

app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;
