const db = require('../db/connection');

exports.postCommentByArticleId = (article_id, author, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [article_id, author, body]
    )
    .then((res) => {
      const post = res.rows[0];
      console.log(post, 'from postCommentsById');
      const message = post.body;
      console.log('message:', message);
      return message;
    });
};

exports.deleteCommentById = (comment_id) => {
  return db.query(`DELETE FROM comments WHERE comment_id=$1;`, [comment_id]);
};