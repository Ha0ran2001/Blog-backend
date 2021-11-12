import { Sequelize, DataTypes } from 'sequelize'

export const user = function (seq: Sequelize) {
  const UserModel = seq.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  return UserModel;
}

module.exports = user;