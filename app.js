const express = require('express');
const { getTopic } = require('./controllers/topic.controllers');
const {
  getArticleById,
  getArticles,
  patchArticleById,
} = require('./controllers/articles.controllers');
const app = express();

app.use(express.json());

app.get('/api/topics', getTopic);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles/:article_id', getArticles);

app.patch('/api/articles/:article_id', patchArticleById);

app.use((err, req, res, next) => {
  res.status(500).send({ msg: err });
});

module.exports = app;