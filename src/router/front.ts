import Koa, { DefaultState } from 'koa';
import Router from 'koa-router'
import { CtxContext } from 'src/app/interface/context';
import {
  getTotalArticles,
  getArticleDetails,
  getArticleByTypeid
} from '../app/controller/article'

const router = new Router<DefaultState, CtxContext>({
  prefix: '/front'
});

export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {

  router.get('/articles', getTotalArticles);
  router.get('/article/:id', getArticleDetails);
  router.get('/articlesByTypeId/:id', getArticleByTypeid);

  app.use(router.routes()).use(router.allowedMethods());
}