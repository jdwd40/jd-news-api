const db = require('../db/connection');

exports.selectTopic = () => {
  return db.query('SELECT * FROM topics;').then((res) => {
    return res.rows;
  });
};
