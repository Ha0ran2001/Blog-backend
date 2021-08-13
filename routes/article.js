'use strict';

const router = require('koa-router')();
const useArticleController = require('../app/controller/article');

module.exports = (app, group) => {
  router.prefix(group);
  router.post('/createArticle', useArticleController.createArticle);
  router.delete('/deleteArticle/:id', useArticleController.deleteArticle);
  router.get('/articles', useArticleController.getAllArticles);
  router.put('/update', useArticleController.reviseArticleById);
  router.get('/updateArticle/:id', useArticleController.getReviseArticle);
  app.use(router.routes()).use(router.allowedMethods());
}