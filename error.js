exports.handle404s = (res) => {
  console.log('404 got here');
  return res
    .status(404)
    .send({ msg: '404 Error' })
    .catch((err) => {
      next(err);
    });
};
