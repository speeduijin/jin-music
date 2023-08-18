import path from 'path';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';

import { notFoundMiddleware, errorHandler } from './middlewares';

const app = express();
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
const sessionOption = {
  secret: process.env.COOKIE_SECRET!, // !: Non-Null
  resave: false,
  saveUninitialized: false,
  proxy: false,
  cookie: {
    httpOnly: true,
    secure: false, // true - https
  },
};

if (process.env.NODE_ENV === 'production') {
  // sessionOption.proxy = true;
  // sessionOption.cookie.secure = true;

  // app.enable('trust proxy');
  app.use(
    helmet({
      // contentSecurityPolicy: false,
      // crossOriginEmbedderPolicy: false,
      // crossOriginResourcePolicy: false,
    }),
  );
  app.use(hpp());
}

app.use(morgan(logFormat));
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(sessionOption));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;
