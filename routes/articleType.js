const router = require('koa-router')();
const useArticleTypeController = require('../app/controller/articleType');

module.exports = (app, group) => {

  router.prefix(group);
  router.get('/createType', useArticleTypeController.createType);
  router.get('/articleTypes', useArticleTypeController.getArticleType);
  app.use(router.routes()).use(router.allowedMethods());
}