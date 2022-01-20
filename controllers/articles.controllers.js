const articles = require('../db/data/test-data/articles');
const {
  selectArticlesById,
  selectArticles,
  updateArticleById,
} = require('../models/articles.model');
const { selectCommentsById } = require('../models/topics.model');

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  return selectArticlesById(article_id).then((article) => {
    if (article.length === 0) {
      res.status(400).send({ msg: 'Article Not Found' });
    } else {
      res.status(200).send(article);
    }
  });
};

exports.getArticles = (req, res, next) => {
  const { sort_by } = req.query;
  let { order_by } = req.query;
  const { topic } = req.query;
  console.log('orderby: ', order_by);
  if (order_by !== 'ASC' && order_by !== 'DESC') {
    return res.status(400).send({ msg: 'Invalid order query' });
  }

  return selectArticles(sort_by, order_by, topic)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  // if (typeof article_id !== integer) {
  //   console.log('Not an integer');
  // }
  const { inc_vote } = req.body;
  // console.log('from patchArticlebyId', inc_vote);
  // console.log(typeof inc_vote);

  updateArticleById(article_id, inc_vote)
    .then((updatedArticle) => {
      console.log(updatedArticle);
      if (updatedArticle.length === 0) {
        res.status(400).send({ msg: 'Article Not Found' });
      } else {
        res.status(200).send({ updatedArticle });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  console.log('inside getComments article_id: ', article_id);
  return selectCommentsById(article_id).then((comments) => {
    res.status(200).send({ comments });
  });
};
