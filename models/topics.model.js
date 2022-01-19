const db = require('../db/connection');
const { forEach } = require('../db/data/test-data/articles');

exports.selectTopic = () => {
  return db.query('SELECT * FROM topics;').then((res) => {
    return res.rows;
  });
};

exports.selectCommentsById = (article_id) => {
  return db
    .query('SELECT * FROM comments WHERE article_id=$1;', [article_id])
    .then((res) => {
      let commentArr = res.rows;
      let formattedCommentArr = [];
      commentArr.forEach((comment) => {
        formattedCommentArr.push(comment.comment_id);
        formattedCommentArr.push(comment.votes);
        formattedCommentArr.push(comment.created_at);
        formattedCommentArr.push(comment.author);
        formattedCommentArr.push(comment.body);
      });

      return formattedCommentArr;
    });
};
