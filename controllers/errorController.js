module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  let error = { ...err };
  error.message = err.message;

  if (err.isOperational) {
    return res.status(err.statusCode).render('notfound', {
      title: `${err.statusCode}`,
      msg: error.message
    });
  }

  console.error('Error', err);
  return res.status(err.statusCode).render('notfound', {
    title: `${err.statusCode}`,
    msg: 'Please try again later!'
  });
};
