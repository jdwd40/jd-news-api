const {
  postCommentByArticleId,
  deleteCommentById,
} = require('../models/comments.model');

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username: author } = req.body;
  const { body } = req.body;
  // if (body === '' || body === undefined || body === null) {
  //   res.status(400).send({ msg: 'Bad Request - Tried to send Null Value' });
  // }
  postCommentByArticleId(article_id, author, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  console.log('inside');
  deleteCommentById(comment_id).then(() => {
    res.status(204).end();
  });
};
