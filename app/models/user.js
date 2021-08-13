'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const user = function (seq) {
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