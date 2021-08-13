const { Sequelize, DataTypes } = require('sequelize');

const articleType = function (seq) {
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

module.exports = articleType;