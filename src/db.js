import { sequelize } from './models';

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('✅ Connected to DB');
  })
  .catch((err) => {
    console.log('❌ DB Error', err);
  });
