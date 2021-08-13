
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser');
const koaBody = require('koa-body');
const parameter = require('koa-parameter')
const logger = require('koa-logger');
const path = require('path');
const koaJwt = require('koa-jwt');
const cors = require('koa2-cors');


// 引入路由
const userRouter = require('./routes/users');
const articleRouter = require('./routes/article');
const articleTypeRouter = require('./routes/articleType');
const frontRouter = require('./routes/front');

// 引入 sequelize 配置
const sequelizeConfig = require('./config/sequelize.config');
// 引入jwt验证中间件
const jwthandler = require('./app/middleware/jwthandler');

// error handler
onerror(app)

// sequelize
app.use(sequelizeConfig());

// middlewares
// app.use(koaBody({
//   multipart: true, // 支持文件上传
//   encoding: 'utf-8',
//   formidable: {
//     uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
//     keepExtensions: true,    // 保持文件的后缀
//     maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
//     onFileBegin: (name, file) => { // 文件上传前的设置
//       // console.log(`name: ${name}`);
//       // console.log(file);
//     },
//   }
// }));
app.use(cors({
  origin: function (ctx) {
    return ctx.header.origin
  }
}));
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text',]
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}));
app.use(koaJwt({ secret: 'ha0ran' }).unless({ path: [/^\/user\/login/, /^\/front/] }));
app.use(jwthandler());
app.use(parameter(app));


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
articleRouter(app, '/article');
userRouter(app, '/user');
articleTypeRouter(app, '/front');
frontRouter(app, '/front');



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
