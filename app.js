const express = require('express');
const { getTopic } = require('./controllers/topic.controllers');
const {
  getArticleById,
  getArticles,
  patchArticleById,
  getCommentsByArticleId,
} = require('./controllers/articles.controllers');
const {
  postComment,
  deleteComment,
} = require('./controllers/comments.controllers');
const { handle404s, psqlErrorHandling } = require('./error');
const { getAllEndpoints } = require('./utils/utils');
const app = express();

app.use(express.json());

app.get('/api/topics', getTopic);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles/', getArticles);

app.patch('/api/articles/:article_id', patchArticleById);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.delete('/api/comments/:comment_id', deleteComment);

app.post('/api/articles/:article_id/comments', postComment);

app.get('/api', getAllEndpoints);

app.all('*', handle404s);

app.use(psqlErrorHandling);

module.exports = app;
