const articleMethods = require('../utils/article');


// 增
async function createArticle(ctx) {
  const { insert, insertId } = await articleMethods.create(ctx.sequelize, ctx);

  ctx.body = {
    status: insert,
    msg: insertId,
  }
}

// 删
async function deleteArticle(ctx) {
  const res = await articleMethods.deleteItem(ctx.sequelize, ctx);

  ctx.body = {
    code: 0,
    msg: res
  }
}


// 查----所有文章
async function getAllArticles(ctx) {
  const info = await articleMethods.getAllArticles(ctx.sequelize, ctx);

  ctx.body = {
    msg: '获取成功',
    data: info,
  }
}

// 查----文章详细信息

async function getArticleDetail(ctx) {
  const detail = await articleMethods.getArticleDetail(ctx.sequelize, ctx);

  ctx.body = {
    data: detail
  }
}

// 查-----要修改的文章
async function getReviseArticle(ctx) {
  const res = await articleMethods.getReviseItem(ctx.sequelize, ctx);
  ctx.body = {
    data: res
  }
}

/**
 * 查
 * 根据typeId获取文章
 */

async function getArticleByTypeId(ctx) {
  const res = await articleMethods.getArticleByTypeId(ctx.sequelize, ctx);
  ctx.body = {
    data: res
  }
}


// 改
async function reviseArticleById(ctx) {
  const updateOk = await articleMethods.reviseItem(ctx.sequelize, ctx);

  ctx.body = {
    updateOk
  }
}



module.exports = {
  createArticle,
  deleteArticle,
  getAllArticles,
  reviseArticleById,
  getReviseArticle,
  getArticleDetail,
  getArticleByTypeId
}