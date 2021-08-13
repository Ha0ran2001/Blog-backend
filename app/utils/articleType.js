const { Sequelize } = require('sequelize');
const articleType = require('../models/articleType');
const articleModel = require('../../routes/article');


const articleTypes = [
  'VanillaJS', 'CSS', 'Node', 'Canvas'
]

// 创建类型
async function create(seq) {
  const ArticleTypeModel = articleType(seq);
  // ArticleTypeModel.sync(); // 建表

  // 填充数据
  articleTypes.forEach((item) => {
    ArticleTypeModel.create({
      typeName: item
    });
  })
}

// 获取类型
async function getArticleType(seq) {
  const ArticleTypeModel = articleType(seq);

  const types = await ArticleTypeModel.findAll();
  return types;
}

module.exports = {
  create,
  getArticleType
}