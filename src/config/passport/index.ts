import passport from 'passport';
import { FieldPacket } from 'mysql2';
import { promisePool } from '../db';
import local from './localStrategy';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const [rows]: [Express.User[], FieldPacket[]] = await promisePool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id],
    );
    const user = rows[0];
    done(null, user);
  });

  local();
};
