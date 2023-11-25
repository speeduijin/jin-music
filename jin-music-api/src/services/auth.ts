import { FieldPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import { promisePool } from '../config/db';
import { isValidEmail, isValidPassword } from '../utils/validation';
import User from '../types/user';

const join = async (reqEmail: string, reqPassword: string) => {
  if (!isValidEmail(reqEmail)) return 'invalidEmail';

  if (!isValidPassword(reqPassword)) return 'invalidPassword';

  const [rows]: [User[], FieldPacket[]] = await promisePool.execute(
    'SELECT * FROM users WHERE email = ?',
    [reqEmail],
  );

  const exUser = rows[0];

  if (exUser) return 'exUser';

  const hashPassword = await bcrypt.hash(reqPassword, 12);

  await promisePool.execute(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [reqEmail, hashPassword],
  );

  return 'sucessJoin';
};

export default join;
