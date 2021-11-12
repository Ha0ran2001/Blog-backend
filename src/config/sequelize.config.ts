import { Sequelize } from 'sequelize'
import { options } from './db'
import { CtxContext } from '../app/interface/context'

export default () => {
  return async (ctx: CtxContext, next: () => Promise<any>) => {

    const seq = new Sequelize(options.database, options.user, options.password, {
      host: options.host,
      port: options.port,
      dialect: 'mysql',
      pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
      },
    });

    ctx.sequelize = seq; // 挂载上下文
    await next();
  }
}