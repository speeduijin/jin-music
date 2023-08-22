export default {
  development: {
    host: '127.0.0.1',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DEV_DATABASE,
  },
  test: {
    host: '127.0.0.1',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_TEST_DATABASE,
  },
  production: {
    host: process.env.MYSQL_PROD_HOST,
    user: process.env.MYSQL_PROD_USER,
    password: process.env.MYSQL_PROD_PASSWORD,
    database: process.env.MYSQL_PROD_DATABASE,
  },
};
