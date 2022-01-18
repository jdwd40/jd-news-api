const app = require('../app');
const { request } = require('../app');

exports.newVote = (obj, inc) => {
  if (obj === undefined) return [];

  const { article_id } = obj;
  const voteObj = {};
  voteObj.inc_vote = inc;
  return app
    .patch('/api/articles/1')
    .send(voteObj)
    .then((updatedArticle) => {
      return updatedArticle;
    });
};
