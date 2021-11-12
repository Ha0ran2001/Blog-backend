import Koa, { DefaultState } from 'koa'
import Router from 'koa-router'
import { createUser, loginFn } from '../app/controller/user'
import { CtxContext } from '../app/interface/context'

const router = new Router<DefaultState, CtxContext>({
  prefix: '/user'
})

export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  router.get('/createUser', createUser);
  router.post('/login', loginFn);
  app.use(router.routes()).use(router.allowedMethods());
}
