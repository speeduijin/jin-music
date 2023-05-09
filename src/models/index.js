import Sequelize from 'sequelize';
import configObj from '../config/config';
import Song from '../models/Song';

// const fs = require('fs');
// const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = configObj[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Song.initiate(sequelize);

// 10개의 더미 레코드를 추가합니다.
// (async () => {
//   await sequelize.sync({ force: true });
//   await Song.bulkCreate([
//     { title: 'song1', artist: 'artist1', playCount: 100 },
//     { title: 'song2', artist: 'artist1', playCount: 200 },
//     { title: 'song3', artist: 'artist2', playCount: 300 },
//     { title: 'song4', artist: 'artist2', playCount: 400 },
//     { title: 'song5', artist: 'artist3', playCount: 500 },
//     { title: 'song6', artist: 'artist3', playCount: 600 },
//     { title: 'song7', artist: 'artist4', playCount: 700 },
//     { title: 'song8', artist: 'artist4', playCount: 800 },
//     { title: 'song9', artist: 'artist5', playCount: 900 },
//     { title: 'song10', artist: 'artist5', playCount: 1000 },
//   ]);
// })();
