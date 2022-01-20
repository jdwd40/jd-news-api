const app = require('../app');
const { request } = require('../app');
const { selectArticlesById } = require('../models/articles.model');

exports.checkArticleById = (article_id) => {
  console.log('got here .... cabi');
  return selectArticlesById(article_id).then((article) => {
    console.log('inside checkArticleById ', article);
    if (article.length === 0) {
      return false;
    } else {
      return true;
    }
  });
};
