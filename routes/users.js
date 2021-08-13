const router = require('koa-router')()
const useUserController = require('../app/controller/user');

module.exports = (app, group) => {
  router.prefix(group);

  router.get('/createUser', useUserController.createUser);
  router.post('/login', useUserController.login);
  app.use(router.routes()).use(router.allowedMethods());
}
