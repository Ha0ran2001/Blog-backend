const { Sequelize } = require('sequelize');
const useArticleTypeMethod = require('../utils/articleType');

async function createType(ctx) {
  await useArticleTypeMethod.create(ctx.sequelize);

  ctx.body = {
    code: 0,
    msg: '类型创建成功'
  }
}

async function getArticleType(ctx) {
  const res = await useArticleTypeMethod.getArticleType(ctx.sequelize);

  ctx.body = {
    data: res
  }
}
module.exports = {
  createType,
  getArticleType
}