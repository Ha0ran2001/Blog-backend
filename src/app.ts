
import Koa from 'koa'
import json from 'koa-json'
// import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
// import parameter from 'koa-parameter'
import logger from 'koa-logger'
import koaJwt from 'koa-jwt'
import cors from 'koa2-cors'

const app = new Koa()
// 引入路由
import userRouter from './router/users'
import articleRouter from './router/article'
import articleTypeRouter from './router/articleType'
import frontRouter from './router/front'
import { CtxContext } from './app/interface/context'

// 引入 sequelize 配置
import sequelizeConfig from './config/sequelize.config'
// 引入jwt验证中间件
import jwthandler from './app/middleware/jwthandler'

// error handler
// onerror(app)

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
  origin: (ctx: any) => ctx.header.origin
}));
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text',]
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(koaJwt({ secret: 'ha0ran' }).unless({ path: [/^\/user\/login/, /^\/front/] }));
app.use(jwthandler());
// app.use(parameter(app));


// logger
app.use(async (ctx, next) => {
  const start = +new Date()
  await next()
  const ms = +new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
articleRouter(app);
userRouter(app);
articleTypeRouter(app);
frontRouter(app);


app.listen(3000, () => {
  console.log('listening on 3000...')
})




// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
