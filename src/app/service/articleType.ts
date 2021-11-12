import { Sequelize } from 'sequelize'
import { articleType } from '../models/articleType'
import articleModel from '../../router/article'


const articleTypes = [
  'VanillaJS', 'CSS', 'Node', 'Canvas'
]

// 创建类型
export async function create(seq: Sequelize) {
  const ArticleTypeModel = articleType(seq);
  // ArticleTypeModel.sync(); // 建表

  // 填充数据
  articleTypes.forEach((item) => {
    ArticleTypeModel.create({
      typeName: item
    });
  });
}

// 获取类型
export async function getArticleType(seq: Sequelize) {
  const ArticleTypeModel = articleType(seq);

  const types = await ArticleTypeModel.findAll();
  return types;
}
