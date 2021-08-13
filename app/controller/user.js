const userMethod = require('../utils/user');

async function createUser(ctx) {
  await userMethod.create(ctx.sequelize);

  ctx.body = {
    code: 0,
    msg: '用户创建成功'
  }
}

async function login(ctx) {
  let token = await userMethod.login(ctx.sequelize, ctx);

  if (token.length) {
    ctx.body = {
      data: {
        success: '登录成功',
        token
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '登录失败'
    }
  }

}

module.exports = {
  createUser,
  login
}