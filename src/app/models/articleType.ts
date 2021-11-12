import { Sequelize, DataTypes } from 'sequelize'


export const articleType = function (seq: Sequelize) {
  const ArticleTypeModel = seq.define('articleType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true
    },
    typeName: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  return ArticleTypeModel;
}

