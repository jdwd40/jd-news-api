const { selectTopic } = require('../models/topics.model');

exports.getTopic = (req, res, next) => {
  console.log('inside getTopic!!!');
  return selectTopic()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
