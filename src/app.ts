import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import passport from 'passport';
import morgan from 'morgan';
import helmet from 'helmet';

import authRouter from './routes/auth';
import songRouter from './routes/song';
import { notFoundHandler, errorHandler } from './utils/errorHandler';
import passportConfig from './config/passport';
import logger from './config/logger';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

passportConfig();

if (isProduction) {
  app.enable('trust proxy');

  app.use(
    helmet({
      // contentSecurityPolicy: false,
      // crossOriginResourcePolicy: false,
    }),

    // TODO: form 있는 경우 XSS, CSRF 방어 필요!!!
    // TODO: SQL Injection 방어 필요!!!
  );
}

app.use(
  morgan(isProduction ? 'combined' : 'dev', {
    stream: {
      write: (message) => {
        logger.info(message);
      },
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended - 객체로 변환
app.use(cookieParser());
app.use(compression());
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
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/song', songRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
