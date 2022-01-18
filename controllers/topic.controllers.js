const { selectTopic } = require('../models/topics.model');

exports.getTopic = (req, res, next) => {
  console.log('inside getTopic!!!');
  return selectTopic()
    .then((topics) => {
      //console.log('return from select topic', topics);
      res.status(200).send({ topics });
    })
    .catch(next);
};
