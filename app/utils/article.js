'use strict';

const { Sequelize, QueryTypes } = require('sequelize');
const article = require('../models/article');
const articleTypeModel = require('../models/articleType');


// 创建 && 插入信息
const create = async function (seq, ctx) {
  const ArticleModel = await article(seq);
  // ArticleModel.sync(); // 第一次使用，并将下面的创建注释掉；第二次使用，打开创建，这是新建表
  const articleData = ctx.request.body;
  console.log('插入的文章', articleData);
  const result = await ArticleModel.create(articleData);
  const insert = result._options.isNewRecord;
  const insertId = result.null;
  return {
    insert,
    insertId
  }
}

// 删除

const deleteItem = async function (seq, ctx) {
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

const getAllArticles = async function (seq) {

  const ArticleModel = await article(seq);

  const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    "FROM_UNIXTIME(article.createTime,'%Y-%m-%d') as createTime," +
    'article.visitCount as visitCount,' +
    'articleType.typeName as typeName ' +
    'FROM article LEFT JOIN articleType ON article.typeId = articleType.id ' +
    'ORDER BY article.id DESC';

  const res = await seq.query(sql, { type: QueryTypes.SELECT });
  console.log(res);
  return res;
}

// 查---获取文章详细内容

const getArticleDetail = async function (seq, ctx) {
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

const getReviseItem = async function (seq, ctx) {
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
const getArticleByTypeId = async function (seq, ctx) {
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
const reviseItem = async function (seq, ctx) {
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

module.exports = {
  create,
  deleteItem,
  getAllArticles,
  reviseItem,
  getReviseItem,
  getArticleDetail,
  getArticleByTypeId
}