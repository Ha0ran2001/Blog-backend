import Koa, { DefaultState } from 'koa';
import Router from 'koa-router';
import { createType, getArticleTypes } from '../app/controller/articleType'
import { CtxContext } from '../app/interface/context';

/** 
 * 这里Router添加Default 和 Context 
 * 是为了防止下面使用 createType 和 getArticleTypes报错   
 */
const router = new Router<DefaultState, CtxContext>({
  prefix: '/front'
})

export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  router.get('/createType', createType);
  router.get('/articleTypes', getArticleTypes);
  app
    .use(router.routes())
    .use(router.allowedMethods());
}