const express = require('express');
const { getTopic } = require('./controllers/topic.controllers');
const app = express();

app.use(express.json());

app.get('/api/topics', getTopic);

app.use((err, req, res, next) => {
  res.status(500).send({ msg: err });
});

module.exports = app;
