import Koa, { DefaultState } from 'koa';
import Router from 'koa-router'
import {
  createArticle,
  deleteArticle,
  getTotalArticles,
  getArticleByTypeid,
  getReviseArticle
} from '../app/controller/article'
import { CtxContext } from '../app/interface/context';

const router = new Router<DefaultState, CtxContext>({
  prefix: '/article'
});

export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  router.post('/createArticle', createArticle);
  router.delete('/deleteArticle/:id', deleteArticle);
  router.get('/articles', getTotalArticles);
  router.put('/update', getArticleByTypeid);
  router.get('/updateArticle/:id', getReviseArticle);
  app
    .use(router.routes())
    .use(router.allowedMethods());
}