import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { FieldPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import { promisePool } from '../db';
import logger from '../logger';
import User from '../../types/user';

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const [rows]: [User[], FieldPacket[]] = await promisePool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email],
          );
          const exUser = rows[0];

          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);

            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          logger.error(error);
          done(error);
        }
      },
    ),
  );
};
