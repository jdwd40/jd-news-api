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
  const { article_id } = req.params;
  // if (typeof article_id !== integer) {
  //   console.log('Not an integer');
  // }
  const { inc_vote } = req.body;
  console.log('from patchArticlebyId', inc_vote);
  console.log(typeof inc_vote);
  updateArticleById(article_id, inc_vote)
    .then((updatedArticle) => {
      console.log(updatedArticle);
      res.status(200).send({ updatedArticle });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
};
