import jwt from 'jsonwebtoken'
import { CtxContext } from '../interface/context';

export default () => {
  return async (ctx: CtxContext, next: () => Promise<any>) => {
    if (ctx.header && ctx.header.authorization) {
      const token = ctx.header.authorization.slice(7);
      let decode;
      if (token) {
        try {
          decode = jwt.verify(token, 'ha0ran');
          // return await next();
        } catch (err: any) {
          ctx.body = {
            msg: err.message
          }
        }
      } else {
        ctx.status = 401;
        ctx.body = {
          msg: '没有token'
        }
      }
    }
    return next().catch(err => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body =
          '整个token再来吧\n';
      } else {
        throw err;
      }
    })
  }
}


