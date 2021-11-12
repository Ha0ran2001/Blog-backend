import { CtxContext } from '../interface/context';
import {
  create,
  deleteItem,
  getAllArticles,
  getArticleDetail,
  getReviseItem,
  getArticleByTypeId,
  reviseItem
} from '../service/article'


// 增
export async function createArticle(ctx: CtxContext) {
  const { insert, insertId } = await create(ctx.sequelize, ctx);

  ctx.body = {
    status: insert,
    msg: insertId,
  }
}

// 删
export async function deleteArticle(ctx: CtxContext) {
  const res = await deleteItem(ctx.sequelize, ctx);

  ctx.body = {
    code: 0,
    msg: res
  }
}


// 查----所有文章
export async function getTotalArticles(ctx: CtxContext) {
  const info = await getAllArticles(ctx.sequelize);

  ctx.body = {
    msg: '获取成功',
    data: info,
  }
}

// 查----文章详细信息

export async function getArticleDetails(ctx: CtxContext) {
  const detail = await getArticleDetail(ctx.sequelize, ctx);

  ctx.body = {
    data: detail
  }
}

// 查-----要修改的文章
export async function getReviseArticle(ctx: CtxContext) {
  const res = await getReviseItem(ctx.sequelize, ctx);
  ctx.body = {
    data: res
  }
}

/**
 * 查
 * 根据typeId获取文章
 */

export async function getArticleByTypeid(ctx: CtxContext) {
  const res = await getArticleByTypeId(ctx.sequelize, ctx);
  ctx.body = {
    data: res
  }
}


// 改
export async function reviseArticleById(ctx: CtxContext) {
  const updateOk = await reviseItem(ctx.sequelize, ctx);

  ctx.body = {
    updateOk
  }
}

