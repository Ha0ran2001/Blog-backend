'use strict';

const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');

const user = require('../models/user');

// 创建
const create = function (seq) {
  const UserModel = user(seq);
  // UserModel.sync(); // 建表

  UserModel.create({
    id: 1,
    username: 'ha0ran',
    password: 'ha0ran',
  });
}

// 登录
const login = async function (seq, ctx) {
  const { username, password } = ctx.request.body;
  const UserModel = user(seq);
  let token = '';
  await UserModel.findOne({
    where: {
      [Op.and]: [
        { username: username },
        { password: password },
      ]
    }
  }).then(res => {
    token = jwt.sign({ username: res.username }, 'ha0ran', { expiresIn: '24h' });
  }).catch(err => {
    // console.log(err);
    ctx.status = 400;
    ctx.body = {
      code: -1,
      msg: err
    }
  });
  return token;
}

module.exports = {
  create,
  login
}