const router = require('koa-router')();

const useArticleController = require('../app/controller/article');

module.exports = (app, group) => {
  router.prefix(group);

  router.get('/articles', useArticleController.getAllArticles);
  router.get('/article/:id', useArticleController.getArticleDetail);
  router.get('/articlesByTypeId/:id', useArticleController.getArticleByTypeId);

  app.use(router.routes()).use(router.allowedMethods());
}