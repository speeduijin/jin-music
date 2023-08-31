import { RequestHandler } from 'express';
import passport from 'passport';
import { FieldPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import { promisePool } from '../config/db';
import logger from '../config/logger';

const join: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [rows]: [Express.User[], FieldPacket[]] = await promisePool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email],
    );
    const exUser = rows[0];

    if (exUser) {
      return res.redirect('/login');
    }
    const hashPassword = await bcrypt.hash(password, 12);

    await promisePool.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashPassword],
    );
    return res.redirect('/');
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

const login: RequestHandler = (req, res, next) => {
  passport.authenticate(
    'local',
    (authError: any, user: Express.User, info: { message: string }) => {
      if (authError) {
        logger.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.redirect(`/?loginError=${info?.message}`);
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          logger.error(loginError);
          return next(loginError);
        }
        return res.redirect('/auth/profile');
      });
    },
  )(req, res, next);
};

const logout: RequestHandler = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
};

export { join, login, logout };
