const db = require('../db/connection');

exports.postCommentByArticleId = (article_id, author, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
      [article_id, author, body]
    )
    .then((res) => {
      const post = res.rows[0];
      const message = post.body;
      return message;
    });
};

exports.deleteCommentById = (comment_id) => {
  return db.query(`DELETE FROM comments WHERE comment_id=$1 RETURNING *;`, [
    comment_id,
  ]);
};

exports.countCommentsById = (article_id) => {
  return db
    .query(`SELECT count(*) FROM comments WHERE article_id=$1;`, [])
    .then((res) => {
      return res.rows;
    });
};
