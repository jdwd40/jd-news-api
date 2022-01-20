const { app } = require('./app');

exports.handle404s = (err, req, res, next) => {
  //console.log('from handl404s: ', Object.keys(res));
  //console.log('res.statusCode', res.body);
  res.status(404).send({ msg: 'Invalid Endpoint' });
};

exports.psqlErrorHandling = (err, req, res, next) => {
  //console.log(' >>>>>>>>>> got to handleErrors', err);
  if (err.code === '23502') {
    console.log('got to err.code logic');
    return res
      .status(400)
      .send({ msg: 'Bad Request - Tried to send Null Value' });
  }
  console.log('got to error handling but didnt catch an error');
  console.log(err);
  res.status(500).send({ msg: err });
};
