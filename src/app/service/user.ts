
import { Sequelize } from 'sequelize'
import { Op } from "sequelize"
import jwt from 'jsonwebtoken'
import { user } from '../models/user'
import { CtxContext } from '../interface/context'

// 创建
export const create = function (seq: Sequelize) {
  const UserModel = user(seq);
  // UserModel.sync(); // 建表

  UserModel.create({
    id: 1,
    username: 'ha0ran',
    password: 'ha0ran',
  });
}

// 登录
export const login = async function (seq: Sequelize, ctx: CtxContext) {
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
  }).then((res: any) => {
    token = jwt.sign(
      { username: res.username },
      'ha0ran',
      { expiresIn: '24h' }
    );
  }).catch(err => {
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      code: -1,
      msg: err
    }
  });
  return token;
}