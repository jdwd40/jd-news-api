const express = require('express');
const { getTopic } = require('./controllers/topic.controllers');
const {
  getArticleById,
  getArticles,
  patchArticleById,
  getCommentsByArticleId,
} = require('./controllers/articles.controllers');
const { postComment } = require('./controllers/comments.controllers');
const { handle404s } = require('./error');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopic);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles/', getArticles);

app.patch('/api/articles/:article_id', patchArticleById);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.post('/api/articles/:article_id/comments', postComment);

//app.all('*', handle404s);

app.use((err, req, res, next) => {
  console.log(' >>>>>>>>>> got to use', err);
  res.status(500).send({ msg: err });
});

module.exports = app;
