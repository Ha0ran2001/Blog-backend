import Koa, { Context } from 'koa'
import { Sequelize } from 'sequelize'
export interface CtxContext extends Context {
  sequelize: Sequelize
}