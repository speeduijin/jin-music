import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'express-flash';
import { localsMiddleware } from './middlewares';

import rootRouter from './routers/rootRouter';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(localsMiddleware);
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('assets'));

app.use('/', rootRouter);
/*
Add more routers here!
*/

// error
app.use((req, res, next) => {
  // 404 NOT FOUND
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 에러 로그를 서비스에 넘김
  res.status(err.status || 500);
  res.render('error');
});

export default app;
