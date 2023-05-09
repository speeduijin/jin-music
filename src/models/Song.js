import { Model, DataTypes } from 'sequelize';

class Song extends Model {
  static initiate(sequelize) {
    Song.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        artist: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        playCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: 'Song',
        tableName: 'songs',
        timestamps: true,
        underscored: false,
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
}

export default Song;
