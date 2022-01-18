const db = require('../db/connection');

exports.selectArticlesById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
    .then((res) => {
      console.log('from selectArticlesByID >>> ', res.rows);
      return res.rows;
    });
};

exports.selectArticles = () => {
  return db.query('SELECT * FROM articles;').then((res) => {
    return res.rows;
  });
};

exports.updateArticleById = (article_id, inc_vote) => {
  console.log('inside updateArticleId');
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id=$2 RETURNING *;`,
      [inc_vote, article_id]
    )
    .then((result) => {
      return result.rows;
    });
};
