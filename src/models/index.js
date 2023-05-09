import Sequelize from 'sequelize';
import configObj from '../config/config';

// const fs = require('fs');
// const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = configObj[env];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;

// const basename = path.basename(__filename);
// fs.readdirSync(__dirname)
//   .filter((file) => {
//     // .model.js
//     return (
//       file.indexOf('.') !== 0 &&
//       !file.includes('test') &&
//       file !== basename &&
//       file.slice(-3) == '.js'
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file));
//     console.log(file, model.name);
//     db[model.name] = model;
//     model.initiate(sequelize);
//   });
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

module.exports = db;
