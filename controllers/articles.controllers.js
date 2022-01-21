const articles = require('../db/data/test-data/articles');
const {
  selectArticlesById,
  selectArticles,
  updateArticleById,
} = require('../models/articles.model');
const { selectCommentsById } = require('../models/topics.model');
const { countCommentsById } = require('../models/comments.model');

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  console.log(typeof article_id);
  return selectArticlesById(article_id)
    .then((article) => {
      return countCommentsById(article_id).then(article, commentCount);
    })
    .then((article, commentCount) => {
      if (article.length === 0) {
        res.status(400).send({ msg: 'Article Not Found' });
      } else {
        console.log('ccount:', commentCount);
        res.status(200).send(article);
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  const { sort_by } = req.query;
  let { order_by } = req.query;
  const { topic } = req.query;
  console.log('orderby: ', order_by);
  if (order_by !== 'ASC' && order_by !== 'DESC' && order_by !== undefined) {
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
  const { inc_vote } = req.body;
  console.log(typeof article_id);
  // if (typeof article_id !== 'number') {
  //   res.status(400).send({ msg: 'Article Not Found' });
  // }

  updateArticleById(article_id, inc_vote)
    .then((updatedArticle) => {
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
