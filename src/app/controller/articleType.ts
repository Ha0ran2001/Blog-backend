import { create, getArticleType } from '../service/articleType'
import { CtxContext } from "../interface/context";

export async function createType(ctx: CtxContext) {
  await create(ctx.sequelize);

  ctx.body = {
    code: 0,
    msg: '类型创建成功'
  }
}

export async function getArticleTypes(ctx: CtxContext) {
  const res = await getArticleType(ctx.sequelize);

  ctx.body = {
    data: res
  }
}