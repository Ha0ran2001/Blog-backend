
import { Sequelize, QueryTypes } from 'sequelize'
import { CtxContext } from '../interface/context';
import { article } from '../models/article'
import { articleType } from '../models/articleType'

// 创建 && 插入信息
export const create = async function (seq: Sequelize, ctx: CtxContext) {
  const ArticleModel = await article(seq);
  // ArticleModel.sync(); // 第一次使用，并将下面的创建注释掉；第二次使用，打开创建，这是新建表
  const articleData = ctx.request.body;
  console.log('插入的文章', articleData);
  const result: any = await ArticleModel.create(articleData);
  const insert = result._options.isNewRecord;
  const insertId = result.null;
  return {
    insert,
    insertId
  }
}

// 删除

export const deleteItem = async function (seq: Sequelize, ctx: CtxContext) {
  const id = ctx.params.id;
  const ArticleModel = await article(seq);
  const res = await ArticleModel.destroy({
    where: {
      id: id
    }
  });
  if (res === 0) {
    return '没有这条数据';
  } else if (res === 1) {
    return 'OK';
  }
}


// 查--- 获取所有信息

export const getAllArticles = async function (seq: Sequelize) {

  const ArticleModel = await article(seq);

  const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.content as content,' +
    "FROM_UNIXTIME(article.createTime,'%Y-%m-%d') as createTime," +
    // 'article.visitCount as visitCount,' +
    'articleType.typeName as typeName ' +
    'FROM article LEFT JOIN articleType ON article.typeId = articleType.id ' +
    'ORDER BY article.id DESC';

  const res = await seq.query(sql, { type: QueryTypes.SELECT });
  console.log(res);
  return res;
}

// 查---获取文章详细内容

export const getArticleDetail = async function (seq: Sequelize, ctx: CtxContext) {
  const id = ctx.params.id;
  const ArticleModel = await article(seq);
  const res = await ArticleModel.findOne({
    where: {
      id
    }
  });
  return res;
}

// 查---获取休要修改的信息

export const getReviseItem = async function (seq: Sequelize, ctx: CtxContext) {
  const id = ctx.params.id;
  const ArticleModel = await article(seq);
  const res = await ArticleModel.findOne({
    where: {
      id
    }
  });
  return res;
}


// 查---根据typeId获取
export const getArticleByTypeId = async function (seq: Sequelize, ctx: CtxContext) {
  const id = ctx.params.id;
  const ArticleModel = await article(seq);
  const res = await ArticleModel.findAll({
    where: {
      typeId: id
    }
  });

  return res;
}


// 改
export const reviseItem = async function (seq: Sequelize, ctx: CtxContext) {
  const ArticleModel = await article(seq);
  const articleData = ctx.request.body;
  console.log('要修改的', articleData);
  try {
    await ArticleModel.update(articleData, {
      where: {
        id: articleData.id
      }
    });
    return 'Ok';
  } catch (err) {
    console.log(err);
  }
}