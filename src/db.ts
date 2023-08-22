import { createPool } from 'mysql2';
import configObj from './config/config';
import logger from './logger';

const env = (process.env.NODE_ENV as 'production' | 'test') || 'development';
const config = configObj[env];

const pool = createPool(config);
const promisePool = pool.promise();

promisePool
  .execute('SELECT 1')
  .then(() => {
    logger.info('✅ Connected to DB');
  })
  .catch((err) => {
    logger.error('❌ DB Error', err);
  });

export default promisePool;
