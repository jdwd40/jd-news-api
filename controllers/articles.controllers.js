const {
  selectArticlesById,
  selectArticles,
  updateArticleById,
} = require('../models/articles.model');

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  return selectArticlesById(article_id).then((article) => {
    res.status(200).send(article);
  });
};

exports.getArticles = (req, res, next) => {
  //console.log('inside getArticles');
  return selectArticles().then((articles) => {
    res.status(200).send(articles);
  });
};

exports.patchArticleById = (req, res, next) => {
  const { article_id, inc_votes } = req.params;
  console.log('inside patchArticleById');
  updateArticleById(article_id, inc_votes).then((updatedArticle) => {
    res.status(200).send({ updatedArticle });
  });
};
