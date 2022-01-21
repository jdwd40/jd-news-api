const db = require('../connection');
const format = require('pg-format');
const {
  formatTopicData,
  formatUserData,
  formatArticleData,
  formatCommentData,
} = require('../../utils/formatData');

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;

  return db
    .query(`DROP TABLE IF EXISTS topics cascade;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users cascade;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS comments cascade;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles cascade;`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE topics (
        slug TEXT PRIMARY KEY,
        description TEXT NOT NULL
      );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users (
          username TEXT PRIMARY KEY,
          name TEXT,
          avatar_url TEXT
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE articles (
          article_id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          topic TEXT REFERENCES topics(slug),
          body TEXT NOT NULL,
          votes INT DEFAULT 0,
          author TEXT REFERENCES users(username),
          created_at DATE DEFAULT CURRENT_TIMESTAMP
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          body TEXT NOT NULL,
          author TEXT REFERENCES users(username),
          article_id INT REFERENCES articles(article_id),
          votes INT DEFAULT 0,
          created_at DATE
        );`);
    })
    .then(() => {
      const formattedTopics = formatTopicData(topicData);
      const sql = format(
        `INSERT INTO topics (description, slug) 
      VALUES %L RETURNING *;`,
        formattedTopics
      );
      return db.query(sql);
    })
    .then(() => {
      const formattedUsers = formatUserData(userData);
      const sql = format(
        `INSERT INTO users (username, name, avatar_url) 
      VALUES %L RETURNING *;`,
        formattedUsers
      );
      return db.query(sql);
    })
    .then(() => {
      const formattedArticles = formatArticleData(articleData);
      const sql = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes)
  VALUES %L RETURNING *;`,
        formattedArticles
      );
      return db.query(sql);
    })
    .then(() => {
      const formattedComments = formatCommentData(commentData);
      const sql = format(
        `INSERT INTO comments (body, votes, author, article_id, created_at)
  VALUES %L RETURNING *;`,
        formattedComments
      );
      return db.query(sql);
    });
};

module.exports = { seed };
