import { CtxContext } from '../interface/context';
import { create, login } from '../service/user'

export async function createUser(ctx: CtxContext) {
  await create(ctx.sequelize);

  ctx.body = {
    code: 0,
    msg: '用户创建成功'
  }
}

export async function loginFn(ctx: CtxContext) {
  let token = await login(ctx.sequelize, ctx);

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
