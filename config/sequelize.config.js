'use strict';

const { Sequelize } = require('sequelize');

module.exports = () => {
  return async (ctx, next) => {
    const options = {
      host: 'localhost',
      user: 'root',
      password: '123456',
      port: '3306',
      database: 'sequelize'
    };

    const seq = new Sequelize(options.database, options.user, options.password, {
      host: options.host,
      port: options.port,
      dialect: 'mysql',
      pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
      },
    });

    ctx.sequelize = seq; // 挂载上下文
    await next();
  }
}