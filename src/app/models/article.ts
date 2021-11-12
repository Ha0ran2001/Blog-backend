
import { Sequelize, DataTypes } from 'sequelize'
import { articleType } from './articleType'

export const article = function (seq: Sequelize) {
  const ArticleModel = seq.define('article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    typeId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    introduce: DataTypes.TEXT,
    visitCount: DataTypes.BIGINT,
    createTime: DataTypes.BIGINT
  }, {
    timestamps: false,
    freezeTableName: true,
  });

  const articleTypeModel = articleType(seq);
  ArticleModel.belongsTo(articleTypeModel, {
    as: 'type',
    foreignKey: 'typeId',
    targetKey: 'id'
  });
  return ArticleModel;
}


