module.exports = (error, _req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error.message || 'Request Failed');
  console.error(error);

  res.status(error.statusCode || error.status || 500)
    .json({ message: error.message });
};